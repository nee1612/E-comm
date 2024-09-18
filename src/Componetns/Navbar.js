import React, { useState, useContext } from "react";
import Logo from "../assets/image.png";
import { signOut } from "firebase/auth";
import { auth } from "../Config/firebase";
import { FaBars } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../Context/UserContext";
import Sidebar from "./Sidebar";
import { useScroll } from "../Context/ScrollContext";

function Nav() {
  const { cartList, clearCart, wishlist, clearWishlist, userDetails } =
    useContext(UserContext);
  const { scrollToProductGrid } = useScroll();
  const navigate = useNavigate();
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const logOut = async () => {
    try {
      await signOut(auth);
      clearCart();
      clearWishlist();
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  const handleShopClick = () => {
    scrollToProductGrid();
  };

  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center font-raleway sticky top-0 z-50">
      <div className="text-2xl font-bold">
        <Link to="/">
          <img src={Logo} alt="Krist" className="h-8" />
        </Link>
      </div>
      <div className="space-x-8 font-semibold hidden md:flex">
        <Link to="/" className="text-sm text-gray-700 hover:text-black">
          Home
        </Link>
        <Link
          onClick={handleShopClick}
          to="/"
          className="text-sm text-gray-700 hover:text-black"
        >
          Shop
        </Link>
        <Link to="/profile" className="text-sm text-gray-700 hover:text-black">
          Profile
        </Link>
        <Link to="/about" className="text-sm text-gray-700 hover:text-black">
          About Us
        </Link>
      </div>
      <div className="hidden items-center space-x-6 md:flex">
        <Link to="/profile" className="text-gray-700 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-user"
          >
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </Link>
        <Link
          to="/wishlist"
          className="text-gray-700 relative no-underline hover:text-black"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-heart"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
          {wishlist.length > 0 && (
            <p className="absolute w-[8px] h-[8px] text-[0.55rem] text-center top-[0.7px] -right-[2px] rounded-full bg-red-600 font-semibold text-white"></p>
          )}
        </Link>
        <Link to="/cart" className="text-gray-700 hover:text-black relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-cart"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          {cartList.length > 0 && (
            <p className="absolute w-3.5 h-3.5 text-[0.55rem] text-center -top-1 -right-2 rounded-full bg-red-600 font-semibold text-white">
              {cartList.length}
            </p>
          )}
        </Link>
        {userDetails && userDetails.emailVerified ? (
          <button
            onClick={logOut}
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Logout
          </button>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
          >
            Login
          </button>
        )}
      </div>
      <div className="flex md:hidden gap-5 align-middle items-center">
        <Link to="/cart" className="text-gray-700 hover:text-black relative">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-shopping-cart"
          >
            <circle cx="8" cy="21" r="1" />
            <circle cx="19" cy="21" r="1" />
            <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
          </svg>
          {userDetails && cartList.length > 0 && (
            <p className="absolute w-3.5 h-3.5 text-[0.55rem] text-center -top-1 -right-2 rounded-full bg-red-600 font-semibold text-white">
              {cartList.length}
            </p>
          )}
        </Link>
        <FaBars size={25} onClick={toggleSidebar} />
      </div>
      <Sidebar
        isOpen={isSidebarOpen}
        closeSidebar={closeSidebar}
        userDetails={userDetails}
        logOut={logOut}
      />
    </nav>
  );
}

export default Nav;
