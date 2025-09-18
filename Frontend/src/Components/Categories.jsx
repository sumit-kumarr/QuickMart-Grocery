import React from "react";
import { categories } from "../assets/assets";
import { useAppContext } from "../context/AppContext";

const Categories = () => {
    const {navigate } = useAppContext()
  return (
    <div className="mt-10 flex flex-col gap-6">
      <p className="text-2xl md:text-3xl font-medium text-primary">Categories</p>
      <div className="grid grid-cols-2 md:grid-cols-5 sm:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 mt-7 gap-4">

            {categories.map((category,index) => (
                <div key={index} className="group py-5 px-3 rounded-xl flex flex-col justify-center items-center gap-2 cursor-pointer hover:scale-105 duration-300 shadow-custom hover:shadow-custom-lg transition-all"
                style={{backgroundColor:category.bgColor}}
        onClick={() => {
          navigate(`/products/${category.path.toLowerCase()}`);
          scrollTo(0,0)
        }}
                >
                    <img src={category.image} alt={category.text} className="group-hover:scale-110 transition-all duration-300 max-w-28" />
                    <p className="text-sm font-medium text-primary group-hover:text-accent-color transition-colors">{category.text}</p>
                </div>
            ))}
        </div>
      </div>
  );
};

export default Categories;
