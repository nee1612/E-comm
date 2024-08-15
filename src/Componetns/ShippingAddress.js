import React, { useContext, useEffect, useState } from "react";
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
import ConfirmationModal from "./ConfirmationModal";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import { confirmOrder, userCartItems } from "../Config/firebase";
import Loader from "./Loader";

const ShippingAddress = () => {
  const { discount, userDetails } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const orderRef = collection(confirmOrder, "confirmOrder");

  const [loading, setLoading] = useState(false);
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  //   function to confirm order
  const handleConfirmOrder = async () => {
    setLoading(true);
    try {
      const order = await addDoc(orderRef, {
        userId: userDetails.uid,
        address: selectedAddress,
        paymentMethod: selectedPaymentMethod,
        createdAt: new Date(),
        products: cartList,
      });
      setLoading(false);
      setIsModalVisible(true);
    } catch (err) {
      console.error(err);
    }
  };
  const cartItemsRef = collection(userCartItems, "cartItems");
  const [cartList, setCartList] = useState([]);
  const fetchCartItems = async () => {
    setLoading(true);
    try {
      const cartIt = await getDocs(query(cartItemsRef));
      const filterItemByUser = cartIt.docs.filter(
        (doc) => doc.data().userId === userDetails.uid
      );
      const cartItems = filterItemByUser.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(cartItems);
      setCartList(cartItems);
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };
  useEffect(() => {
    fetchCartItems();
  }, [userDetails.uid]);
  // remove item from cart for current user
  const handleRemoveItemsFromCart = async () => {
    setLoading(true);
    try {
      cartList.forEach(async (item) => {
        await deleteDoc(doc(cartItemsRef, item.id));
      });
      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  };

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

  const subtotal = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
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
  const handleCheckout = () => {
    handleConfirmOrder();
    handleRemoveItemsFromCart();
  };

  const getIconColor = (index) => {
    return step >= index ? "#000" : "#c0c0c0";
  };

  return (
    <>
      <Nav />
      {loading ? (
        <Loader />
      ) : (
        <div className="p-4 md:p-8 font-raleway">
          <h1 className=" text-2xl sm:text-3xl md:text-4xl font-semibold ml-5 mb-7 sm:mb-10">
            {step === 0 && "Shipping Address"}
            {step === 1 && "Payment Method"}
            {step === 2 && "Review"}
          </h1>
          <div className="flex flex-col lg:flex-row justify-between gap-8">
            {/* Address Section */}
            <div className="w-full lg:w-2/3">
              <div className="flex items-center mb-4 mx-3 sm:mx-8 font-semibold justify-around relative">
                <div className="relative z-10 text-center">
                  <FontAwesomeIcon
                    icon={faAddressBook}
                    className="text-2xl mb-1 "
                    style={{ color: getIconColor(0) }}
                  />
                  <div>Address</div>
                </div>
                <div className="flex-1 border-dashed   border-t-[1.5px] border-gray-400 mx-4"></div>
                <div className="relative z-10 text-center mt-6 sm:mt-0">
                  <FontAwesomeIcon
                    icon={faCreditCard}
                    className="text-2xl mb-1  "
                    style={{ color: getIconColor(1) }}
                  />
                  <div>
                    Payment <br className="block sm:hidden" /> Method
                  </div>
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
                  cartList={cartList}
                />
              )}
            </div>
            {/* Summary Section */}

            <div
              style={{
                height: step === 2 ? "15.5rem" : "12rem",
              }}
              className="w-[98%] sm:w-full lg:w-[33%] mx-auto  sm:mx-0 border p-4 rounded-md shadow-md"
            >
              <h2 className="text-xl font-bold mb-2">Summary</h2>
              <hr className="mb-3" />
              <div className="mb-2 flex justify-between">
                <span>Subtotal</span>
                <span className="font-radio-canada">
                  $ {subtotal.toFixed(2)}
                </span>
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
                <button
                  onClick={handleCheckout}
                  className="w-full bg-black hover:bg-slate-800 text-white p-2 rounded-lg mb-3"
                >
                  Proceed to Checkout
                </button>
              )}
            </div>
            <ConfirmationModal
              isVisible={isModalVisible}
              onClose={handleCloseModal}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default ShippingAddress;
