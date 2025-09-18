import React from 'react';
import ProductCard from './ProductCard';
import { useAppContext } from '../context/AppContext';

const BestSeller = () => {
  const {products} = useAppContext()
  return (
    <div className='mt-10'>
        <p className='text-2xl md:text-3xl font-medium'>Best Seller</p>
      <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 mt-6 md:gap-6 lg:gap-8'>
        {products.filter((product) => product.inStock).slice(0,5).map((product, index) => (
          <ProductCard key={index} product={product}/>
        ))}


      </div>
    </div>
  );
}

export default BestSeller;
