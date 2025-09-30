import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import React from "react";
import { toast } from "react-hot-toast";
import axios from "axios";

export const AppContext = createContext();

axios.defaults.withCredentials = true;
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;

export const AppContextProvider = ({ children }) => {
  const currency = import.meta.env.VITE_CURRENCY;
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  // Initialize cartItems from localStorage if available
  const [cartItems, setCartItems] = useState(() => {
    try {
      const stored = localStorage.getItem('cartItems');
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });
  const [searchQuery, setSearchQuery] = useState({});

  //fetchsellerStatus

  const fetchSeller = async()=>{
    try {
      const{data} = await axios.get('/api/seller/is-auth')
      if(data.success){
        setIsSeller(true)
      }else{
        setIsSeller(false)
      }
      
    } catch (err) {
      setIsSeller(false)
      console.log(err);
      
    }
  }

  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/is-auth');
      if (data.success) {
        setUser(data.user);
        // Merge localStorage cart with DB cart if localStorage cart exists
        const localCart = localStorage.getItem('cartItems');
        let mergedCart = { ...data.user.cartItems };
        if (localCart) {
          const parsedLocal = JSON.parse(localCart);
          for (const key in parsedLocal) {
            if (mergedCart[key]) {
              mergedCart[key] += parsedLocal[key];
            } else {
              mergedCart[key] = parsedLocal[key];
            }
          }
          // Update DB with merged cart
          await axios.post('/api/cart/update', { userId: data.user._id, cartItems: mergedCart });
          localStorage.removeItem('cartItems');
        }
        setCartItems(mergedCart);
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
      console.log(error);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/product/list");
      if (data && data.success) {
        setProducts(data.products);
      } else {
        toast.error(data ? data.message : "No response from server");
      }
      
    } catch (error) {
      toast.error(
        error?.response?.data?.message || error.message || "An error occurred"
      );
      
    }
  };

  const fetchCart = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] += 1;
    } else {
      cartData[itemId] = 1;
    }
    setCartItems(cartData);
    toast.success("Item added to cart");
  };

  const updateCartItem = async (itemId, quantity) => {
    let cartData = structuredClone(cartItems);
    cartData[itemId] = quantity;
    setCartItems(cartData);
    toast.success("Cart updated");
  };

  const removeCartItem = async (itemId) => {
    let cartData = structuredClone(cartItems);
    if (cartData[itemId]) {
      cartData[itemId] -= 1;
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }
    }
    toast.success("Item removed from cart");
    setCartItems(cartData);
  };

  //get cart item count
  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      totalCount += cartItems[items];
    }
    return totalCount;
  };

  const getCartAmount = () => {
    let totalAmount = 0;
    for (const items in cartItems) {
      let itemInfo = products.find((product) => product._id === items);
      if (itemInfo && cartItems[items] > 0) {
        totalAmount += itemInfo.offerPrice * cartItems[items];
      }
    }
    return Math.floor(totalAmount * 100) / 100;
  };
  React.useEffect(() => {
    fetchProducts();
    fetchSeller();
    fetchUser();
  }, []);

  // Sync cartItems to localStorage on every change
  React.useEffect(() => {
    try {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  // Sync cartItems to backend if user is logged in
  React.useEffect(() => {
    const updateCart = async () => {
      try {
        if (user && user._id) {
          const { data } = await axios.post('/api/cart/update', { userId: user._id, cartItems });
          if (!data.success) {
            toast.error(data.message);
          }
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    if (user && user._id) {
      updateCart();
    }
  }, [cartItems, user]);

  const value = {
    navigate,
    setUser,
    user,
    setIsSeller,
    isSeller,
    setShowUserLogin,
    showUserLogin,
    products,
    currency,
    fetchCart,
    updateCartItem,
    removeCartItem,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    fetchProducts,
    setCartItems,
    axios,
    fetchUser
  };
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => {
  return useContext(AppContext);
};
