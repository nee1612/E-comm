import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { confirmOrder } from "../../../Config/firebase";
import UserContext from "../../../Context/UserContext";
import moment from "moment";
import Loader from "../../../Componetns/Loader";
import Lottie from "lottie-react";
import EmptyCart from "../../../assets/Lottie/noOrder.json";
import OrderDetailsPopup from "./OrderDetailsPopup";
import "./scroll.css";

const MyOrders = () => {
  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const { userDetails } = useContext(UserContext);
  const orderRef = collection(confirmOrder, "confirmOrder");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const orders = await getDocs(
        query(orderRef, orderBy("createdAt", "desc"))
      );
      const filterItemByUser = orders.docs.filter(
        (doc) => doc.data().userId === userDetails.uid
      );
      const cartItems = filterItemByUser.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCartList(cartItems);
      console.log(cartItems);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleViewOrder = (order) => {
    setSelectedOrder(order);
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
    setSelectedOrder(null);
  };

  useEffect(() => {
    fetchOrders();
  }, [userDetails.uid]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="w-full h-full md:h-[calc(100vh-7rem)] p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md overflow-y-scroll custom-scrollbar">
          {cartList.length === 0 ? (
            <div>
              <div className="flex justify-center">
                <Lottie animationData={EmptyCart} className="w-[50%]" />
              </div>
              <p className="text-center mb-3">
                You have not placed any orders yet. Go to the shop and place
                your
              </p>
            </div>
          ) : (
            <div>
              <p className="text-2xl font-semibold mb-4">My Orders</p>
              {cartList.map((order) => (
                <div
                  key={order.id}
                  onClick={() => handleViewOrder(order)}
                  className="mb-4 px-5 py-3 rounded-md bg-white cursor-pointer transition duration-300 ease-in-out border-[1.2px] border-opacity-20 border-black hover:shadow-md hover:border-opacity-30 hover:border-cyan-600"
                >
                  <div className="mb-2 inline-block sm:flex justify-between ">
                    <div className="flex align-middle items-center gap-2 bg-green-100 text-sm px-3 py-1 rounded-md text-green-600">
                      <p>Ordered On :</p>
                      <p>
                        {moment(order.createdAt.toDate()).format("MMM Do YY")}
                      </p>
                    </div>
                    <div className="hidden sm:inline-block border-[1px] border-black px-3 py-1 text-sm rounded-md border-opacity-20 text-black cursor-pointer hover:bg-gray-50 hover:text-gray-600 transition duration-300 ease-in-out">
                      <p>View Order</p>
                    </div>
                  </div>
                  {order.products.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-1 pt-2 mb-1"
                    >
                      <div className="flex items-start sm:items-center mb-2 sm:mb-0">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded"
                        />
                        <div className="ml-2 sm:ml-4">
                          <h2 className="text-base sm:text-lg font-bold">
                            {item.title}
                          </h2>
                          <p className="text-gray-600">Size: {item.size}</p>
                          <p className="text-gray-600">Qty: {item.quantity}</p>
                        </div>
                      </div>
                      <div className="text-left sm:text-right flex flex-col items-start sm:items-end">
                        <h3 className="text-base sm:text-lg font-bold">
                          ${item.price * item.quantity}
                        </h3>
                        <p
                          className={`mt-1 text-xs sm:text-sm px-5 py-1 rounded-md ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {order.status === "Delivered"
                            ? "Delivered"
                            : "In Process"}
                        </p>
                        <button className="bg-cyan-100 text-cyan-600 px-3 text-xs sm:text-sm py-1 mt-2 rounded-md">
                          {item.label}
                        </button>
                      </div>
                    </div>
                  ))}
                  <button
                    className="w-full sm:hidden flex justify-center border-[1px] border-black px-3 py-1 text-sm rounded-md border-opacity-20 text-black cursor-pointer hover:bg-gray-50 hover:text-gray-600 transition duration-300 ease-in-out"
                    onClick={() => handleViewOrder(order)}
                  >
                    View Order
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <OrderDetailsPopup
        order={selectedOrder}
        isPopupOpen={isPopupOpen}
        onClose={handleClosePopup}
      />
    </>
  );
};

export default MyOrders;
