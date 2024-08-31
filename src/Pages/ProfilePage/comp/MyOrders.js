import React, { useState, useEffect, useContext } from "react";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { userCartItems, confirmOrder } from "../../../Config/firebase";
import UserContext from "../../../Context/UserContext";
import moment from "moment/moment";
import Loader from "../../../Componetns/Loader";
import Lottie from "lottie-react";
import EmptyCart from "../../../assets/Lottie/noOrder.json";
import "./scroll.css";

const MyOrders = () => {
  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
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
                <div key={order.id} className="mb-4">
                  <div className="mb-2 inline-block">
                    <div className="flex align-middle items-center gap-2 bg-green-100 text-sm p-1 rounded-md text-green-600">
                      <p>Ordered On :</p>
                      <p>
                        {moment(order.createdAt.toDate()).format("MMM Do YY")}
                      </p>
                    </div>
                  </div>
                  {order.products.map((item) => (
                    <div
                      key={item.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b pb-2 pt-2 mb-3"
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
                      <div className=" text-left sm:text-right flex flex-col items-start sm:items-end">
                        <h3 className="text-base sm:text-lg font-bold">
                          ${item.price * item.quantity}
                        </h3>
                        <p
                          className={`mt-1 text-xs sm:text-sm px-2 py-1 rounded-lg ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-600"
                              : "bg-yellow-100 text-yellow-600"
                          }`}
                        >
                          {order.status === "Delivered"
                            ? "Delivered"
                            : "In Process"}
                        </p>
                        <button className="bg-red-100 text-red-600 px-2 text-xs py-1 mt-2 rounded-lg hover:bg-red-200">
                          Cancel Order
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MyOrders;
