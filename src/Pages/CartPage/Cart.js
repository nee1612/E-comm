import React, { useContext, useEffect, useState } from "react";
import { IoIosAdd, IoIosRemove } from "react-icons/io";
import user1 from "../../assets/Rectangle 3463273.png";
import { useLocation, useNavigate } from "react-router-dom";
import { MdDeleteOutline } from "react-icons/md";
import Nav from "../../Componetns/Navbar";
import { userCartItems } from "../../Config/firebase";
import { getDocs, collection, query, deleteDoc, doc } from "firebase/firestore";
import UserContext from "../../Context/UserContext";
import { toast } from "react-toastify";
import Loader from "../../Componetns/Loader";

const Cart = () => {
  const {
    userDetails,
    discountCode,
    setDiscountCode,
    applyDiscount,
    discount,
  } = useContext(UserContext); // Destructure 'discount' from UserContext
  const navigate = useNavigate();
  const cartItemsRef = collection(userCartItems, "cartItems");
  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(false);

  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      image: user1,
      title: "Girls Pink Moana Printed Dress",
      size: "S",
      price: 80,
      quantity: 1,
    },
    {
      id: 2,
      image: user1,
      title: "Women Textured Handheld Bag",
      size: "Regular",
      price: 80,
      quantity: 1,
    },
    {
      id: 3,
      image: user1,
      title: "Tailored Cotton Casual Shirt",
      size: "M",
      price: 40,
      quantity: 1,
    },
  ]);

  const handleRemoveItem = async (id) => {
    try {
      await deleteDoc(doc(cartItemsRef, id.id));
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

  const subtotal = cartItems.reduce(
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
      setCartList(cartItems);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, [userDetails.uid]);

  return (
    <>
      <Nav />
      {loading ? (
        <Loader />
      ) : (
        <div className="p-4 md:p-8 font-raleway mx-5 ">
          <h1 className="text-3xl font-bold mb-12">Checkout</h1>
          <div className="flex flex-col lg:flex-row justify-between gap-5">
            {/* Cart Items */}
            <div className="w-full lg:w-[63%]">
              <div className="flex items-center justify-between mb-4 font-semibold border-b pb-2 pr-10">
                <div className="w-1/2">Products</div>
                <div className="w-1/6 text-center">Price</div>
                <div className="w-1/6 text-center">Quantity</div>
                <div className="w-1/6 text-center">Subtotal</div>
              </div>
              {cartList.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between mb-4 border-b pb-4"
                >
                  <div className="flex items-center w-1/2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-[4rem] h-[4rem] object-cover rounded"
                    />
                    <div className="ml-4">
                      <h2 className="font-bold">{item.title}</h2>
                      <p className="text-gray-600">Size: {item.size}</p>
                    </div>
                  </div>
                  <div className="w-1/6 text-center font-bold font-radio-canada">
                    $ {item.price}
                  </div>
                  <div className="flex items-center justify-center w-1/6">
                    <span className="px-2 font-radio-canada">
                      {item.quantity}
                    </span>
                  </div>
                  <div className="w-1/6 text-center font-bold font-radio-canada">
                    $ {item.price * item.quantity}
                  </div>
                  <button
                    className="mr-5 text-red-500"
                    onClick={() => handleRemoveItem(item)}
                  >
                    <MdDeleteOutline size={23} />
                  </button>
                </div>
              ))}
            </div>
            {/* Summary Section */}
            <div className="w-full lg:w-[33%] border p-4 rounded-md shadow-md">
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
              <div className="mb-2">
                <label htmlFor="discount-code" className="block mb-1">
                  Enter Discount Code:
                </label>
                <div className="flex">
                  <input
                    type="text"
                    id="discount-code"
                    className="outline-0 p-2 flex-1 text-gray-600 rounded-l-lg border-black border-r-0 border-t-[1.5px] border-l-[1.5px] border-b-[1.5px]"
                    placeholder="FLAT50"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                  />
                  <button
                    className="bg-black hover:bg-slate-800 text-white px-6 rounded-r-lg"
                    onClick={handleApplyDiscount}
                  >
                    Apply
                  </button>
                </div>
              </div>
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
              <button
                onClick={() => navigate("/shipping")}
                className="w-full bg-black hover:bg-slate-800 text-white p-2 rounded-lg mb-3"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
