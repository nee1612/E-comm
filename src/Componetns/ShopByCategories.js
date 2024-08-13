import React from "react";
import casualWear from "../assets/menCasual.jpg";
import westernWear from "../assets/western.jpg";
import kidsWear from "../assets/kids.jpg";
import ethnicWear from "../assets/ethenic.jpg";

const categories = [
  {
    title: "Casual Wear",
    image: casualWear,
  },
  {
    title: "Western Wear",
    image: westernWear,
  },
  {
    title: "Ethnic Wear",
    image: ethnicWear,
  },
  {
    title: "Kids Wear",
    image: kidsWear,
  },
];

const ShopByCategories = () => {
  return (
    <div className="p-8 font-raleway">
      <h1 className="text-3xl font-bold mb-8">Shop by Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
          >
            <img
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
            <div className="absolute bottom-11 left-0 right-0 p-4 mb-5 text-center text-white font-semibold text-lg transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
              {category.title}
            </div>
          </div>
        ))}
      </div>
      {/* <div className="flex justify-end mt-4 space-x-2">
        <button className="w-10 h-10 bg-white border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-200">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button className="w-10 h-10 bg-black text-white rounded-lg flex items-center justify-center hover:bg-gray-800">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div> */}
    </div>
  );
};

export default ShopByCategories;
