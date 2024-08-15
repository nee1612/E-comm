import React, { useEffect, useState } from "react";
import { auth, userCartItems } from "../Config/firebase";
import UserContext from "./UserContext";
import { collection, getDocs, query } from "firebase/firestore";

const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [cartList, setCartList] = useState([]);

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
        console.log("cartItems", cartItems.length);
      } else {
        setCartList([]);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    auth.onAuthStateChanged((user) => {
      if (user) {
        fetchCartItems();
        setUserDetails(user);
      }
      setLoading(false);
    });
  }, [userCartItems, userDetails.uid]);

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
        setCartList, // Optionally expose to update cartList directly
        clearCart: () => setCartList([]), // Method to clear cartList
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
