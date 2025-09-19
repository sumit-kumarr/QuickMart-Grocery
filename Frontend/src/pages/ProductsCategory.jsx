import { useAppContext } from '../context/AppContext';
import { useParams } from 'react-router-dom';
import React from 'react';
import ProductCard from '../Components/ProductCard';
import Loader from '../Components/Loader';

const ProductsCategory = () => {
    const { products } = useAppContext();
    const { category } = useParams();

    const normalizedCategory = String(category || '').toLowerCase();

    const filteredProducts = React.useMemo(() => {
        if (!Array.isArray(products) || products.length === 0) return [];
        return products.filter((product) => {
            const productCategory = product?.category;
            if (Array.isArray(productCategory)) {
                return productCategory.some((cat) => String(cat).toLowerCase() === normalizedCategory);
            }
            if (typeof productCategory === 'string') {
                return productCategory.toLowerCase() === normalizedCategory;
            }
            return false;
        });
    }, [products, normalizedCategory]);

    const title = normalizedCategory
        .split(' ')
        .map((s) => (s ? s[0].toUpperCase() + s.slice(1) : s))
        .join(' ');

    if (!products || products.length === 0) {
        return <div className='bg-primary min-h-screen flex items-center justify-center'><Loader/></div>;
    }

    return (
        <div className='mt-16 bg-primary min-h-screen'>
            <div className='flex flex-col items-end w-max'>
                <p className='text-2xl font-medium text-primary'>{title}</p>
                <div className='w-15 h-0.5 bg-accent-color rounded-full '></div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-4">
                {filteredProducts
                    .filter((p) => p.inStock)
                    .map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
            </div>
        </div>
    );
};

export default ProductsCategory;
