import React, { useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import img1 from "../../assets/daniel-monteiro-VMeHP3mNJL4-unsplash.jpg";
import img2 from "../../assets/$RPSISKI.jpg";
import img3 from "../../assets/Rectangle 3463272.png";

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: { img1 },
      title: "Girls Pink Moana Printed Dress",
      size: "S",
      price: 80,
      quantity: 1,
    },
    {
      id: 2,
      image: { img2 },
      title: "Women Textured Handheld Bag",
      size: "Regular",
      price: 80,
      quantity: 1,
    },
    {
      id: 3,
      image: { img3 },
      title: "Tailored Cotton Casual Shirt",
      size: "M",
      price: 40,
      quantity: 1,
    },
  ]);

  const handleQuantityChange = (id, change) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const deliveryCharge = 5;
  const discount = 0; // Update this value if needed
  const grandTotal = subtotal + deliveryCharge - discount;

  return (
    <div className="p-4 md:p-8 font-raleway">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Cart Items */}
        <div className="w-full lg:w-2/3">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between mb-4 border-b pb-4"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="ml-4">
                  <h2 className="font-bold">{item.title}</h2>
                  <p className="text-gray-600">Size: {item.size}</p>
                </div>
              </div>
              <div className="flex items-center">
                <span className="font-bold">${item.price}</span>
                <div className="flex items-center ml-4">
                  <button
                    className="border p-1"
                    onClick={() => handleQuantityChange(item.id, -1)}
                  >
                    <IoIosRemove />
                  </button>
                  <span className="px-2">{item.quantity}</span>
                  <button
                    className="border p-1"
                    onClick={() => handleQuantityChange(item.id, 1)}
                  >
                    <IoIosAdd />
                  </button>
                </div>
                <span className="font-bold ml-4">
                  ${item.price * item.quantity}
                </span>
                <button
                  className="ml-4 text-red-500"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
        {/* Summary Section */}
        <div className="w-full lg:w-1/3 border p-4 rounded-lg">
          <h2 className="text-xl font-bold mb-4">Summary</h2>
          <div className="mb-2 flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal}</span>
          </div>
          <div className="mb-2">
            <label htmlFor="discount-code" className="block mb-1">
              Enter Discount Code
            </label>
            <div className="flex">
              <input
                type="text"
                id="discount-code"
                className="border p-2 flex-1"
                placeholder="FLAT50"
              />
              <button className="bg-black text-white p-2 ml-2">Apply</button>
            </div>
          </div>
          <div className="mb-2 flex justify-between">
            <span>Delivery Charge</span>
            <span>${deliveryCharge}</span>
          </div>
          <div className="mb-4 flex justify-between">
            <span>Grand Total</span>
            <span>${grandTotal}</span>
          </div>
          <button className="w-full bg-black text-white p-2">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
