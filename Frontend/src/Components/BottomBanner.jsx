import React from "react";
import {  features } from "../assets/assets";

const BottomBanner = () => {
  return (
    <div className="relative w-full h-full md:h-60 lg:h-72 mt-24">
      <img
        src="minibanner.png"
        alt="banner"
        className="w-full hidden lg:block rounded-4xl"
      />
      {/* <img
        src="banner.png"
        alt="banner"
        className="w-full md:hidden block rounded-4xl"
      /> */}

      <div className="absolute inset-0 flex flex-col items-center justify-center md:items-end md:justify-center pt-16 md:pt-0 md:pr-24">
        <div className="mt-25">
          <h1 className="text-2xl md:text-2xl font-semibold text-indigo-500 mb-6 ">
            Fresh Vegetables <span className="text-gray-700">100% Organic</span>
          </h1>
          {features.map((feature,index) =>(
            <div key={index} className="flex items-center gap-4 mt-4">
                <img src={feature.icon} alt="title" className="md:w-11 w-9" />
                <div>
                    <h3 className="text-xl md:text-sm font-semibold">{feature.title}</h3>
                <p className="text-gray-500/70 text-xs md:text-sm">{feature.description}</p>
                </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BottomBanner;
