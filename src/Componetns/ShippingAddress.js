import React, { useContext, useState } from "react";
import Nav from "./Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressBook,
  faCreditCard,
  faClipboardCheck,
} from "@fortawesome/free-solid-svg-icons";
import Address from "./Address";
import PaymentForm from "./PaymentForm";
import Review from "./Review";
import UserContext from "../Context/UserContext";

const ShippingAddress = () => {
  const { discountCode, setDiscountCode, applyDiscount, discount } =
    useContext(UserContext);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);

  const addresses = [
    {
      id: 1,
      name: "Robert Fox",
      address: "4517 Washington Ave. Manchester, Kentucky 39495",
    },
    {
      id: 2,
      name: "John Willions",
      address: "3891 Ranchview Dr. Richardson, California 62639",
    },
  ];

  const subtotal = 200;
  const discountedSubtotal = subtotal * (1 - discount);
  const deliveryCharge = 5;
  const grandTotal = discountedSubtotal + deliveryCharge;
  const [step, setStep] = useState(0);
  const steps = ["address", "payment", "review"];
  const handleDeliverHere = () => {
    setStep(1);
  };

  const handleSubmitPayment = (paymentMethod) => {
    setSelectedPaymentMethod(paymentMethod);
    setStep(2);
  };
  console.log(discount);
  const getIconColor = (index) => {
    return step >= index ? "#000" : "#c0c0c0";
  };
  return (
    <>
      <Nav />
      <div className="p-4 md:p-8 font-raleway">
        <h1 className="text-4xl font-semibold mb-16">
          {step === 0 && "Shipping Address"}
          {step === 1 && "Payment Method"}
          {step === 2 && "Review"}
        </h1>
        <div className="flex flex-col lg:flex-row justify-between gap-8">
          {/* Address Section */}
          <div className="w-full lg:w-2/3">
            <div className="flex items-center mb-4 mx-8 font-semibold justify-around relative">
              <div className="relative z-10 text-center">
                <FontAwesomeIcon
                  icon={faAddressBook}
                  className="text-2xl mb-1 "
                  style={{ color: getIconColor(0) }}
                />
                <div>Address</div>
              </div>
              <div className="flex-1 border-dashed border-t-[1.5px] border-gray-400 mx-4"></div>
              <div className="relative z-10 text-center">
                <FontAwesomeIcon
                  icon={faCreditCard}
                  className="text-2xl mb-1  "
                  style={{ color: getIconColor(1) }}
                />
                <div>Payment Method</div>
              </div>
              <div className="flex-1 border-dashed border-t-[1.5px] border-gray-400 mx-4"></div>
              <div className="relative z-10 text-center">
                <FontAwesomeIcon
                  icon={faClipboardCheck}
                  className="text-2xl mb-1 "
                  style={{ color: getIconColor(2) }}
                />
                <div>Review</div>
              </div>
            </div>
            {step === 0 && (
              <Address
                addresses={addresses}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
                handleDeliverHere={handleDeliverHere}
              />
            )}
            {step === 1 && (
              <PaymentForm handleSubmitPayment={handleSubmitPayment} />
            )}
            {step === 2 && (
              <Review
                addresses={addresses}
                selectedPaymentMethod={selectedPaymentMethod}
                selectedAddress={selectedAddress}
              />
            )}
          </div>
          {/* Summary Section */}

          <div
            style={{
              height: step === 2 ? "17.5rem" : "13.5rem",
            }}
            className="w-full 
           
          lg:w-[33%] border p-4 rounded-md shadow-md"
          >
            <h2 className="text-xl font-bold mb-2">Summary</h2>
            <hr className="mb-3" />
            <div className="mb-2 flex justify-between">
              <span>Subtotal</span>
              <span className="font-radio-canada">$ {subtotal.toFixed(2)}</span>
            </div>
            {discount > 0 && (
              <div className="mb-2 flex justify-between">
                <span>Discounted Subtotal</span>
                <span className="font-radio-canada">
                  $ {discountedSubtotal.toFixed(2)}
                </span>
              </div>
            )}

            <div className="mb-2 flex justify-between">
              <span>Delivery Charge</span>
              <span className="font-radio-canada">
                $ {deliveryCharge.toFixed(2)}
              </span>
            </div>
            <hr className="my-3" />
            <div className="mb-4 flex justify-between font-[700]">
              <span>Grand Total</span>
              <span className="font-radio-canada">
                $ {grandTotal.toFixed(2)}
              </span>
            </div>
            {step === 2 && (
              <button className="w-full bg-black hover:bg-slate-800 text-white p-2 rounded-lg mb-3">
                Proceed to Checkout
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ShippingAddress;
