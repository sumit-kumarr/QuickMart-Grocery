import React from "react"
const NewsLetter = () => {
    
    return (
        <div className="flex flex-col items-center justify-center text-center mt-120 md:mt-32 lg:mt-40 pb-6 mx-2 sm:mx-6 md:mx-12 lg:mx-24 w-full ">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold">Never Miss a Deal!</h1>
            <p className="text-sm sm:text-base md:text-lg text-gray-500/70 pb-6 sm:pb-8">
                Subscribe to get the latest offers, new arrivals, and exclusive discounts
            </p>
            <form className="flex flex-col sm:flex-row items-center justify-center w-full max-w-xl gap-2 sm:gap-0">
                <input
                    className="border border-gray-300 rounded-md h-12 sm:h-13 outline-none w-full sm:w-auto flex-1 px-3 text-gray-500 focus:ring-2 focus:ring-indigo-400 transition-all"
                    type="text"
                    placeholder="Enter your email id"
                    required
                />
                <button type="submit" className="w-full sm:w-auto md:px-12 px-8 h-12 sm:h-13 text-white bg-indigo-500 hover:bg-indigo-600 transition-all cursor-pointer rounded-md">
                    Subscribe
                </button>
            </form>
        </div>
    )
}

export default NewsLetter
