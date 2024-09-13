import React, { useContext, useState } from "react";
import { FaTimes } from "react-icons/fa";
import { IoIosRemove, IoMdAdd } from "react-icons/io";
import { toast } from "react-toastify";
import { addDoc, collection, deleteDoc, doc } from "firebase/firestore";
import { userCartItems, wishlistDb } from "../Config/firebase";
import UserContext from "../Context/UserContext";

const ConfModal = ({ showModal, setShowModal, item, fetchWishlist }) => {
  const { setCartList, setWishlistSec } = useContext(UserContext);
  const [selectedSize, setSelectedSize] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const dummyOriginalPrice = (item.price * 1.3).toFixed(2);
  const discountedPrice = item.price.toFixed(2);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const cartRef = collection(userCartItems, "cartItems");
  const wishlistRef = collection(wishlistDb, "wishlistDb");
  const increaseQuantity = () => setQuantity((prev) => prev + 1);
  const decreaseQuantity = () =>
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  const addToCart = async (item) => {
    setLoading(true);
    // Check if a size is selected
    if (!selectedSize) {
      toast.error("Please select a size");
      setLoading(false); // Ensure loading state is reset
      return;
    }
    const cartItem = {
      title: item.title,
      quantity: quantity,
      size: selectedSize,
      label: item.label,
      price: item.price,
      image: item.image,
      userId: item.userId,
    };

    try {
      await addDoc(cartRef, cartItem);
      toast.success("Item Added to cart");

      if (item.isFromWishlist) {
        await deleteDoc(doc(wishlistRef, item.id));
        const updatedWishlist = wishlist.filter(
          (wishlistItem) => wishlistItem.id !== item.id
        );
        setWishlistSec(updatedWishlist);
        fetchWishlist();
      }
      setCartList((prev) => [...prev, cartItem]);
    } catch (err) {
      console.error(err);
      toast.error("Error adding item to cart", {
        position: "top-center",
        className: "custom-toast-error",
        bodyClassName: "customToast",
      });
    } finally {
      // Finalize loading state and close modal
      setLoading(false);
      setShowModal(false);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  if (!showModal) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-75">
      <div className="bg-white p-6 rounded-md shadow-lg w-11/12 sm:w-3/4 md:w-1/2 lg:w-1/3 relative">
        <button
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-900"
          onClick={() => setShowModal(false)}
        >
          <FaTimes />
        </button>
        <div className="flex items-start mt-3">
          {/* <img
            src={item.image}
            alt={item.title}
            className="w-20 h-20 object-cover rounded-md mr-4"
          /> */}
          <div>
            <h3 className="font-semibold text-lg">{item.title}</h3>
            <p className="bg-green-100 text-green-700 text-sm inline-block px-2 rounded-md mb-1 mt-1">
              {item.label}
            </p>

            <div className="flex items-center justify-between mb-2 gap-5">
              <p className="flex items-center gap-1">
                <span className="text-base font-semibold text-black font-radio-canada">
                  $ {discountedPrice}
                </span>
                <span className="text-gray-400 text-base line-through font-radio-canada">
                  $ {dummyOriginalPrice}
                </span>
              </p>
              <p className="text-orange-500 text-sm font-radio-canada">
                (50% OFF)
              </p>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <span className="font-semibold pl-1">Size:</span>
          <div className="flex mt-2 flex-wrap">
            {["S", "M", "L", "XL", "XXL"].map((size, index) => (
              <button
                key={index}
                className={`w-9 h-8 border rounded-lg text-sm flex items-center justify-center mx-1 mb-1 hover:bg-gray-200 ${
                  selectedSize === size ? "bg-gray-200" : ""
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-start mmd:items-center flex-col mmd:flex-row mt-2">
          <div className="flex ml-[0.3rem] mmb:ml-0 items-center border rounded-lg overflow-hidden">
            <button
              className="px-3 py-[10px] border-r text-3xl hover:bg-gray-200 transition-colors duration-300"
              onClick={decreaseQuantity}
            >
              <IoIosRemove size={13} />
            </button>
            <span className="px-4 ">{quantity}</span>
            <button
              className="px-3 py-[10px] text-3xl border-l hover:bg-gray-200 transition-colors duration-300"
              onClick={increaseQuantity}
            >
              <IoMdAdd size={13} />
            </button>
          </div>
        </div>

        <button
          className="bg-black text-white py-2 px-4 rounded-md w-full mt-4"
          onClick={() => {
            addToCart(item);
          }}
        >
          {loading ? "Adding to cart..." : "Add"}
        </button>
      </div>
    </div>
  );
};

export default ConfModal;
