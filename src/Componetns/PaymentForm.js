// src/components/PaymentForm.js

import React, { useContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import logo from "../assets/favIcon.png";
import UserContext from "../Context/UserContext";

const PaymentForm = ({ handleSubmitPayment, grandTotal, setOrderId }) => {
  const { userDetails } = useContext(UserContext);
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const handlePayment = async () => {
    try {
      const { data } = await axios.post("http://localhost:3001/create-order", {
        amount: grandTotal * 100,
      });
      console.log(data);
      const options = {
        key: "rzp_test_xxCTNCzXz9FyIk", // Your Test Key ID
        amount: data.amount, // Amount in paise
        currency: "INR",
        name: "Krist",
        description: "Order Payment",
        image: { logo },
        order_id: data.orderId,
        handler: async function (response) {
          const { data: verificationResponse } = await axios.post(
            "http://localhost:3001/verify-payment",
            {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
              amount: grandTotal * 100,
              userId: userDetails.uid,
              userCheckedOut: false,
            }
          );
          setOrderId(response.razorpay_order_id);
          toast.success("Payment Successful: " + verificationResponse.message);
          handleSubmitPayment(selectedPayment);
        },
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        notes: {
          address: "Test Address",
        },
        theme: {
          color: "#F37254",
        },
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();
    } catch (error) {
      console.error("Error initiating payment:", error);
    }
  };

  const handleContinue = () => {
    if (selectedPayment === "card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast.error("Please fill all the fields");
        return;
      }
      // Handle card payment logic here if needed
      toast.success("Card payment logic to be implemented");
    } else if (selectedPayment === "razorpay") {
      handlePayment();
    } else {
      // Handle other payment methods
      toast.success(`Selected payment method: ${selectedPayment}`);
      handleSubmitPayment(selectedPayment);
    }
  };

  return (
    <div className="w-full p-6">
      <div className="space-y-6">
        {/* Debit/Credit Card */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="card"
              checked={selectedPayment === "card"}
              onChange={() => setSelectedPayment("card")}
              className="form-radio text-black"
            />
            <span className="font-semibold">Debit/Credit Card</span>
          </label>
          {selectedPayment === "card" && (
            <div className="mt-4 space-y-4">
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="card-number"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="card-number"
                  className="w-full p-3 border rounded-md outline-none focus:ring-[1px]"
                  placeholder="3897 22XX 1900 3890"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                />
              </div>
              <div>
                <label
                  className="block text-sm font-medium mb-1"
                  htmlFor="card-name"
                >
                  Card Name
                </label>
                <input
                  type="text"
                  id="card-name"
                  className="w-full p-3 border rounded-md outline-none focus:ring-[1px]"
                  placeholder="Robert Fox"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="expiry-date"
                  >
                    Expiry Date
                  </label>
                  <input
                    type="text"
                    id="expiry-date"
                    className="w-full p-3 border rounded-md outline-none focus:ring-[1px]"
                    placeholder="09/26"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    className="block text-sm font-medium mb-1"
                    htmlFor="cvv"
                  >
                    CVV
                  </label>
                  <input
                    type="password"
                    id="cvv"
                    className="w-full p-3 border-[1px] rounded-md outline-none focus:ring-[1px]"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Other Payment Methods */}
        <div>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="googlepay"
              checked={selectedPayment === "googlepay"}
              onChange={() => setSelectedPayment("googlepay")}
              className="form-radio text-black"
            />
            <span className="font-semibold">Google Pay</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="razorpay"
              checked={selectedPayment === "razorpay"}
              onChange={() => setSelectedPayment("razorpay")}
              className="form-radio text-black"
            />
            <span className="font-semibold">Razorpay</span>
          </label>
        </div>

        <div>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              name="payment"
              value="cod"
              checked={selectedPayment === "cod"}
              onChange={() => setSelectedPayment("cod")}
              className="form-radio text-black"
            />
            <span className="font-semibold">Cash on Delivery</span>
          </label>
        </div>
      </div>

      <button
        onClick={handleContinue}
        className="w-[60%] mt-8 bg-black text-white py-3 rounded-md font-semibold hover:bg-gray-800"
      >
        Continue
      </button>
    </div>
  );
};

export default PaymentForm;
