import React, { useEffect, useState } from 'react';
import Banner from '../Components/Banner';
import Categories from '../Components/Categories';
import BestSeller from '../Components/BestSeller';
import BottomBanner from '../Components/BottomBanner';
import NewsLetter from '../Components/NewsLetter';
import Loader from '../Components/Loader'

const Home = () => {
  const[loading,setLoading] = useState(false);


  useEffect(()=>{
    setLoading(true)
    setTimeout(()=>{
      setLoading(false)
    },2000)
  },[])

  if(loading){
    return(
      <div className='flex justify-center items-center h-screen bg-primary'>
       <Loader/>
      </div>
    )
  }

  return (
    <div className='mt-10 mb-10 md:mb-20 lg:mb-28 bg-primary'>
        <Banner/>
        <Categories/>
        <BestSeller/>
        <BottomBanner/>
        <NewsLetter/>
    </div>
  );
}

export default Home;
