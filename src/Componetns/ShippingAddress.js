import React, { useContext, useEffect, useState } from "react";
import Nav from "./Navbar";
import logo from "../assets/favIcon.png";
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
  getDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
} from "firebase/firestore";
import {
  address,
  confirmOrder,
  userCartItems,
  tempOrder,
} from "../Config/firebase";
import { toast } from "react-toastify";
import Loader from "./Loader";
import axios from "axios";
import GenerateTemplateParams from "./EmailComp/GenerateTemplateParams";
import SendOrderConfirmationEmail from "./EmailComp/SendOrderConfirmationEmail";

const ShippingAddress = () => {
  const { discount, userDetails } = useContext(UserContext);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const orderRef = collection(confirmOrder, "confirmOrder");
  const [orderId, setOrderId] = useState(null);
  const [orderConfirmLoading, setOrderConfirmLoading] = useState(false);
  const tempOrderRef = collection(tempOrder, "tempOrder");

  const [loading, setLoading] = useState(false);
  const handleCloseModal = () => {
    setIsModalVisible(false);
  };
  // payment function for razorpay
  const handlePayment = async (tempOrderId) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/create-order`,
        {
          amount: grandTotal * 100,
          tempOrderId: tempOrderId,
        }
      );

      return new Promise((resolve, reject) => {
        const options = {
          key: "rzp_test_xxCTNCzXz9FyIk",
          amount: data.amount,
          currency: "INR",
          name: "Krist",
          description: "Order Payment",
          image: { logo },
          order_id: data.orderId,
          handler: async function (response) {
            try {
              // Update the payment status in Firestore
              await updateDoc(doc(tempOrderRef, tempOrderId), {
                paymentStatus: true,
                paymentId: response.razorpay_payment_id,
              });

              // Retrieve the temp order data from Firestore
              const tempOrderDoc = await getDoc(doc(tempOrderRef, tempOrderId));
              if (tempOrderDoc.exists()) {
                const orderData = tempOrderDoc.data();

                // Add the order to the confirmOrder collection
                const orderDocRef = await addDoc(orderRef, orderData);

                // Delete the tempOrder document
                await deleteDoc(doc(tempOrderRef, tempOrderId));

                // Now send the actual order ID to your server for verification
                const { data: verificationResponse } = await axios.post(
                  `${process.env.REACT_APP_BACKEND_URL}/verify-payment`,
                  {
                    paymentId: response.razorpay_payment_id,
                    orderId: response.razorpay_order_id,
                    signature: response.razorpay_signature,
                    amount: grandTotal * 100,
                    tempOrderId: tempOrderId,
                    userId: userDetails.uid,
                    confirmedOrderId: orderDocRef.id, // Send the actual order ID
                  }
                );

                setOrderId(response.razorpay_order_id);
                toast.success(
                  "Payment Successful: " + verificationResponse.message
                );
                resolve(true);
              } else {
                console.error("Temp order document does not exist.");
                toast.error("Failed to confirm order.");
                resolve(false);
              }
            } catch (verificationError) {
              console.error("Payment verification failed:", verificationError);
              toast.error("Payment verification failed.");
              resolve(false);
            }
          },
          prefill: {
            name: "John Doe",
            email: "john.doe@example.com",
            contact: "9999999999",
          },
          notes: {
            address: "Krist, Bangalore",
          },
          theme: {
            color: "#F37254",
          },
          modal: {
            ondismiss: () => {
              toast.error("Payment process was canceled.");
              resolve(false);
            },
          },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      });
    } catch (error) {
      console.error("Error initiating payment:", error);
      toast.error("Payment initiation failed.");
      return false;
    }
  };

  const handleConfirmOrder = async () => {
    setOrderConfirmLoading(true);
    try {
      let paymentSuccess = true;

      // First, add the order to tempOrder with paymentStatus set to false

      const tempOrder = await addDoc(tempOrderRef, {
        userId: userDetails.uid,
        address: selectedAddress,
        paymentMethod: selectedPaymentMethod,
        createdAt: new Date(),
        products: cartList,
        paymentId: orderId,
        totalPrice: grandTotal,
        paymentStatus: false,
      });

      if (selectedPaymentMethod === "razorpay") {
        paymentSuccess = await handlePayment(tempOrder.id);
      }

      if (paymentSuccess) {
        const templateParams = GenerateTemplateParams({
          userDetails,
          orderId: tempOrder.id,
          cartList,
          selectedAddress,
          selectedPaymentMethod,
        });

        await SendOrderConfirmationEmail(templateParams);

        setOrderConfirmLoading(false);
        setIsModalVisible(true);
        return true;
      } else {
        setOrderConfirmLoading(false);
        toast.error("Order could not be completed due to payment failure.");
        return false;
      }
    } catch (err) {
      console.error("Order confirmation failed:", err);
      setOrderConfirmLoading(false);
      toast.error("Order confirmation failed.");
      return false;
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

  const subtotal = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const [addressesN, setAddresses] = useState([]);
  const userAddressRef = collection(address, "address");
  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const addressesSnapshot = await getDocs(query(userAddressRef));
      const userAddressesList = addressesSnapshot.docs
        .filter((doc) => doc.data().userId === userDetails.uid)
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
      setAddresses(userAddressesList);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userDetails.uid) {
      fetchAddresses();
    }
  }, [userDetails.uid]);

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

  const handleCheckout = async () => {
    const orderPlaced = await handleConfirmOrder();
    console.log(orderPlaced);
    if (orderPlaced) {
      handleRemoveItemsFromCart();
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
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
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold ml-5 mb-7 sm:mb-6">
            {step === 0 && "Shipping Address"}
            {step === 1 && "Payment Method"}
            {step === 2 && "Review"}
          </h1>
          <div className="ml-5 mb-6">
            {step > 0 && step < 3 && (
              <div className="flex gap-1 align-middle items-center text-xl font-[500] ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="28"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-chevron-left"
                  cursor={"pointer"}
                  onClick={handleBack}
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
                Go Back
              </div>
            )}
          </div>
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
                <div className="flex-1 border-dashed border-t-[1.5px] border-gray-400 mx-4"></div>
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
                  addresses={addressesN}
                  selectedAddress={selectedAddress}
                  setSelectedAddress={setSelectedAddress}
                  handleDeliverHere={handleDeliverHere}
                  fetchAddresses={fetchAddresses}
                />
              )}
              {step === 1 && (
                <PaymentForm
                  setOrderId={setOrderId}
                  grandTotal={grandTotal}
                  handleSubmitPayment={handleSubmitPayment}
                />
              )}
              {step === 2 && (
                <Review
                  addresses={addressesN}
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
                <>
                  {orderConfirmLoading ? (
                    <button className="w-full bg-black hover:bg-slate-800 text-white p-2 rounded-lg mb-3">
                      Processing Order ...
                    </button>
                  ) : (
                    <button
                      onClick={handleCheckout}
                      className="w-full bg-black hover:bg-slate-800 text-white p-2 rounded-lg mb-3"
                    >
                      Proceed to Checkout
                    </button>
                  )}
                </>
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
