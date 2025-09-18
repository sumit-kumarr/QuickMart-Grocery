import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { IoMdCart } from "react-icons/io";
import { useAppContext } from "../context/AppContext";
import { AppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const [open, setOpen] = React.useState(false);
  const { user, setUser, setShowUserLogin } = useAppContext(AppContext);
  const { navigate } = useAppContext(AppContext);
  const { searchQuery, setSearchQuery, getCartCount, axios } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get("/api/user/logout");
      if (data.success) {
        toast.success(data.message)
        setUser(null);
        navigate("/");
      }
      else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate("/products");
    }
  }, [searchQuery]);


  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        open &&
        !event.target.closest(".mobile-menu") &&
        !event.target.closest(".menu-button")
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <nav className="flex items-center justify-between px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-4 border-b border-custom bg-secondary relative shadow-custom">
      {/* Logo */}
      <NavLink to="/" className="flex-shrink-0">
        <img src="Logoo.png" alt="QuickMart" className="w-16 sm:w-18 md:w-20" />
      </NavLink>

      {/* Desktop Navigation - Hidden on mobile and tablet */}
      <div className="hidden lg:flex items-center gap-6 xl:gap-8">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `hover:text-accent-color transition-colors ${
              isActive ? "text-accent-color font-semibold" : "text-primary"
            }`
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `hover:text-accent-color transition-colors ${
              isActive ? "text-accent-color font-semibold" : "text-primary"
            }`
          }
        >
          All Products
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `hover:text-accent-color transition-colors ${
              isActive ? "text-accent-color font-semibold" : "text-primary"
            }`
          }
        >
          Contact
        </NavLink>

        <NavLink
          to="/about"
          className={({ isActive }) =>
            `hover:text-blue-500 transition-colors ${
              isActive ? "text-black font-semibold" : "text-primary"
            }`
          }
        >
          About
        </NavLink>
      </div>

      {/* Desktop Search Bar - Hidden on mobile and tablet */}
      <div className="hidden lg:flex items-center text-sm gap-2 border border-custom px-3 py-1 rounded-full bg-primary shadow-custom">
        <input
          className="py-1 w-32 xl:w-48 bg-transparent outline-none placeholder:text-muted text-sm text-primary"
          type="text"
          placeholder="Search products"
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <img
          src={assets.search_icon}
          alt="Search"
          className="w-4 h-4 cursor-pointer opacity-60 hover:opacity-100"
        />
      </div>

      {/* Desktop Right Section - Cart, Login/Profile */}
      <div className="hidden lg:flex items-center gap-4">
        {/* Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer hover:scale-110 transition-transform"
        >
          <IoMdCart size={24} className="text-blue-500" />
          <span className="absolute -top-2 -right-3 text-xs text-white bg-black w-[18px] h-[18px] rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>

        {/* Login/Profile */}
        {!user ? (
          <button
            onClick={() => setShowUserLogin(true)}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-full text-sm font-medium"
          >
            Login
          </button>
        ) : (
          <div className="relative group">
            <img
              src={assets.profile_icon}
              alt="profile"
              className="w-8 h-8 rounded-full object-cover cursor-pointer hover:ring-2 hover:ring-accent-color transition-all"
            />
            <ul className="absolute top-10 right-0 w-40 bg-primary shadow-custom-lg rounded-lg py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 border border-custom">
              <li
                className="px-4 py-2 hover:bg-tertiary cursor-pointer text-sm transition-colors text-primary"
                onClick={() => navigate("/my-orders")}
              >
                My Orders
              </li>
              <li
                className="px-4 py-2 hover:bg-tertiary cursor-pointer text-sm transition-colors text-primary"
                onClick={logout}
              >
                Logout
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* Mobile/Tablet Right Section - Cart and Menu Button */}
      <div className="flex lg:hidden items-center gap-3">
        {/* Mobile Cart */}
        <div
          onClick={() => navigate("/cart")}
          className="relative cursor-pointer hover:scale-110 transition-transform"
        >
          <IoMdCart size={22} className="text-blue-400" />
          <span className="absolute -top-2 -right-2 text-xs text-white bg-blue-600 w-4 h-4 rounded-full flex items-center justify-center">
            {getCartCount()}
          </span>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          className=" p-2 bg-blue-400 cursor-pointer rounded-lg transition-colors"
        >
          <div className="w-5 h-5 flex flex-col justify-center items-center">
            <span
              className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${
                open ? "rotate-45 translate-y-0.5" : ""
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-primary transition-all duration-300 mt-1 ${
                open ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-5 h-0.5 bg-primary transition-all duration-300 mt-1 ${
                open ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </div>
        </button>
      </div>
      {/* mobile menu */}
      {open && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm bg-opacity-40 z-40 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile Slide Menu */}
      <div
        className={`mobile-menu fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-primary shadow-custom-lg z-50 flex flex-col pt-6 px-6 transform transition-transform duration-300 ease-in-out lg:hidden ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          className="self-end mb-6 text-text-muted hover:text-blue-500 cursor-pointer text-3xl transition-colors"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        >
          &times;
        </button>

        {/* Mobile Search */}
        <div className="flex items-center gap-2 border border-custom px-3 py-2 rounded-full mb-6 bg-tertiary">
          <input
            className="py-1 w-full bg-transparent outline-none placeholder:text-muted text-sm text-primary"
            type="text"
            placeholder="Search products"
            // value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <img
            src={assets.search_icon}
            alt="Search"
            className="w-4 h-4 cursor-pointer opacity-60"
          />
        </div>

        {/* Mobile Navigation Links */}
        <div className="flex flex-col gap-2 mb-6">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg transition-colors text-primary ${
                isActive
                  ? "bg-accent-color text-white font-semibold"
                  : "hover:bg-tertiary"
              }`
            }
            onClick={() => setOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg transition-colors text-primary ${
                isActive
                  ? "bg-accent-color text-white font-semibold"
                  : "hover:bg-tertiary"
              }`
            }
            onClick={() => setOpen(false)}
          >
            All Products
          </NavLink>
          {user && (
            <NavLink
              to="/my-orders"
              className={({ isActive }) =>
                `py-3 px-4 rounded-lg transition-colors text-primary ${
                  isActive
                    ? "bg-accent-color text-white font-semibold"
                    : "hover:bg-tertiary"
                }`
              }
              onClick={() => setOpen(false)}
            >
              My Orders
            </NavLink>
          )}
          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `py-3 px-4 rounded-lg transition-colors text-primary ${
                isActive
                  ? "bg-accent-color text-white font-semibold"
                  : "hover:bg-tertiary"
              }`
            }
            onClick={() => setOpen(false)}
          >
            Contact Us
          </NavLink>
        </div>

        {/* Mobile Login/Logout */}
        <div className="mt-auto pb-6">
          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="w-full px-6 py-3 bg-blue-500 hover:bg-blue-600 transition-colors text-white rounded-full text-sm font-medium"
            >
              Login
            </button>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-tertiary rounded-lg">
                <img
                  src={assets.profile_icon}
                  alt="profile"
                  className="w-10 h-10 rounded-full object-cover"
                />
                <span className="text-sm font-medium text-primary">
                  Welcome back!
                </span>
              </div>
              <button
                onClick={() => {
                  setOpen(false);
                  logout();
                }}
                className="w-full px-6 py-3 bg-red-500 hover:bg-red-600 transition-colors text-white rounded-full text-sm font-medium"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
