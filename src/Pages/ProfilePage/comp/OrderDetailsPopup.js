import React from "react";
import moment from "moment";
import OrderStatusTracker from "./OrderStatusTracker"; // Import the tracker component

const OrderDetailsPopup = ({ isPopupOpen, onClose }) => {
  if (!isPopupOpen) return null;

  // Dummy data
  const dummyOrder = {
    id: "123456",
    createdAt: new Date(),
    status: "Delivered", // Adjust the status according to your logic
    shippingAddress: {
      name: "John Doe",
      address: "123 Main St",
      city: "Springfield",
      state: "IL",
      zipCode: "62701",
    },
    paymentMethod: "Credit Card",
    totalAmount: 99.99,
    products: [
      {
        id: "prod1",
        image: "https://via.placeholder.com/150",
        title: "Sample Product 1",
        size: "M",
        quantity: 2,
        price: 25.0,
      },
      {
        id: "prod2",
        image: "https://via.placeholder.com/150",
        title: "Sample Product 2",
        size: "L",
        quantity: 1,
        price: 49.99,
      },
    ],
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-[94%] sm:w-[80%] lg:w-[60%] max-h-[90vh] p-4 sm:p-6 overflow-y-auto custom-scrollbar">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl sm:text-2xl font-semibold">Order Details</h2>
          <button
            className="text-gray-500 hover:text-gray-800 text-lg sm:text-xl"
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Order Information</h3>
          <p>
            <strong>Order ID:</strong> {dummyOrder.id}
          </p>
          <p>
            <strong>Ordered On:</strong>{" "}
            {moment(dummyOrder.createdAt).format("MMM Do YY, h:mm A")}
          </p>
          <p>
            <strong>Status:</strong> {dummyOrder.status}
          </p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Ordered Items</h3>
          {dummyOrder.products.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center py-2 border-b border-gray-200"
            >
              <div className="flex items-center">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-12 h-12 sm:w-16 sm:h-16 object-cover rounded"
                />
                <div className="ml-4">
                  <h4 className="text-base font-semibold">{item.title}</h4>
                  <p className="text-sm text-gray-600">Size: {item.size}</p>
                  <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                </div>
              </div>
              <div>
                <h4 className="text-lg font-semibold">
                  ${item.price * item.quantity}
                </h4>
              </div>
            </div>
          ))}
        </div>

        {/* Insert Order Status Tracker here */}
        <OrderStatusTracker status={0} />

        <div className="mb-4 mt-6">
          <h3 className="text-lg font-semibold">Shipping Address</h3>
          <p>{dummyOrder.shippingAddress.name}</p>
          <p>{dummyOrder.shippingAddress.address}</p>
          <p>{dummyOrder.shippingAddress.city}</p>
          <p>{dummyOrder.shippingAddress.state}</p>
          <p>{dummyOrder.shippingAddress.zipCode}</p>
        </div>
        <div className="mb-4">
          <h3 className="text-lg font-semibold">Payment Details</h3>
          <p>
            <strong>Payment Method:</strong> {dummyOrder.paymentMethod}
          </p>
          <p>
            <strong>Total Amount:</strong> ${dummyOrder.totalAmount.toFixed(2)}
          </p>
        </div>

        <button
          className="bg-cyan-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-cyan-700 transition"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default OrderDetailsPopup;
