import React, { useState } from "react";
import { toast } from "react-toastify";

const PaymentForm = ({ handleSubmitPayment }) => {
  const [selectedPayment, setSelectedPayment] = useState("card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  //   const [error, setError] = useState("");

  const handleContinue = () => {
    if (selectedPayment === "card") {
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        toast.error("Please fill all the fields", {
          position: "top-center",
          className: "custom-toast-error",
          bodyClassName: "customToast",
        });
        return;
      }
    }
    handleSubmitPayment(selectedPayment);
  };

  return (
    <div className="w-full max-w-[80%] mx-auto p-6">
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
              value="paypal"
              checked={selectedPayment === "paypal"}
              onChange={() => setSelectedPayment("paypal")}
              className="form-radio text-black"
            />
            <span className="font-semibold">Paypal</span>
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
