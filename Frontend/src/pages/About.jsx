import React from "react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="mt-5 flex flex-col gap-2 bg-primary min-h-screen">
      <div className="flex items-center p-2 mb-4 gap-3">
        <img src="logoo.png" alt="QuickMartrLogo" className="w-20 h-20 " />
        <h1 className="text-3xl font-bold text-primary">About Us</h1>
      </div>
      <div className="flex flex-col gap-3 py-2 items-start">
        <p className="text-lg text-justify py-2 text-primary">
          <span className="text-2xl font-bold text-blue m-2">
            Welcome to QuickMart,
          </span>{" "}
          <br />
          your number one source for all things grocery. We're dedicated to
          providing you the very best of groceries, with an emphasis on quality,
          convenience, and customer service.
        </p>

        <p className="text-lg text-justify text-black">
          Founded in 2025, QuickMart has come a long way from its beginnings.
          When we first started out, our passion for convenient and reliable
          grocery shopping drove us to start our own business.
        </p>
      </div>
      <div className="flex my-6 relative gap-3">
        <img src="bannerr.png" alt="banner" className="max-w-2/3 rounded-3xl" />
        <div className="absolute flex flex-col top-1/3 left-30 transform items-start gap-3">
          <span className="text-2xl md:text-2xl sm:text-sm text-white drop-shadow-lg">your number one <br />source for all things <br /> grocery</span>
          <Link to = "/products">
          <button className="bg-blue text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 hover:scale-105 drop-shadow-lg border border-blue">
            Shop Now
          </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default About;
