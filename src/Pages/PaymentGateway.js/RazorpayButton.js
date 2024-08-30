// src/components/RazorpayButton.js

import React from "react";
import axios from "axios";

const RazorpayButton = () => {
  //   const handlePayment = async () => {
  //     try {
  //       // Request a new order ID from your server
  //       const { data } = await axios.post("http://localhost:3001/create-order");

  //       const options = {
  //         key: "rzp_test_xxCTNCzXz9FyIk", // Your Test Key ID
  //         amount: data.amount, // Amount in paise
  //         currency: "INR",
  //         name: "Krist",
  //         description: "Test Transaction",
  //         image: "https://your-logo-url.com/logo.png",
  //         order_id: data.orderId,
  //         handler: async function (response) {
  //           // Verify the payment signature on your server
  //           const { data: verificationResponse } = await axios.post(
  //             "http://localhost:3001/verify-payment",
  //             {
  //               paymentId: response.razorpay_payment_id,
  //               orderId: response.razorpay_order_id,
  //               signature: response.razorpay_signature,
  //             }
  //           );
  //           alert("Payment Successful: " + verificationResponse.message);
  //         },
  //         prefill: {
  //           name: "John Doe",
  //           email: "john.doe@example.com",
  //           contact: "9999999999",
  //         },
  //         notes: {
  //           address: "Test Address",
  //         },
  //         theme: {
  //           color: "#F37254",
  //         },
  //       };

  //       const paymentObject = new window.Razorpay(options);
  //       paymentObject.open();
  //     } catch (error) {
  //       console.error("Error initiating payment:", error);
  //     }
  //   };

  const handlePayment = async () => {
    try {
      // Request a new order ID from your server
      const { data } = await axios.post("http://localhost:3001/create-order");

      const options = {
        key: "rzp_test_xxCTNCzXz9FyIk", // Your Test Key ID
        amount: data.amount, // Amount in paise
        currency: "INR",
        name: "Your Company Name",
        description: "Test Transaction",
        image: "https://your-logo-url.com/logo.png",
        order_id: data.orderId,
        handler: async function (response) {
          const { data: verificationResponse } = await axios.post(
            "http://localhost:3001/verify-payment",
            {
              paymentId: response.razorpay_payment_id,
              orderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            }
          );
          alert("Payment Successful: " + verificationResponse.message);
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

  return (
    <button
      onClick={handlePayment}
      className="px-4 py-2 bg-blue-500 text-white rounded"
    >
      Pay with Razorpay
    </button>
  );
};

export default RazorpayButton;
