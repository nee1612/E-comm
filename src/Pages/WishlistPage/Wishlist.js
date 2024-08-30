import React, { useContext, useEffect } from "react";
import { useState } from "react";
import { wishlistDb } from "../../Config/firebase";
import { collection, getDocs, query, deleteDoc, doc } from "firebase/firestore";
import UserContext from "../../Context/UserContext";
import Nav from "../../Componetns/Navbar";
import WishlistItem from "../../Componetns/WishlistItem";
import Loader from "../../Componetns/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Lottie from "lottie-react";
import empty from "../../assets/Lottie/emptyWishlist.json";

function Wishlist() {
  const { userDetails, setWishlistSec } = useContext(UserContext);
  const navigate = useNavigate();
  const wishlistRef = collection(wishlistDb, "wishlistDb");
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const fetchWishlist = async () => {
    setLoading(true);
    try {
      if (userDetails) {
        const wishlistItems = await getDocs(query(wishlistRef));
        const filterItemByUser = wishlistItems.docs.filter(
          (doc) => doc.data().userId === userDetails.uid
        );
        const wishlistItemsSec = filterItemByUser.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        console.log("wishlistItems", wishlistItemsSec);
        setWishlist(wishlistItemsSec);
      } else {
        setWishlist([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const removeItemFromWishlist = async (id) => {
    try {
      await deleteDoc(doc(wishlistRef, id));
      const updatedWishlist = wishlist.filter((item) => item.id !== id);
      setWishlistSec(updatedWishlist);
      fetchWishlist();
      toast.success("Item removed from wishlist", {
        position: "top-center",
        className: "custom-toast-success",
        bodyClassName: "customToast",
      });
    } catch (err) {
      console.error(err);
    }
  };

  //   fetchWishlist();
  useEffect(() => {
    fetchWishlist();
  }, [userDetails]);

  const handleShopClick = () => {
    navigate("/?scrollToProductGrid=true");
  };

  return (
    <>
      <Nav />
      {loading ? (
        <Loader />
      ) : (
        <>
          {wishlist.length === 0 ? (
            <div className=" mt-5 pb-5 p-4 sm:p-6 lg:p-8 md:h-[calc(100vh-7rem)] bg-white rounded-lg shadow-lg mx-6  sm:mx-10 font-raleway">
              <div className="flex  justify-center font-raleway">
                <Lottie animationData={empty} className="w-[30%]" />
              </div>
              <p className="text-center mb-3 font-raleway">
                Your Wishlist is Empty.
                <br />
                Add items that you like to your wishlist.
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
            <div className="container mx-auto px-4 py-8">
              <div className="flex items-center mb-5 sm:mb-8 mt-2 sm:mt-0 mx-3 sm:mx-5 md:mx-7">
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
                  onClick={handleShopClick}
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
                <p className="text-sm font-semibold">Wishlist</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:mx-5">
                {wishlist.map((item) => (
                  <WishlistItem
                    key={item.id}
                    item={item}
                    removeItemFromWishlist={removeItemFromWishlist}
                    fetchWishlist={fetchWishlist}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}

export default Wishlist;
