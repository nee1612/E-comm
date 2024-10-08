import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { userCartItems, confirmOrder } from "../Config/firebase";
import {
  getDocs,
  collection,
  query,
  deleteDoc,
  doc,
  addDoc,
} from "firebase/firestore";
import UserContext from "../Context/UserContext";
import Loader from "./Loader";

const Review = ({
  selectedAddress,
  addresses,
  selectedPaymentMethod,
  cartList,
}) => {
  const { userDetails } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const orderRef = collection(confirmOrder, "confirmOrder");
  const address = addresses.find((address) => address.id === selectedAddress);
  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className=" mx-auto p-4 bg-white  rounded-md">
          <h2 className="text-lg font-semibold mb-4">
            Estimated delivery: <span className="font-normal">22 Feb 2022</span>
          </h2>

          <div className="space-y-4">
            {cartList.map((item) => (
              <div
                key={item.title}
                className="flex items-center justify-between"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-[4rem] h-[4rem] object-cover rounded"
                  />
                  <div className="ml-4">
                    <h3 className="font-medium">{item.title}</h3>
                    <p className="text-gray-600">Price : $ {item.price}</p>
                    <p className="text-gray-500 ">Size: {item.size}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Shipping Address */}
          <div className="mt-6">
            <h3 className="text-lg font-medium">Shipping Address</h3>
            {address ? (
              <>
                <p className="text-gray-600">{address.name}</p>
                <p className="text-gray-500 text-sm">{address.address}</p>
                <p className="text-gray-600">{address.flat}</p>
                <p className="text-gray-600">{address.area}</p>
                <p className="text-gray-600">
                  {address.city},{address.state} {address.pincode}
                </p>
              </>
            ) : (
              <p className="text-gray-500 text-sm">No address selected</p>
            )}
          </div>

          {/* Payment Method */}
          <div className="mt-6">
            <h3 className="text-lg font-medium">Payment Method</h3>
            <p className="text-gray-600">
              {" "}
              {selectedPaymentMethod === "card"
                ? "Debit/Credit Card"
                : selectedPaymentMethod === "googlepay"
                ? "Google Pay"
                : selectedPaymentMethod === "razorpay"
                ? "Razorpay"
                : selectedPaymentMethod === "cod"
                ? "Cash on Delivery"
                : "Not Selected"}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default Review;
