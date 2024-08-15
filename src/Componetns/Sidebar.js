import React, { useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { IoHome } from "react-icons/io5";
import { FaBox, FaUser, FaHeart } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";

function Sidebar({ isOpen, closeSidebar, logOut, refToken }) {
  const sidebarRef = useRef(null);
  const navigate = useNavigate();

  // Handle clicks outside the sidebar and manage body scroll
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    if (isOpen) {
      document.body.style.overflow = "hidden"; // Prevent background scroll
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.body.style.overflow = "auto"; // Re-enable background scroll
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "auto"; // Ensure scroll is re-enabled
    };
  }, [isOpen, closeSidebar]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50"
          onClick={closeSidebar}
        ></div>
      )}
      <div
        ref={sidebarRef}
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          onClick={closeSidebar}
          className="absolute top-8 right-8 text-2xl"
        >
          <IoClose size={33} />
        </button>
        <div className="flex flex-col h-full">
          <div className="flex flex-col p-6 space-y-10 mt-16 mx-2 flex-grow">
            <Link
              to="/"
              className="text-lg font-semibold hover:text-gray-700 flex items-center gap-3"
            >
              <IoHome size={24} />
              Home
            </Link>
            <Link
              to="/profile"
              className="text-lg font-semibold hover:text-gray-700 flex items-center gap-3"
            >
              <FaBox size={22} />
              My Orders
            </Link>
            <Link
              to="/profile"
              className="text-lg font-semibold hover:text-gray-700 flex items-center gap-3"
            >
              <FaUser size={23} />
              My Account
            </Link>
            <Link
              to="/wishlist"
              className="text-lg font-semibold hover:text-gray-700 flex items-center gap-3"
            >
              <FaHeart size={25} />
              My Wishlist
            </Link>
            <Link
              to="#"
              className="text-lg font-semibold hover:text-gray-700 flex items-center gap-3"
            >
              <IoInformationCircle size={30} />
              About
            </Link>
          </div>
          <div className="p-6">
            {refToken ? (
              <button
                onClick={logOut}
                className="bg-black text-white py-2 px-4 rounded-md w-full hover:bg-gray-800"
              >
                Logout
              </button>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="bg-black text-white py-2 px-4 rounded-md w-full hover:bg-gray-800"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Sidebar;
