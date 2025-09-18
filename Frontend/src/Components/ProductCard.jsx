import React from "react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";
import { Link } from "react-router-dom";
import { IoMdCart } from "react-icons/io";


const ProductCard = ({ product }) => {
  const {
    currency,
    fetchCart,
    removeCartItem,
    cartItems,
  } = useAppContext();

  return (
    product && (
      <Link
        to={
          product.category && typeof product.category === 'string'
            ? `/products/${product.category.toLowerCase()}/${product._id}`
            : `/products/${product._id}`
        }
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <div className="border border-blue-300 rounded-xl md:px-4 px-3 py-4 bg-primary min-w-56 max-w-56 w-full shadow-custom hover:shadow-custom-lg transition-all duration-300 group">
          <div className="group cursor-pointer flex items-center justify-center px-2 mb-3">
            <img
              className="group-hover:scale-110 transition-all duration-300 max-w-26 md:max-w-36"
              src={Array.isArray(product.image) ? product.image[0] : product.image}
              alt={product.name}
            />
          </div>
          <div className="text-text-muted text-sm">
            <p className="text-accent-color font-medium">{product.category}</p>
            <p className="text-primary font-semibold text-lg truncate w-full mt-1">
              {product.name}
            </p>
            <div className="flex items-center gap-0.5 mt-2">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt=""
                    className="w-4 h-4"
                  />
                ))}
              <p className="text-text-muted text-xs ml-1">(3)</p>
            </div>
            <div className="flex items-end justify-between mt-4">
              <div>
                <p className="md:text-xl text-base font-bold text-accent-color">
                  {currency} {product.offerPrice}
                </p>
                <span className="text-text-muted md:text-sm text-xs line-through">
                  {currency}{product.price}
                </span>
              </div>
              <div onClick={(e) => {e.stopPropagation();}} className="text-accent-color">
                {!cartItems[product._id] ? (
                  <button
                    className="flex items-center justify-center gap-1 bg-blue-400 hover:bg-blue-500 text-white border-0 md:w-[80px] w-[64px] h-[34px] rounded-lg font-medium cursor-pointer transition-all duration-300 shadow-custom hover:shadow-custom-lg"
                    onClick={(e) => {e.preventDefault(); fetchCart(product._id);}}
                  >
                    {/* <img src={assets.cart_icon} alt="cart-icon" className="w-4 h-4 text-white" /> */}
                    <IoMdCart className="w-4 h-4 text-white" />
                    Add
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-tertiary rounded-lg select-none border border-custom">
                    <button
                      onClick={(e) => {e.preventDefault(); removeCartItem(product._id);}}
                      className="cursor-pointer text-md px-2 h-full hover:text-blue-500 rounded-l-lg transition-all duration-200"
                    >
                      -
                    </button>
                    <span className="w-5 text-center text-primary font-medium">
                      {cartItems[product._id]}
                    </span>
                    <button
                      onClick={(e) => {e.preventDefault(); fetchCart(product._id);}}
                      className="cursor-pointer text-md px-2 h-full hover:text-blue-500 rounded-r-lg transition-all duration-200"
                    >
                      +
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  );
};

export default ProductCard;
