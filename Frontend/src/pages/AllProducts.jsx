import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import ProductCard from "../Components/ProductCard";
import Loader from "../Components/Loader";

const AllProducts = () => {
  const { products, searchQuery, setSearchQuery } = useAppContext();
  const [filerProducts, setFilterProducts] = useState([]);
  const[loading,setLoading]=useState(false)

  useEffect(() => {
    if (searchQuery.length > 0) {
      setFilterProducts(
        products.filter((product) =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    } else {
      setFilterProducts(products);
    }
  }, [products, searchQuery]);


  useEffect(()=>{
setLoading(true);
    setTimeout(() => {
      setLoading(false)
    }, 2000);
  },[])


  if(loading){
    return <div className="bg-primary min-h-screen flex items-center justify-center"><Loader/></div>
  }

  return (
    <div className="mt-16 flex flex-col bg-primary min-h-screen">
      <div className="flex flex-col items-end w-max gap-3">
        <p className="text-2xl underline font-bold uppercase text-primary">All Products</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-5 lg:grid-cols-5 mt-5">
        {filerProducts
          .filter((product) => product.inStock)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}
      </div>
    </div>
  );
};

export default AllProducts;
