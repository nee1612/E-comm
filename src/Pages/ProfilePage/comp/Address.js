import React, { useContext, useEffect, useState } from "react";
import { address } from "../../../Config/firebase";
import { collection, deleteDoc, doc, getDocs, query } from "firebase/firestore";
import { toast } from "react-toastify";
import UserContext from "../../../Context/UserContext";
import Modal from "./Modal";
import AddressForm from "./AddressForm";
import Lottie from "lottie-react";
import addressLottie from "../../../assets/Lottie/addressLottie.json";
import { useNavigate } from "react-router-dom";
import Loader from "../../../Componetns/Loader";

function Address() {
  const { userDetails } = useContext(UserContext);
  const navigate = useNavigate();
  const [editingAddress, setEditingAddress] = useState(null); // State for the address being edited
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility

  const userAddressRef = collection(address, "address");

  const fetchAddresses = async () => {
    setLoading(true);
    try {
      const addressesSnapshot = await getDocs(query(userAddressRef));
      const userAddressesList = addressesSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const userAddresses = userAddressesList.filter(
        (address) => address.userId === userDetails.uid
      );
      setAddresses(userAddresses);
      //   setAddresses(userAddressesList);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const addressRef = collection(address, "address");

  const handleDeleteAddress = async (id) => {
    try {
      await deleteDoc(doc(addressRef, id));
      fetchAddresses();
      toast.success("Address deleted successfully");
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const handleEditClick = (address) => {
    setEditingAddress(address); // Set the address to be edited
    setIsModalOpen(true); // Open the modal
  };

  const openModal = () => setIsModalOpen(true); // Function to open modal
  const closeModal = () => {
    setIsModalOpen(false); // Function to close modal
    setEditingAddress(null); // Clear editing address when modal is closed
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="w-full h-full md:h-[calc(100vh-7rem)] p-4 sm:p-6 lg:p-8 bg-white rounded-lg shadow-md overflow-y-auto custom-scrollbar">
      {loading ? (
        <Loader />
      ) : (
        <>
          {addresses.length === 0 ? (
            <div>
              <div className="flex  justify-center font-raleway">
                <Lottie animationData={addressLottie} className="w-[40%]" />
              </div>
              <p className="text-center mb-3 font-raleway">
                You don't have any saved addresses yet.
                <br />
                Add a new address to proceed with your orders.
              </p>
              <div className="flex justify-center">
                <button
                  onClick={openModal}
                  className="bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800"
                >
                  Add Address
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="flex justify-between items-center mb-3">
                <span className="text-2xl font-semibold">My Address</span>
                <button
                  onClick={openModal}
                  className="bg-black text-white rounded-md py-2 px-4"
                >
                  Add Address
                </button>
              </div>

              <div className="mt-5 space-y-3">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`p-4 border rounded-lg ${
                      editingAddress?.id === address.id
                        ? "border-black"
                        : "border-gray-200"
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="font-bold text-lg">{address.name}</h3>
                        <p className="text-gray-600">{address.flat}</p>
                        <p className="text-gray-600">{address.area}</p>
                        <p className="text-gray-600">
                          {address.city}, {address.state} {address.pincode}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between">
                      <button
                        onClick={() => handleEditClick(address)}
                        className="border px-5 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteAddress(address.id)}
                        className="border px-5 py-1 rounded bg-red-500 text-white"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">
                {editingAddress ? "Edit Address" : "Add Address"}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-black"
                aria-label="Close Modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <AddressForm
              editingAddress={editingAddress} // Pass the editing address to the form
              fetchAddresses={fetchAddresses} // Pass the fetchAddresses function to refresh the address list after editing
              closeModal={closeModal} // Pass the closeModal function to close the modal after submission
            />
          </Modal>
        </>
      )}
    </div>
  );
}

export default Address;
