import React, { useContext, useEffect, useState } from "react";
import img from "../assets/Rectangle 3463273.png";
import { useLocation, useNavigate } from "react-router-dom";
import InstagramStories from "./InstagramStories";
import Footer from "./Footer";
import Nav from "./Navbar";
import { IoMdHeartEmpty } from "react-icons/io";
import { IoMdAdd } from "react-icons/io";
import { IoIosRemove } from "react-icons/io";
import { toast } from "react-toastify";
import { collection } from "firebase/firestore";
import { addDoc } from "firebase/firestore";
import { cartItems } from "../Config/firebase";
import UserContext from "../Context/UserContext";

const ProductPage = () => {
  const { userDetails } = useContext(UserContext);
  console.log(userDetails.uid);
  const navigate = useNavigate();
  const location = useLocation();
  const prodDetail = location.state;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const [activeTab, setActiveTab] = useState("Descriptions");
  const [cart, setCart] = useState([]);
  const cartRef = collection(cartItems, "cartItems");

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
  };
  const [addedToCart, setAddedToCart] = useState(false);
  const addToCart = async () => {
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
      quantity: quantity,
      size: selectedSize,
      price: prodDetail.price,
      image: prodDetail.image,
      userId: userDetails.uid,
    };

    setCart((prevCart) => [...prevCart, cartItem]);
    try {
      await addDoc(cartRef, {
        title: prodDetail.title,
        quantity: quantity,
        size: selectedSize,
        price: prodDetail.price,
        image: prodDetail.image,
        userId: userDetails.uid,
      });
    } catch (err) {
      console.error(err);
      toast.error("Error adding item to cart", {
        position: "top-center",
        className: "custom-toast-error",
        bodyClassName: "customToast",
      });
    }

    toast.success("Item Added to cart", {
      position: "top-center",
      className: "custom-toast-success",
      bodyClassName: "customToast",
    });
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });

    setAddedToCart(true);
    console.log("Cart:", cart);
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
            <p className="mt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Repellat
              est, adipisci rerum tempore natus repellendus exercitationem ipsa
              nulla iusto illum autem qui, vero, accusamus expedita neque
              perferendis ut quia illo facere nobis earum. Nobis possimus
              dolores, veniam tempore explicabo adipisci quis quos id
              necessitatibus, temporibus obcaecati illum ratione ducimus
              repellendus esse ex? Maxime reprehenderit consectetur totam soluta
              vitae sequi debitis quam ab odio dolore eius praesentium, illo
              veniam similique! Voluptatibus vero rerum autem laudantium quasi.
              Atque deserunt exercitationem libero eius consequatur similique
              autem quos laborum et incidunt, quo consectetur cupiditate,
              ducimus illo necessitatibus nobis aliquam nemo doloremque tenetur
              ut earum.
            </p>
          </div>
        );
      case "Additional Information":
        return (
          <div className="mt-4 text-gray-600">
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nam eos
              est blanditiis, sit magni non dolorum impedit modi aperiam
              eligendi sunt ipsum suscipit aut ab, fuga quas voluptatibus. Saepe
              excepturi, aperiam ab sint eveniet nam, animi architecto aliquid
              veniam delectus vel omnis modi eum quasi dolorem tempore unde
              quaerat esse! Ullam odio dignissimos tenetur aut neque possimus
              modi iure velit.
            </p>
          </div>
        );
      case "Reviews":
        return (
          <div className="mt-4 text-gray-600">
            <p>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias,
              eius. Quae reiciendis molestiae ab asperiores ducimus. Aperiam
              consectetur placeat error harum minima. Debitis dignissimos eum
              aspernatur reprehenderit quis rem asperiores soluta odio, in, non
              suscipit praesentium facilis tenetur ab molestiae illo unde
              repellat animi eos! Quis, nisi natus amet voluptatem perspiciatis
              facere consequatur vitae enim eveniet culpa, dignissimos provident
              ab?
            </p>
          </div>
        );
      default:
        return null;
    }
  };

  const navTOCart = () => {
    navigate("/cart", { state: cart });
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Nav />
      <div className="p-8 font-raleway">
        <div className="flex items-center align-middle mb-8 mt-2 mx-10">
          <p
            className="font-semibold text-sm cursor-pointer"
            onClick={() => {
              navigate("/");
            }}
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <p
            className="font-semibold text-sm  cursor-pointer "
            onClick={() => {
              navigate("/");
            }}
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
            stroke-width="1.5"
            stroke-linecap="round"
            stroke-linejoin="round"
            class="lucide lucide-chevron-right"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
          <p className="font-semibold text-sm cursor-pointer">
            {prodDetail.title}
          </p>
        </div>
        <div className=" mx-auto">
          <div className="flex flex-col md:flex-row">
            <div className="flex-1 ml-10">
              <img
                src={prodDetail.image}
                alt="YK Disney Girls Pink Moana Printed Dress"
                className="w-[70%] max-w-[25rem] rounded-lg hover:scale-105 transition-transform duration-300"
              />
              <div className="flex gap-7 mt-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <img
                    key={index}
                    src={prodDetail.image}
                    alt={`Dress Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover rounded-lg hover:scale-105 transition-transform duration-300"
                  />
                ))}
              </div>
            </div>
            <div className="flex-1 mt-8 md:mt-0">
              <h1 className="text-3xl font-bold">{prodDetail.title}</h1>
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
              {addedToCart ? (
                ""
              ) : (
                <>
                  <div className="mt-4">
                    <span className="font-semibold">Color:</span>
                    <div className="flex mt-2">
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
                          className={`w-8 h-8 rounded-full ${color} mx-1`}
                        ></div>
                      ))}
                    </div>
                  </div>
                  <div className="mt-4">
                    <span className="font-semibold">Size:</span>
                    <div className="flex mt-2">
                      {["S", "M", "L", "XL", "XXL"].map((size, index) => (
                        <button
                          key={index}
                          className={`w-10 h-10 border rounded-lg flex items-center justify-center mx-1 hover:bg-gray-200 ${
                            selectedSize === size ? "bg-gray-200" : ""
                          }`}
                          onClick={() => setSelectedSize(size)}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                </>
              )}

              {!addedToCart ? (
                <div className="flex items-center mt-4 ml-1">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      className="px-4 py-[0.8rem] border-r text-3xl hover:bg-gray-200 transition-colors duration-300"
                      onClick={decreaseQuantity}
                    >
                      <IoIosRemove size={14} />
                    </button>
                    <span className="px-4 py-2">{quantity}</span>
                    <button
                      className="px-4 py-[0.8rem] text-3xl border-l hover:bg-gray-200 transition-colors duration-300"
                      onClick={increaseQuantity}
                    >
                      <IoMdAdd size={14} />
                    </button>
                  </div>
                  <button
                    className="ml-4 px-8 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
                    onClick={addToCart}
                  >
                    Add to Cart
                  </button>
                  <button className="ml-4 px-4 py-2 border rounded-lg hover:bg-gray-200 transition-colors duration-300">
                    <IoMdHeartEmpty size={24} />
                  </button>
                </div>
              ) : (
                <div className="flex  align-middle items-center mt-5">
                  <button
                    onClick={navTOCart}
                    className="ml-0  px-8 py-2 bg-black text-white rounded-lg hover:bg-gray-800 transition-colors duration-300"
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
          <div className="mt-8 mx-10">
            <div className="flex border-b">
              {["Descriptions", "Additional Information", "Reviews"].map(
                (tab) => (
                  <button
                    key={tab}
                    className={`py-2 px-4 text-lg font-semibold ${
                      activeTab === tab ? "border-b-2 border-black" : ""
                    }`}
                    onClick={() => setActiveTab(tab)}
                  >
                    {tab}
                  </button>
                )
              )}
            </div>
            <div className="transition-all duration-500 ease-in-out">
              {renderContent()}
            </div>
          </div>
        </div>
        <h2 className="mx-10 ml-12 text-3xl font-semibold my-5 mt-10">
          Related Products
        </h2>
        <InstagramStories pageType="product" />
      </div>
      <Footer />
    </>
  );
};

export default ProductPage;
