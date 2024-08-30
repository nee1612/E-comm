import React, { useState } from "react";
import AddAddress from "./AddAddress";
import { address } from "../Config/firebase";
import { collection, deleteDoc, doc } from "firebase/firestore";
import { toast } from "react-toastify";

function Address({
  addresses,
  selectedAddress,
  setSelectedAddress,
  handleDeliverHere,
  fetchAddresses,
}) {
  const [editingAddress, setEditingAddress] = useState(null); // State to manage editing address

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
    setEditingAddress(address);
  };

  return (
    <>
      {addresses.length === 0 ? (
        ""
      ) : (
        <>
          <div className="mb-4 mx-6 mt-8">
            <h2 className="text-xl font-bold mb-2">
              Select a delivery address
            </h2>
            <p className="text-gray-600 mb-7">
              Is the address you'd like to use displayed below? If so, click the
              corresponding "Deliver to this address" button. Or you can enter a
              new delivery address.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {addresses.map((address) => (
                <div
                  key={address.id}
                  className={`p-4 border rounded-lg ${
                    selectedAddress === address.id
                      ? "border-black"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h3 className="font-bold">{address.name}</h3>
                      <p className="text-gray-600">{address.flat}</p>
                      <p className="text-gray-600">{address.area}</p>
                      <p className="text-gray-600">
                        {address.city}, {address.state} {address.pincode}
                      </p>
                    </div>
                    <input
                      type="radio"
                      name="address"
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                      className="ml-2"
                    />
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
          </div>
          {selectedAddress && (
            <button
              onClick={handleDeliverHere}
              className="ml-6 mt-4 w-[46%] rounded-md bg-black text-white p-2"
            >
              Deliver Here
            </button>
          )}
          <hr className="mt-11 mx-5" />
        </>
      )}

      <AddAddress
        fetchAddresses={fetchAddresses}
        editingAddress={editingAddress}
        setEditingAddress={setEditingAddress}
      />
    </>
  );
}

export default Address;
