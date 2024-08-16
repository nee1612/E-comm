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
import Profile from "./Pages/ProfilePage/Profile";
import Wishlist from "./Pages/WishlistPage/Wishlist";
import { ScrollProvider } from "./Context/ScrollContext";
import ForgetPage from "./Pages/ForgetPassword/ForgetPage";
import AboutUs from "./Pages/AboutUs/AboutUsPage";

function App() {
  return (
    <UserContextProvider>
      <ScrollProvider>
        <Router>
          <div>
            <ToastContainer />
            <Routes>
              <Route path="/" element={<Home />} />

              <Route path="/product" element={<ProductPage />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/shipping" element={<Shipping />} />
              <Route path="/login" element={<Login />} />
              <Route path="/forget" element={<ForgetPage />} />
              <Route path="/about" element={<AboutUs />} />
              <Route path="/signUp" element={<SignUp />} />
            </Routes>
          </div>
        </Router>
      </ScrollProvider>
    </UserContextProvider>
  );
}

export default App;
