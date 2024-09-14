import React from "react";

const categories = [
  {
    title: "Casual Wear",
    image:
      "https://res.cloudinary.com/codemingle/image/upload/w_auto,q_auto,f_auto/v1726266123/extra/menCasual_hkjb1c.jpg",
  },
  {
    title: "Western Wear",
    image:
      "https://res.cloudinary.com/codemingle/image/upload/w_auto,q_auto,f_auto/extra/western_ay6apf.jpg",
  },
  {
    title: "Ethnic Wear",
    image:
      "https://res.cloudinary.com/codemingle/image/upload/w_auto,q_auto,f_auto/v1726266178/extra/ethenic_e5hynd.jpg",
  },
  {
    title: "Kids Wear",
    image:
      "https://res.cloudinary.com/codemingle/image/upload/w_auto,q_auto,f_auto/v1726266179/extra/kids_epbfla.jpg",
  },
];

const ShopByCategories = () => {
  return (
    <div className="p-8 font-raleway">
      <h1 className="text-3xl font-bold mb-8">Shop by Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mx-3">
        {categories.map((category, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg"
          >
            <img
              src={category.image}
              alt={category.title}
              loading="lazy"
              className="w-full h-full object-cover transition-transform duration-500 ease-in-out transform group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-in-out"></div>
            <div className="absolute bottom-11 left-0 right-0 p-4 mb-5 text-center text-white font-semibold text-lg transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out">
              {category.title}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShopByCategories;
