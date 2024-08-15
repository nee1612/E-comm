import React from "react";
import { useState } from "react";

import { IoIosClose } from "react-icons/io";
import ConfModal from "./ConfModal";

const WishlistItem = ({ item, removeItemFromWishlist, fetchWishlist }) => {
  const [showModal, setShowModal] = useState(false);

  const dummyOriginalPrice = (item.price * 1.3).toFixed(2);
  const discountedPrice = item.price.toFixed(2);

  return (
    <div className="relative font-raleway p-[0.6rem] border rounded-md shadow-sm hover:shadow-md transition-shadow">
      <button className="absolute top-4 right-4 ">
        <p
          className="border rounded-full w-5  flex justify-center align-middle items-center h-5 backdrop-blur-sm
         hover:bg-gray-200 transition-colors bg-gray-300  border-gray-300
        "
        >
          <IoIosClose
            onClick={() => removeItemFromWishlist(item.id)}
            color="#201E43"
            size={20}
          />
        </p>
      </button>
      <img
        src={item.image}
        alt={item.title}
        className="w-full h-64 object-cover rounded-md mb-4"
      />
      <h3 className="font-medium text-lg ">{item.title}</h3>
      <p className="bg-green-100 text-green-700 text-sm inline-block mt-2 px-2 rounded-md mb-3">
        {item.label}
      </p>
      <div className="flex items-center justify-between mb-2 mx-1">
        <p className="flex items-center gap-2">
          <p className="text-base font-semibold text-black font-radio-canada">
            $ {discountedPrice}
          </p>
          <p className="text-gray-400 text-base line-through font-radio-canada">
            $ {dummyOriginalPrice}
          </p>
        </p>
        <p className="text-orange-500 text-sm  font-radio-canada">(50%OFF)</p>
      </div>
      <button
        onClick={() => setShowModal(true)}
        className="bg-black mb-3 text-white py-2 px-4 rounded-md w-full"
      >
        Add to Cart
      </button>
      <ConfModal
        showModal={showModal}
        setShowModal={setShowModal}
        item={item}
        removeItemFromWishlist={removeItemFromWishlist}
        fetchWishlist={fetchWishlist}
      />
    </div>
  );
};

export default WishlistItem;
