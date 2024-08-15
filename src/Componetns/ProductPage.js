import React, { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import InstagramStories from "./InstagramStories";
import Footer from "./Footer";
import Nav from "./Navbar";
import { IoMdHeartEmpty, IoMdAdd, IoIosRemove } from "react-icons/io";
import { toast } from "react-toastify";
import { collection, addDoc } from "firebase/firestore";
import { userCartItems } from "../Config/firebase";
import UserContext from "../Context/UserContext";
import Lottie from "lottie-react";
import cartLoader from "../assets/Lottie/cartLoader.json";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const ProductPage = () => {
  const { userDetails, setCartList } = useContext(UserContext);

  const navigate = useNavigate();
  const location = useLocation();
  const prodDetail = location.state;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState("Descriptions");
  const [cart, setCart] = useState([]);
  const cartRef = collection(userCartItems, "cartItems");
  const [loading, setLoading] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);

  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  const addToCart = async () => {
    const token = cookies.get("auth-token");
    if (!token) {
      toast.error("Please login first", {
        position: "top-center",
        className: "custom-toast-error",
        bodyClassName: "customToast",
      });

      return;
    }
    if (!selectedSize) {
      toast.error("Please select a size", {
        position: "top-center",
        className: "custom-toast-error",
        bodyClassName: "customToast",
      });
      return;
    }

    const cartItem = {
      title: prodDetail.title,
      quantity,
      size: selectedSize,
      price: prodDetail.price,
      image: prodDetail.image,
      userId: userDetails.uid,
    };

    setCart((prev) => [...prev, cartItem]);
    try {
      setLoading(true);
      await addDoc(cartRef, cartItem);
    } catch (err) {
      console.error(err);
      toast.error("Error adding item to cart", {
        position: "top-center",
        className: "custom-toast-error",
        bodyClassName: "customToast",
      });
    }
    setLoading(false);
    toast.success("Item Added to cart", {
      position: "top-center",
      className: "custom-toast-success",
      bodyClassName: "customToast",
    });
    setCartList((prev) => [...prev, cartItem]);
    setAddedToCart(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    console.log("Cart updated:", cart);
  }, [cart]);

  const renderContent = () => {
    switch (activeTab) {
      case "Descriptions":
        return (
          <div className="mt-4 text-gray-600">
            <p>{prodDetail.description}</p>
          </div>
        );
      case "Extra Info":
        return (
          <div className="mt-4 text-gray-600">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam eos
              est blanditiis, sit magni non dolorum impedit modi aperiam
              eligendi sunt ipsum suscipit aut ab, fuga quas voluptatibus.
            </p>
          </div>
        );
      case "Reviews":
        return (
          <div className="mt-4 text-gray-600">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias,
              eius. Quae reiciendis molestiae ab asperiores ducimus.
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const navTOCart = () => navigate("/cart", { state: cart });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <>
      <Nav />
      <div className="p-4 md:p-8 font-raleway">
        <div className="flex items-center mb-5 sm:mb-8 mt-4 sm:mt-0 sm:mx-4 md:mx-10">
          <p
            className="text-sm font-semibold cursor-pointer md:mr-2"
            onClick={() => navigate("/")}
          >
            Home
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <p
            className="text-sm font-semibold cursor-pointer md:mx-2"
            onClick={() => navigate("/")}
          >
            Shop
          </p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <p className="text-sm font-semibold">{prodDetail.title}</p>
        </div>
        <div className="flex flex-col md:flex-row sm:gap-10 sm:mx-10 sm:mr-3">
          <div className="flex-1">
            <img
              src={prodDetail.image}
              alt="Product"
              className="w-full md:w-3/4 lg:w-[67%] object-cover rounded-lg hover:scale-105 transition-transform duration-300"
            />
            <div className="flex gap-4 mt-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <img
                  key={index}
                  src={prodDetail.image}
                  alt={`Product Thumbnail ${index + 1}`}
                  className="w-full h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
                  style={{ width: "calc(100% / 4 - 8px)", marginRight: "1px" }}
                />
              ))}
            </div>
          </div>
          <div className="flex-1 mt-4 md:mt-0 m-3">
            <h1 className="text-2xl md:text-3xl font-bold">
              {prodDetail.title}
            </h1>
            <p className="text-lg text-gray-700 mt-2">
              Girls Pink Moana Printed Dress
            </p>
            <div className="flex items-center mt-2">
              <span className="text-yellow-500 text-lg">★★★★★</span>
              <span className="text-gray-600 ml-2">(121 Reviews)</span>
            </div>
            <div className="flex items-center mt-4">
              <span className="text-xl font-bold">${prodDetail.price}</span>
              <span className="text-gray-500 line-through ml-4">$100.00</span>
            </div>
            <p className="mt-4 text-gray-600">
              {prodDetail.description &&
                prodDetail.description.substring(0, 200)}{" "}
              ...
            </p>
            {!addedToCart ? (
              <>
                <div className="mt-4">
                  <span className="font-semibold">Color:</span>
                  <div className="flex mt-2 flex-wrap">
                    {[
                      "bg-red-500",
                      "bg-blue-500",
                      "bg-green-500",
                      "bg-yellow-500",
                      "bg-black",
                      "bg-gray-400",
                      "bg-lime-400",
                    ].map((color, index) => (
                      <div
                        key={index}
                        className={`w-8 h-8 rounded-full ${color} mx-1 mb-1`}
                      ></div>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <span className="font-semibold">Size:</span>
                  <div className="flex mt-2 flex-wrap">
                    {["S", "M", "L", "XL", "XXL"].map((size, index) => (
                      <button
                        key={index}
                        className={`w-10 h-10 border rounded-lg flex items-center justify-center mx-1 mb-1 hover:bg-gray-200 ${
                          selectedSize === size ? "bg-gray-200" : ""
                        }`}
                        onClick={() => setSelectedSize(size)}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-start mmd:items-center flex-col mmd:flex-row mt-4">
                  <div className="flex ml-[0.3rem] mmb:ml-0 items-center border rounded-lg overflow-hidden">
                    <button
                      className="px-4 py-[13px] border-r text-3xl hover:bg-gray-200 transition-colors duration-300"
                      onClick={decreaseQuantity}
                    >
                      <IoIosRemove size={14} />
                    </button>
                    <span className="px-4 py-2">{quantity}</span>
                    <button
                      className="px-4 py-[13px] text-3xl border-l hover:bg-gray-200 transition-colors duration-300"
                      onClick={increaseQuantity}
                    >
                      <IoMdAdd size={14} />
                    </button>
                  </div>
                  <div className="flex items-start mmd:items-center mt-4 mmd:mt-0">
                    <button
                      className="ml-[0.3rem] mmd:ml-4 px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
                      onClick={addToCart}
                    >
                      {loading ? (
                        <Lottie className="w-6" animationData={cartLoader} />
                      ) : (
                        "Add to Cart"
                      )}
                    </button>
                    <button className="ml-4 px-4 py-2 border rounded-lg hover:bg-gray-200 transition-colors duration-300">
                      <IoMdHeartEmpty size={24} />
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center mt-5">
                <button
                  onClick={navTOCart}
                  className="px-6 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
                >
                  View Cart
                </button>
                <button className="ml-4 px-4 py-2 border rounded-lg hover:bg-gray-200 transition-colors duration-300">
                  <IoMdHeartEmpty size={24} />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="mt-8 mx-4 md:mx-10">
          <div className="flex border-b">
            {["Descriptions", "Extra Info", "Reviews"].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-4 text-base sm:text-lg font-semibold ${
                  activeTab === tab ? "border-b-2 border-black" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="transition-all duration-500 ease-in-out">
            {renderContent()}
          </div>
        </div>
        <h2 className="mx-4 md:mx-10 text-2xl md:text-3xl font-semibold my-5 mt-10">
          Related Products
        </h2>
        <InstagramStories pageType="product" />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
