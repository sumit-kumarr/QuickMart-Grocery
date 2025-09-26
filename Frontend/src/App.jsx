import React from 'react';
import Navbar from './Components/Navbar';
import Banner from './Components/Banner';
import Home from './pages/Home';
import { Routes,Route, useLocation } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useAppContext } from './context/AppContext';
import Login from './Components/Login';
import Footer from './Components/Footer';
import AllProducts from './pages/AllProducts';
import ProductsCategory from './pages/ProductsCategory';
import ProductDetails from './pages/ProductDetails';
import About from './pages/About';
import Cart from './pages/Cart';
import Address from './pages/Address';
import MyOrders from './pages/MyOrders';
import SellerLogin from './Components/seller/SellerLogin';
import SellerLayout from './pages/seller/SellerLayout';
import AddProduct from './pages/seller/AddProduct';
import ProductList from './pages/seller/ProductList';
import Orders from './pages/seller/Orders';
import Loading from './Components/loading';

const App = () => {
  const isSellerPath = useLocation().pathname.includes('seller');
  const{showUserLogin,isSeller} = useAppContext()
  return (
    <div className='text-default min-h-screen text-gray-700 bg-white'>
      {isSellerPath ? null : <Navbar/>}
      {showUserLogin?<Login/> : null}
      <Toaster></Toaster>
      <div className={`${isSellerPath ? '' : 'px-6 md:px-16 lg:px-24 xl:px-32'} bg-primary min-h-screen`}  >
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/products' element={<AllProducts/>}/>
        <Route path='/about' element={<About/>}/>
        {/* Order matters: more specific product detail routes must come before the category route */}
        <Route path='/products/:category/:id' element={<ProductDetails/>}/>
        <Route path='/products/:id' element={<ProductDetails/>}/>
        <Route path="/products/:category" element={<ProductsCategory/>}/>
        <Route path = "/cart" element={<Cart/>}></Route>
        <Route path='/*' element={<h1 className='text-3xl font-bold text-center mt-32 text-primary'>404 Page Not Found</h1>}/>
        <Route path ="/add-address" element={<Address/>}></Route>
        <Route path ="/my-orders" element={<MyOrders/>}></Route>
        <Route path ="/loader" element={<Loading/>}></Route>
        <Route path ="/seller" element={isSeller ? <SellerLayout/> : <SellerLogin/>}>
        <Route index element = {isSeller ? <AddProduct/> : null}/>
        <Route path='product-list' element = {<ProductList/>}/>
        <Route path='orders' element = {<Orders/>}/>
        </Route>
      </Routes>

      </div>
       {!isSellerPath&&<Footer/>}
    </div>
  );
}

export default App;
