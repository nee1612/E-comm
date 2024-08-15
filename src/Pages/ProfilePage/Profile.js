import React, { useEffect, useContext, useState } from "react";
import PersonalInformation from "./comp/PersonalInformation";
import MyOrders from "./comp/MyOrders";
import UserContext from "../../Context/UserContext";
import Nav from "../../Componetns/Navbar";
import Loader from "../../Componetns/Loader";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Cookies from "universal-cookie";
const cookies = new Cookies();

const Profile = () => {
  const [activeTab, setActiveTab] = useState("personalInformation");
  const { userDetails, loading } = useContext(UserContext);
  const navigate = useNavigate();
  useEffect(() => {
    const token = cookies.get("auth-token");
    if (token === undefined) {
      navigate("/");
      toast.error("Please login first", {
        position: "top-center",
        className: "custom-toast-error",
        bodyClassName: "customToast",
      });
    }
  }, [navigate]);
  return (
    <>
      <Nav />
      {loading ? (
        <Loader />
      ) : (
        <div className="flex flex-col md:flex-row p-8 gap-6 font-raleway">
          <div className="w-full md:w-1/4 mb-8 md:mb-0 mt-2">
            <div className="bg-white border shadow-md p-4 rounded-md ">
              <div className="text-center mb-6">
                {userDetails.photoURL === null ? (
                  // display first letter of user name
                  <div className="rounded-full h-20 w-20 mx-auto bg-orange-600 flex items-center justify-center">
                    <p className="text-4xl text-white ">
                      {userDetails.displayName.charAt(0)}
                    </p>
                  </div>
                ) : (
                  <img
                    src={userDetails.photoURL}
                    alt=""
                    className="rounded-full h-20 w-20 mx-auto"
                  />
                )}
                <h2 className="text-xl font-bold mt-2">
                  {userDetails.displayName}
                </h2>
                <p className="text-gray-600">Hello 👋</p>
              </div>
              <nav>
                <ul>
                  <li
                    className={`py-2 cursor-pointer ${
                      activeTab === "personalInformation"
                        ? "text-black font-bold"
                        : "text-gray-600 hover:text-black"
                    }`}
                    onClick={() => setActiveTab("personalInformation")}
                  >
                    👤 Personal Information
                  </li>
                  <li
                    className={`py-2 cursor-pointer ${
                      activeTab === "myOrders"
                        ? "text-black font-bold"
                        : "text-gray-600 hover:text-black"
                    }`}
                    onClick={() => setActiveTab("myOrders")}
                  >
                    📦 My Orders
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Content */}
          <div className="w-full md:w-3/4">
            {activeTab === "personalInformation" ? (
              <PersonalInformation />
            ) : (
              <MyOrders />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Profile;
