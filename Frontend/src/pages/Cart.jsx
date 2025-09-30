import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const {
    products,
    currency,
    cartItems,
    removeCartItem,
    getCartCount,
    getCartAmount,
    updateCartItem,
    setCartItems,
    navigate,
    user,
    axios,
  } = useAppContext()
  const [cartArray, setCartArray] = useState([]);
  const [showAddress, setShowAddress] = React.useState(false);
  const [address, setAddress] = React.useState([]);
  const [selectAddress, setSelectAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  // Only map cart items after products and user are loaded
  useEffect(() => {
    if (products.length > 0 && cartItems && Object.keys(cartItems).length > 0) {
      let tempArray = [];
      for (const key in cartItems) {
        const product = products.find((items) => items._id === key);
        if (product) {
          tempArray.push({ ...product, quantity: cartItems[key] });
        }
      }
      setCartArray(tempArray);
    } else {
      setCartArray([]);
    }
  }, [products, cartItems]);

  const userAddress = React.useCallback(async () => {
    try {
      if (!user || !user._id) return;
      const { data } = await axios.post("/api/address/get", { userId: user._id });
      if (data.success) {
        setAddress(data.addresses);
        if (data.addresses.length > 0) {
          setSelectAddress(data.addresses[0]);
        } else {
          setSelectAddress(null);
        }
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }, [axios, user]);


  const placeOrder = async () => {
    try {
      if (!selectAddress) {
        return toast.error("Please select address");
      }
      if (paymentOption === "COD") {
        const { data } = await axios.post("/api/order/cod", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectAddress._id,
        });
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
          scrollTo(0, 0);
        } else {
          toast.error(data.error);
        }
      } else {
        const { data } = await axios.post("/api/order/stripe", {
          userId: user._id,
          items: cartArray.map((item) => ({
            product: item._id,
            quantity: item.quantity,
          })),
          address: selectAddress._id,
        });
        if (data.success) {
        window.location.replace(data.url);
        } else {
          toast.error(data.error);
        }
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      userAddress();
    } else {
      setAddress([]);
      setSelectAddress(null);
    }
  }, [user, userAddress]);

  return products.length > 0 && cartItems ? (
    <div className="flex flex-col md:flex-row mt-16 bg-primary min-h-screen">
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6 text-primary">
          Shopping Cart{" "}
          <span className="text-sm text-blue-500 font-bold">
            {getCartCount()} Items
          </span>
        </h1>

        <div className="grid grid-cols-[2fr_1fr_1fr] text-text-muted text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.map((product, index) => (
          <div
            key={index}
            className="grid grid-cols-[2fr_1fr_1fr] text-text-muted items-center text-sm md:text-base font-medium pt-3 border-b border-custom pb-3"
          >
            <div className="flex items-center md:gap-6 gap-3">
              <div
                onClick={() => {
                  navigate(
                    `/products/${product.category.toLowerCase()}/${product._id}`
                  );
                  scrollTo(0, 0);
                }}
                className="cursor-pointer w-24 h-24 flex items-center justify-center border border-custom rounded-lg overflow-hidden shadow-custom hover:shadow-custom-lg transition-all"
              >
                <img
                  className="max-w-full h-full object-cover"
                  src={product.image[0]}
                  alt={product.name}
                />
              </div>
              <div>
                <p className="hidden md:block font-semibold text-primary">
                  {product.name}
                </p>
                <div className="font-normal text-text-muted">
                  <p>
                    Weight: <span>{product.weight || "N/A"}</span>
                  </p>
                  <div className="flex items-center">
                    <p>Qty:</p>
                    <select
                      className="outline-none bg-primary border border-custom rounded px-2 py-1 text-primary"
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      value={cartItems[product._id]}
                    >
                      {Array(
                        cartItems[product._id] > 9 ? cartItems[product._id] : 9
                      )
                        .fill("")
                        .map((_, index) => (
                          <option key={index} value={index + 1}>
                            {index + 1}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-center text-accent-color font-semibold">
              {currency}
              {product.offerPrice * product.quantity}
            </p>
            <button
              onClick={() => removeCartItem(product._id)}
              className="cursor-pointer mx-auto p-2 hover:bg-tertiary rounded-lg transition-colors"
            >
              <img
                src={assets.remove_icon}
                alt="remove"
                className="inline-block w-6 h-6"
              />
            </button>
          </div>
        ))}

        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-accent-color font-medium hover:text-accent-hover transition-colors"
        >
          <img
            src={assets.arrow_right_icon_colored}
            alt=""
            className="group-hover:-translate-x-1 transition"
          />
          Continue Shopping
        </button>
      </div>

      <div className="max-w-[360px] w-full bg-secondary p-5 max-md:mt-16 border border-custom rounded-xl shadow-custom">
        <h2 className="text-xl md:text-xl font-bold text-blue-500">
          Order Summary
        </h2>
        <hr className="border-custom my-5" />

        <div className="mb-6">
          <p className="text-sm font-medium uppercase text-primary">
            Delivery Address
          </p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-text-muted">
              {selectAddress
                ? `${selectAddress.street},${selectAddress.city},${selectAddress.state},${selectAddress.country}`
                : "No Address Found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-accent-color hover:text-accent-hover cursor-pointer transition-colors"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-primary border border-custom text-sm w-full rounded-lg shadow-custom-lg z-10">
                {address.map((address, index) => (
                  <p
                    key={index}
                    onClick={() => {
                      setSelectAddress(address);
                      setShowAddress(false);
                    }}
                    className="text-text-muted p-2 hover:bg-tertiary cursor-pointer transition-colors"
                  >
                    {address.street},{address.city},{address.state},
                    {address.country}
                  </p>
                ))}

                <p
                  onClick={() => navigate("/add-address")}
                  className="text-accent-color text-center cursor-pointer p-2 hover:bg-tertiary transition-colors"
                >
                  Add address
                </p>
              </div>
            )}
          </div>

          <p className="text-sm font-medium uppercase mt-6 text-primary">
            Payment Method
          </p>

          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-custom bg-primary px-3 py-2 mt-2 outline-none text-primary rounded-lg"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>

        <hr className="border-custom" />

        <div className="text-text-muted mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
            <span>
              {currency}
              {getCartAmount()}
            </span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>
              {currency}
              {(getCartAmount() * 2) / 100}
            </span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3 text-primary">
            <span>Total Amount:</span>
            <span className="text-accent-color">
              {currency}
              {getCartAmount() + (getCartAmount() * 2) / 100}
            </span>
          </p>
        </div>

        <button
          className="w-full py-3 mt-6 cursor-pointer bg-blue-500 text-white font-medium hover:bg-blue-600 transition-all rounded-lg shadow-custom hover:shadow-custom-lg"
          onClick={() => placeOrder()}
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed To Checkout"}
        </button>
      </div>
    </div>
  ) : (
    <div className="flex items-center justify-center h-64 text-primary text-xl">
      No Items in the Cart
    </div>
  );
};

export default Cart;
