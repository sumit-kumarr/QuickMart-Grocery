import React from "react";
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";

const Banner = () => {
  return (
    <div className="relative overflow-hidden rounded-3xl shadow-custom-lg">
      <img src="bannerr.png" alt="banner" className="w-full h-64 md:h-80 lg:h-96 object-cover hidden md:hidden lg:block" />
      <img
        src="bannerr.png"
        alt="banner"
        className="w-full h-64 md:h-80 lg:h-96 object-cover block md:block lg:hidden"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent"></div>
      <div className="absolute inset-0 flex flex-col items-start md:items-start justify-center md:justify-center pb-4 md:pb-0 px-4 md:pl-18 lg:pl-24">
        <h1 className="text-3xl md:text-4xl lg:text-5xl text-white font-bold text-center md:text-left max-w-72 md:max-w-80 lg:max-w-105 leading-tight lg:leading-15 drop-shadow-lg">
          Groceries in Minutes, <br />Happiness Forever.
        </h1>
      
      <div className="flex flex-col sm:flex-row gap-4 mt-6 font-medium">
        <Link
          to="/products"
          className="group mt-4 flex items-center justify-center gap-2 bg-blue-500 text-white px-6 py-3 rounded-full font-medium hover:bg-blue-600 transition-all duration-300 shadow-custom hover:shadow-custom-lg transform hover:scale-105"
        >
          Shop Now
          <img
            src={assets.white_arrow_icon}
            alt="arrow"
            className="w-4 h-4 transition group-hover:translate-x-1"
          />
        </Link>

        <Link
          to="/products"
          className="group mt-4 hidden md:flex border-2 border-white items-center justify-center gap-2 text-white px-6 py-3 rounded-full font-medium hover:text-accent-color transition-all duration-300 backdrop-blur-sm"
        >
          Explore Products
          <img
            src={assets.black_arrow_icon}
            alt="arrow"
            className="w-4 h-4 transition group-hover:translate-x-1"
          />
        </Link>
      </div>
      </div>
    </div>
  );
};

export default Banner;
