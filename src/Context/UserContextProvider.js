import React, { useEffect, useState } from "react";
import { auth } from "../Config/firebase";
import UserContext from "./UserContext";
const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);
  const [discount, setDiscount] = useState(0);
  const [discountCode, setDiscountCode] = useState("");

  const applyDiscount = (code) => {
    if (code === "FLAT50") {
      setDiscount(0.5);
    } else {
      setDiscount(0);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUserDetails(user);
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        userDetails,
        discount,
        discountCode,
        applyDiscount,
        setDiscountCode,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
