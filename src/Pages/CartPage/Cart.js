import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";
import Nav from "../../Componetns/Navbar";
import { userCartItems } from "../../Config/firebase";
import { getDocs, collection, query, deleteDoc, doc } from "firebase/firestore";
import UserContext from "../../Context/UserContext";
import { toast } from "react-toastify";
import Loader from "../../Componetns/Loader";
import Cookies from "universal-cookie";
import Lottie from "lottie-react";
import emptyCart from "../../assets/Lottie/cartEmpty.json";
const cookies = new Cookies();

const Cart = () => {
  const {
    userDetails,
    discountCode,
    setDiscountCode,
    applyDiscount,
    discount,
    setCartList,
    clearCart,
  } = useContext(UserContext);
  const navigate = useNavigate();
  const cartItemsRef = collection(userCartItems, "cartItems");
  const [cartList, setCartListIt] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleRemoveItem = async (id) => {
    try {
      await deleteDoc(doc(cartItemsRef, id));
      const updatedCartList = cartList.filter((item) => item.id !== id);
      setCartList(updatedCartList);
      toast.success("Item removed from cart", {
        position: "top-center",
        className: "custom-toast-success",
        bodyClassName: "customToast",
      });
      fetchCartItems();
    } catch (err) {
      console.error(err);
      toast.error("Error removing item from cart", {
        position: "top-center",
        className: "custom-toast-error",
        bodyClassName: "customToast",
      });
    }
  };

  const handleApplyDiscount = () => {
    applyDiscount(discountCode);
  };

  const subtotal = cartList.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const discountedSubtotal = subtotal * (1 - discount);
  const deliveryCharge = 5;
  const grandTotal = discountedSubtotal + deliveryCharge;

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
      setCartListIt(cartItems);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userDetails.uid]);

  useEffect(() => {
    const token = cookies.get("auth-token");
    if (token === undefined) {
      navigate("/");
      toast.error("Please login first", {
        position: "top-center",
        className: "custom-toast-error",
        bodyClassName: "customToast",
      });
    }
  }, [navigate]);

  const navigateToProductPage = (e, product) => {
    e.preventDefault();
    navigate("/product", {
      state: product,
    });
  };

  return (
    <>
      <Nav />
      {loading ? (
        <Loader />
      ) : (
        <>
          {cartList.length === 0 ? (
            <div className=" mt-5 p-4 sm:p-6 lg:p-8 bg-white md:h-[calc(100vh-7rem)] rounded-lg shadow-lg mx-6  sm:mx-10">
              <div className="flex mt-10 justify-center font-raleway">
                <Lottie animationData={emptyCart} className="w-[25%]" />
              </div>
              <p className="text-center mb-3 mt-4 font-raleway">
                Your cart is Empty !!
                <br />
                Please add items to cart.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={() => navigate("/")}
                  className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 md:p-8 font-raleway mx-2 md:mx-8 lg:mx-12">
                <h1 className="text-2xl md:text-3xl font-bold mb-8">
                  Checkout
                </h1>
                <div className="flex flex-col lg:flex-row gap-10 ">
                  {/* Cart Items */}
                  <div className="w-full lg:w-2/3 mx-2">
                    <div className="flex items-center justify-between mb-4 font-semibold border-b pb-2 pr-[3rem]">
                      <div className="w-1/2">Products</div>
                      <div className="w-[15%] text-center">Price</div>
                      <div className="w-[15%] text-center hidden sm:block">
                        Quantity
                      </div>
                      <div className="w-[15%] text-center block sm:hidden">
                        Qt
                      </div>
                      <div className="w-[15%] text-center">Subtotal</div>
                    </div>
                    {cartList.map((item) => (
                      <div
                        key={item.id}
                        onClick={(e) => {
                          navigateToProductPage(e, item);
                        }}
                        className="flex items-center justify-between mb-4 border-b pb-4"
                      >
                        <div className="flex items-center w-1/2">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="w-20 h-20 object-cover rounded"
                          />
                          <div className="ml-4">
                            <h2 className="font-bold text-base md:text-lg">
                              {item.title}
                            </h2>
                            <p className="text-gray-600">Size: {item.size}</p>
                          </div>
                        </div>
                        <div className="w-1/6 text-center font-bold text-base md:text-lg font-radio-canada">
                          $ {item.price}
                        </div>
                        <div className="flex items-center justify-center w-1/6">
                          <span className="px-2 text-base md:text-lg">
                            {item.quantity}
                          </span>
                        </div>
                        <div className="w-1/6 text-center font-bold text-base md:text-lg font-radio-canada">
                          $ {item.price * item.quantity}
                        </div>
                        <button
                          className="ml-4 text-red-700"
                          onClick={(e) => {
                            e.stopPropagation(); // Prevents the click event from propagating to the parent div
                            handleRemoveItem(item.id);
                          }}
                        >
                          <RiDeleteBin6Line size={23} />
                        </button>
                      </div>
                    ))}
                  </div>
                  {/* Summary Section */}
                  <div
                    className="w-full lg:w-[40%] lg:ml-10 border p-4 rounded-md shadow-md"
                    style={{
                      height: "21rem",
                    }}
                  >
                    <h2 className="text-lg md:text-xl font-bold mb-2">
                      Summary
                    </h2>
                    <hr className="mb-3" />
                    <div className="mb-2 flex justify-between text-sm md:text-base">
                      <span>Subtotal</span>
                      <span className="font-radio-canada">
                        $ {subtotal.toFixed(2)}
                      </span>
                    </div>
                    {discount > 0 && (
                      <div className="mb-2 flex justify-between text-sm md:text-base">
                        <span>Discounted Subtotal</span>
                        <span className="font-radio-canada">
                          $ {discountedSubtotal.toFixed(2)}
                        </span>
                      </div>
                    )}
                    <div className="mb-2">
                      <label
                        htmlFor="discount-code"
                        className="block mb-1 text-sm md:text-base"
                      >
                        Enter Discount Code:
                      </label>
                      <div className="flex">
                        <input
                          type="text"
                          id="discount-code"
                          className="outline-none p-2 flex-1 text-gray-600 rounded-l-lg border border-gray-300 text-sm md:text-base"
                          placeholder="FLAT50"
                          value={discountCode}
                          onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <button
                          className="bg-black hover:bg-gray-800 text-white px-4 md:px-6 py-2 rounded-r-lg text-sm md:text-base"
                          onClick={handleApplyDiscount}
                        >
                          Apply
                        </button>
                      </div>
                    </div>
                    <div className="mb-2 flex justify-between text-sm md:text-base">
                      <span>Delivery Charge</span>
                      <span className="font-radio-canada">
                        $ {deliveryCharge.toFixed(2)}
                      </span>
                    </div>
                    <hr className="my-3" />
                    <div className="mb-4 flex justify-between text-base md:text-lg font-bold">
                      <span>Grand Total</span>
                      <span className="font-radio-canada">
                        $ {grandTotal.toFixed(2)}
                      </span>
                    </div>
                    <button
                      onClick={() => navigate("/shipping")}
                      className="w-full bg-black hover:bg-gray-800 text-white py-2 rounded-lg text-sm md:text-base"
                    >
                      Proceed to Checkout
                    </button>
                  </div>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </>
  );
};

export default Cart;
