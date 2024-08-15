// ScrollContext.js
import React, { createContext, useContext, useRef, useCallback } from "react";

const ScrollContext = createContext();

export const ScrollProvider = ({ children }) => {
  const productGridRef = useRef(null);

  const scrollToProductGrid = useCallback(() => {
    if (productGridRef.current) {
      productGridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, []);

  return (
    <ScrollContext.Provider value={{ scrollToProductGrid, productGridRef }}>
      {children}
    </ScrollContext.Provider>
  );
};

export const useScroll = () => useContext(ScrollContext);
