import React from "react";
import Logo from "../assets/image.png";

function Nav() {
  return (
    <nav className="bg-white shadow-md py-4 px-8 flex justify-between items-center font-raleway sticky top-0 z-50">
      <div className="text-2xl font-bold">
        <a href="#">
          <img src={Logo} alt="Krist" className="h-8" />
        </a>
      </div>

      <div className="flex space-x-8 font-semibold">
        <a href="#" className="text-sm text-gray-700 hover:text-black">
          Home
        </a>
        <a href="#" className="text-sm text-gray-700 hover:text-black">
          Shop
        </a>

        <a href="#" className="text-sm text-gray-700 hover:text-black">
          Our Story
        </a>
        <a href="#" className="text-sm text-gray-700 hover:text-black">
          Blog
        </a>
        <a href="#" className="text-sm text-gray-700 hover:text-black">
          Contact Us
        </a>
      </div>

      <div className="flex items-center space-x-6">
        <a href="#" className="text-gray-700 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-search"
          >
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.3-4.3" />
          </svg>
        </a>
        <a href="#" className="text-gray-700 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-heart"
          >
            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
          </svg>
        </a>
        <a href="#" className="text-gray-700 hover:text-black">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-shopping-bag"
          >
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
            <path d="M3 6h18" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
        </a>
        <a
          href="#"
          className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
        >
          Login
        </a>
      </div>
    </nav>
  );
}

export default Nav;
