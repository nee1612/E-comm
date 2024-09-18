import React, { useEffect, useState } from "react";
import { auth, userCartItems, wishlistDb } from "../Config/firebase";
import UserContext from "./UserContext";
import { collection, getDocs, query } from "firebase/firestore";

const UserContextProvider = ({ children }) => {
  const wishlistRef = collection(wishlistDb, "wishlistDb");
  const [userDetails, setUserDetails] = useState(null); // Changed initial state to null
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState([]);
  const [wishlist, setWishlistSec] = useState([]);

  const applyDiscount = (code) => {
    setDiscount(code === "FLAT50" ? 0.5 : 0);
  };

  const cartItemsRef = collection(userCartItems, "cartItems");

  const fetchCartItems = async () => {
    setLoading(true);
    try {
      if (userDetails) {
        const cartIt = await getDocs(query(cartItemsRef));
        const filterItemByUser = cartIt.docs.filter(
          (doc) => doc.data().userId === userDetails.uid
        );
        const cartItems = filterItemByUser.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCartList(cartItems);
      } else {
        setCartList([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWishlistItems = async () => {
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
        setWishlistSec(wishlistItemsSec);
      } else {
        setWishlistSec([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUserDetails(user);
        fetchCartItems();
        fetchWishlistItems();
      } else {
        setUserDetails(null); // Set userDetails to null if no user
        setCartList([]);
        setWishlistSec([]);
      }
    });

    return () => unsubscribe(); // Clean up subscription on unmount
  }, []);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        discount,
        discountCode,
        applyDiscount,
        setDiscountCode,
        loading,
        cartList,
        setCartList,
        clearCart: () => setCartList([]),
        wishlist,
        clearWishlist: () => setWishlistSec([]),
        setWishlistSec,
        fetchWishlistItems,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
