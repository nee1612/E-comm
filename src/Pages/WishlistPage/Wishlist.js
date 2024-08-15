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

function Wishlist() {
  const { userDetails } = useContext(UserContext);
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
  return (
    <>
      <Nav />
      {loading ? (
        <Loader />
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
  );
}

export default Wishlist;
