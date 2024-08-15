import React from "react";
import { BsBagCheckFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
const ConfirmationModal = ({ isVisible, onClose }) => {
  const navigate = useNavigate();
  if (!isVisible) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="text-center">
          <div className="mb-3 mt-4 flex justify-center">
            <BsBagCheckFill size={50} />
            {/* <span className=" w-12 h-12 text-white bg-black rounded-full flex items-center justify-center"></span> */}
          </div>
          <h2 className="text-xl font-semibold mb-2">
            Your order is confirmed
          </h2>
          <p className="text-gray-600 mb-4">
            Thanks for shopping! Your order hasn't shipped yet, but we will send
            you an email when it does.
          </p>
          <button
            onClick={() => {
              onClose();
              navigate("/profile");
            }}
            className="bg-black text-white px-4 py-2 rounded-md mb-2 w-full"
          >
            View Order
          </button>
          <button
            onClick={() => {
              onClose();
              navigate("/");
            }}
            className="text-black border border-black px-4 py-2 rounded-md w-full"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
