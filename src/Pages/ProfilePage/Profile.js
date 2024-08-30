import React, { useEffect, useContext, useState } from "react";
import PersonalInformation from "./comp/PersonalInformation";
import MyOrders from "./comp/MyOrders";
import UserContext from "../../Context/UserContext";
import Nav from "../../Componetns/Navbar";
import Loader from "../../Componetns/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa";
import { IoHome } from "react-icons/io5";
import { MdOutlinePayment } from "react-icons/md";
import { PiPackageFill } from "react-icons/pi";
import Cookies from "universal-cookie";
import Address from "./comp/Address";
import PaymentHistory from "./comp/PaymentHistory";
const cookies = new Cookies();

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personalInformation");
  const { userDetails, loading } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = cookies.get("auth-token");
    if (token === undefined) {
      navigate("/");
      toast.error("Please login first");
    }
  }, [navigate]);
  return (
    <>
      <Nav />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row px-8 py-5 gap-6 font-raleway">
          <div className="w-full md:w-1/4 mb-8 md:mb-0  ">
            <div className="bg-white  h-full md:h-[calc(100vh-7rem)]   border shadow-md p-4 rounded-md ">
              <div className="text-center mb-6 mt-6">
                {userDetails.photoURL === null ? (
                  <div className="rounded-full h-20 w-20 mx-auto bg-orange-600 flex items-center justify-center ">
                    <p className="text-4xl text-white ">
                      {userDetails.displayName.charAt(0)}
                    </p>
                  </div>
                ) : (
                  <img
                    src={userDetails.photoURL}
                    alt="hh"
                    className="rounded-full h-20 w-20 mx-auto"
                  />
                )}
                <h2 className="text-xl font-bold mt-2">
                  {userDetails.displayName}
                </h2>
                <p className="text-gray-600">Hello 👋</p>
              </div>
              <nav>
                <ul className="space-y-2">
                  <li
                    className={`py-3 cursor-pointer flex align-middle items-center gap-5 px-3 ${
                      activeTab === "personalInformation"
                        ? "bg-gray-100 text-black rounded-md font-semibold"
                        : "text-gray-600 hover:text-black hover:bg-gray-100 rounded-md"
                    }`}
                    onClick={() => setActiveTab("personalInformation")}
                  >
                    <FaUser size={20} />
                    Personal Information
                  </li>
                  <li
                    className={`py-3 cursor-pointer flex align-middle items-center  gap-5 px-3 ${
                      activeTab === "address"
                        ? "bg-gray-100 text-black rounded-md font-semibold"
                        : "text-gray-600 hover:text-black hover:bg-gray-100 rounded-md"
                    }`}
                    onClick={() => setActiveTab("address")}
                  >
                    <IoHome size={23} color="black" />
                    Address
                  </li>
                  <li
                    className={`py-3 cursor-pointer flex align-middle items-center gap-5 px-3 ${
                      activeTab === "myOrders"
                        ? "bg-gray-100 text-black rounded-md font-semibold"
                        : "text-gray-600 hover:text-black hover:bg-gray-100 rounded-md"
                    }`}
                    onClick={() => setActiveTab("myOrders")}
                  >
                    <PiPackageFill size={24} color="black" />
                    My Orders
                  </li>
                  <li
                    className={`py-3 cursor-pointer flex align-middle items-center gap-5 px-3 ${
                      activeTab === "payment"
                        ? "bg-gray-100 text-black rounded-md font-semibold"
                        : "text-gray-600 hover:text-black hover:bg-gray-100 rounded-md"
                    }`}
                    onClick={() => setActiveTab("payment")}
                  >
                    <MdOutlinePayment size={24} color="black" />
                    Paymeny History
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-3/4">
            {activeTab === "personalInformation" && <PersonalInformation />}
            {activeTab === "address" && <Address />}
            {activeTab === "myOrders" && <MyOrders />}
            {activeTab === "payment" && <PaymentHistory />}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
