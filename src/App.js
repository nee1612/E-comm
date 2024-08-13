import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/HomePage/Home";
import Login from "./Pages/LoginPage/Login";
import SignUp from "./Pages/SignUpPage/SignUp";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProductPage from "./Componetns/ProductPage";
import Cart from "./Pages/CartPage/Cart";
import UserContextProvider from "./Context/UserContextProvider";
import Shipping from "./Pages/ShipingPage/Shipping";

function App() {
  return (
    <UserContextProvider>
      <Router>
        <div>
          <ToastContainer />
          <Routes>
            <Route path="/" element={<Home />} />

            <Route path="/product" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/shipping" element={<Shipping />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUp />} />
          </Routes>
        </div>
      </Router>
    </UserContextProvider>
  );
}

export default App;
