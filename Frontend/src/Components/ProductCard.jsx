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
        <div className="border border-blue-300 rounded-xl px-2 py-3 bg-primary w-full max-w-[170px] sm:max-w-56 shadow-custom hover:shadow-custom-lg transition-all duration-300 group flex flex-col justify-between h-full mx-auto">
          <div className="group cursor-pointer flex items-center justify-center px-0 sm:px-2 mb-2 sm:mb-3">
            <img
              className="group-hover:scale-110 transition-all duration-300 w-[60px] h-[60px] sm:w-[104px] sm:h-[104px] object-contain"
              src={Array.isArray(product.image) ? product.image[0] : product.image}
              alt={product.name}
            />
          </div>
          <div className="text-text-muted text-xs sm:text-sm flex flex-col gap-0.5">
            <p className="text-accent-color font-medium leading-tight">{product.category}</p>
            <p className="text-primary font-semibold text-sm sm:text-lg truncate w-full mt-0.5 leading-tight">
              {product.name}
            </p>
            <div className="flex items-center gap-1 mt-1 sm:mt-2">
              {Array(5)
                .fill("")
                .map((_, i) => (
                  <img
                    key={i}
                    src={i < 4 ? assets.star_icon : assets.star_dull_icon}
                    alt=""
                    className="w-3 h-3 sm:w-4 sm:h-4"
                  />
                ))}
              <p className="text-text-muted text-[10px] sm:text-xs ml-1">(3)</p>
            </div>
            <div className="flex items-end justify-between mt-2 sm:mt-4">
              <div>
                <p className="text-sm sm:text-xl font-bold text-accent-color leading-tight">
                  {currency} {product.offerPrice}
                </p>
                <span className="text-text-muted text-xs sm:text-sm line-through">
                  {currency}{product.price}
                </span>
              </div>
              <div onClick={(e) => {e.stopPropagation();}} className="text-accent-color">
                {!cartItems[product._id] ? (
                  <button
                    className="flex items-center justify-center gap-1 bg-blue-400 hover:bg-blue-500 text-white border-0 w-[48px] sm:w-[64px] md:w-[80px] h-[28px] sm:h-[34px] rounded-lg font-medium cursor-pointer transition-all duration-300 shadow-custom hover:shadow-custom-lg text-xs sm:text-sm"
                    onClick={(e) => {e.preventDefault(); fetchCart(product._id);}}
                  >
                    <IoMdCart className="w-4 h-4 text-white" />
                    <span className="hidden sm:inline">Add</span>
                  </button>
                ) : (
                  <div className="flex items-center justify-center gap-1 w-[48px] sm:w-16 md:w-20 h-[28px] sm:h-[34px] bg-tertiary rounded-lg select-none border border-custom">
                    <button
                      onClick={(e) => {e.preventDefault(); removeCartItem(product._id);}}
                      className="cursor-pointer text-md px-2 h-full hover:text-blue-500 rounded-l-lg transition-all duration-200"
                    >
                      -
                    </button>
                    <span className="w-4 sm:w-5 text-center text-primary font-medium">
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
