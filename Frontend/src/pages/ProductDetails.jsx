import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../Components/ProductCard";
import Loader from "../Components/Loader";
const ProductDetails = () => {
  const { products, navigate, currency, fetchCart, fetchProducts } = useAppContext();
  const { id } = useParams();
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);

  const product = products.find((item) => item._id === id);

  useEffect(() => {
    if (products.length > 0 && product) {
      let related = products.slice();
      // If product.category is array, match any category
      if (Array.isArray(product.category)) {
        related = related.filter(
          (item) =>
            Array.isArray(item.category) &&
            item._id !== product._id &&
            item.category.some((cat) => product.category.includes(cat))
        );
      } else {
        related = related.filter(
          (item) =>
            item.category === product.category && item._id !== product._id
        );
      }
      setRelatedProducts(related.slice(0, 5));
    } else {
      setRelatedProducts([]);
    }
  }, [products, product]);

  useEffect(() => {
    if (Array.isArray(product?.image)) {
      setThumbnail(product.image[0] || null);
    } else {
      setThumbnail(product?.image || null);
    }
  }, [product]);

  // Ensure products are available when landing directly on this page
  useEffect(() => {
    if (!products || products.length === 0) {
      setLoading(true);
      fetchProducts()?.finally?.(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [products, fetchProducts]);

  if (loading || products.length === 0) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="bg-primary min-h-screen flex items-center justify-center">
        <h2 className="text-2xl text-primary font-bold">Product not found.</h2>
      </div>
    );
  }

  return (
    <div className="mt-12 bg-primary min-h-screen">
        <p className="text-primary">
          <Link
            to="/"
            className="text-primary hover:text-accent-color transition-colors"
          >
            {" "}
            Home
          </Link>
          /
          <Link
            to="/products"
            className="text-primary hover:text-accent-color transition-colors"
          >
            Product
          </Link>
          /
          {product.category && (
            Array.isArray(product.category) ? (
              product.category.map((cat, idx) => (
                <React.Fragment key={cat}>
                  <Link
                    to={`/category/${String(cat).toLowerCase()}`}
                    className="text-primary hover:text-accent-color transition-colors"
                  >
                    {cat}
                  </Link>
                  {idx < product.category.length - 1 ? ', ' : ''}
                </React.Fragment>
              ))
            ) : (
              <Link
                to={`/category/${String(product.category).toLowerCase()}`}
                className="text-primary hover:text-accent-color transition-colors"
              >
                {product.category}
              </Link>
            )
          )}
          /<span className="text-accent-color"> {product.name}</span>
        </p>

        <div className="flex flex-col md:flex-row gap-16 mt-4">
          <div className="flex gap-3">
            <div className="flex flex-col gap-3">
              {Array.isArray(product?.image) && product.image.length > 0 ? (
                product.image.map((image, index) => (
                  <div
                    key={index}
                    onClick={() => setThumbnail(image)}
                    className="border max-w-24 border-custom rounded overflow-hidden cursor-pointer bg-tertiary hover:bg-accent-color/10 transition-colors"
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </div>
                ))
              ) : (
                <div className="border max-w-24 border-custom rounded overflow-hidden bg-tertiary flex items-center justify-center h-24">
                  <span className="text-text-muted">No Image</span>
                </div>
              )}
            </div>

            <div className="border border-custom max-w-100 rounded overflow-hidden bg-tertiary">
              {thumbnail ? (
                <img
                  src={thumbnail}
                  alt="Selected product"
                  className="w-full h-full object-cover cursor-pointer"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-text-muted">No Image</div>
              )}
            </div>
          </div>

          <div className="text-sm w-full md:w-1/2">
            <h1 className="text-3xl font-medium text-primary">
              {product.name || 'No Name'}
            </h1>

            <div className="flex items-center gap-0.5 mt-1">
              {Array(5)
                .fill("")
                .map((_, i) =>
                  Number(product.rating) > i ? (
                    <svg
                      key={i}
                      width="14"
                      height="13"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.049.927c.3-.921 1.603-.921 1.902 0l1.294 3.983a1 1 0 0 0 .951.69h4.188c.969 0 1.371 1.24.588 1.81l-3.388 2.46a1 1 0 0 0-.364 1.118l1.295 3.983c.299.921-.756 1.688-1.54 1.118L9.589 13.63a1 1 0 0 0-1.176 0l-3.389 2.46c-.783.57-1.838-.197-1.539-1.118L4.78 10.99a1 1 0 0 0-.363-1.118L1.028 7.41c-.783-.57-.38-1.81.588-1.81h4.188a1 1 0 0 0 .95-.69z"
                        fill="#615fff"
                      />
                    </svg>
                  ) : (
                    <svg
                      width="14"
                      height="13"
                      viewBox="0 0 18 17"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M8.04894 0.927049C8.3483 0.00573802 9.6517 0.00574017 9.95106 0.927051L11.2451 4.90983C11.379 5.32185 11.763 5.60081 12.1962 5.60081H16.3839C17.3527 5.60081 17.7554 6.84043 16.9717 7.40983L13.5838 9.87132C13.2333 10.126 13.0866 10.5773 13.2205 10.9894L14.5146 14.9721C14.8139 15.8934 13.7595 16.6596 12.9757 16.0902L9.58778 13.6287C9.2373 13.374 8.7627 13.374 8.41221 13.6287L5.02426 16.0902C4.24054 16.6596 3.18607 15.8934 3.48542 14.9721L4.7795 10.9894C4.91338 10.5773 4.76672 10.126 4.41623 9.87132L1.02827 7.40983C0.244561 6.84043 0.647338 5.60081 1.61606 5.60081H5.8038C6.23703 5.60081 6.62099 5.32185 6.75486 4.90983L8.04894 0.927049Z"
                        fill="#615fff"
                        fill-opacity="0.35"
                      />
                    </svg>
                  )
                )}
              <p className="text-base ml-2 text-text-muted">({product.rating || 0})</p>
            </div>

            <div className="mt-6">
              {product.price && (
                <p className="text-text-muted line-through">
                  MRP: {currency}
                  {product.price}
                </p>
              )}
              <p className="text-2xl font-medium text-accent-color">
                MRP: {currency}
                {product.offerPrice || 'N/A'}
              </p>
              <span className="text-text-muted">(inclusive of all taxes)</span>
            </div>

            <p className="text-base font-medium mt-6 text-primary">
              About Product
            </p>
            <ul className="list-disc ml-4 text-text-muted">
              {Array.isArray(product.description)
                ? product.description.map((desc, index) => (
                    <li key={index}>{desc}</li>
                  ))
                : <li>No description available.</li>
              }
            </ul>

            <div className="flex items-center mt-10 gap-4 text-base">
              <button
                onClick={() => fetchCart(product._id)}
                className="w-full border border-blue-400 py-3.5 cursor-pointer font-medium bg-tertiary text-primary hover:bg-accent-color/10 transition-all duration-300 rounded-lg"
              >
                Add to Cart
              </button>
              <button
                onClick={() => {
                  fetchCart(product._id);
                  navigate("/cart");
                }}
                className="w-full py-3.5 cursor-pointer font-medium bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300 rounded-lg"
              >
                Buy now
              </button>
            </div>
          </div>
        </div>

        {/* related Products */}
        <div className="flex flex-col items-center mt-20 gap-4">
          <div className="flex flex-col items-center w-max">
            <p className="text-3xl font-bold text-primary">Related Products</p>
            <div className="w-20 h-0.5 bg-accent-color rounded-full mt-2"></div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 sm:grid-cols-3 lg:grid-cols-5 mt-5 w-full gap-5">
            {relatedProducts.length > 0 &&
              relatedProducts
                .filter((product) => product.inStock)
                .map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
          </div>
        </div>
        <button
          onClick={() => {
            navigate("/products");
            scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border border-custom rounded-2xl text-white bg-blue-400 transition-all duration-300"
        >
          See More
        </button>
      </div>
    )
  
};

export default ProductDetails;
