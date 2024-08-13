import React, { useEffect, useState } from "react";
import { auth } from "../Config/firebase";
import UserContext from "./UserContext";
const UserContextProvider = ({ children }) => {
  const [userDetails, setUserDetails] = useState([]);

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
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
