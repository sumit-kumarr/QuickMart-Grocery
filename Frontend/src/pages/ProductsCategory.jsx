import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';

import React from 'react';

const ProductsCategory = () => {
    const {products} = useAppContext();
    const{category} = useParams();

    const SearchCategory = products.find((item)=>
        item.path && typeof item.path === 'string' && item.path.toLowerCase() === category
    );
    const filterData = products.filter((product)=>
        product.category && typeof product.category === 'string' && product.category.toLowerCase() === category
    );
  return (
    <div className='mt-16 bg-primary min-h-screen'>
        {SearchCategory && (
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium text-primary'>{SearchCategory.text.toLocaleUpperCase()}</p>
                <div className='w-15 h-0.5 bg-accent-color rounded-full '>

                </div>
            </div>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
            {filterData.map((product) => (
                <div key={product.id} className="border p-2">
                    {product.name}
                </div>
            ))}
        </div>
    </div>
  );
}

export default ProductsCategory;
