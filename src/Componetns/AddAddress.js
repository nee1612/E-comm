import React from "react";

function AddAddress() {
  return (
    <div className="max-w-[40rem]  bg-white p-8 ">
      <h2 className="text-2xl font-bold mb-6">Add a new address</h2>
      <form>
        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="name"
          >
            Name
          </label>
          <input
            id="name"
            type="text"
            placeholder="Enter Name"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="mobile"
          >
            Mobile Number
          </label>
          <input
            id="mobile"
            type="text"
            placeholder="Enter Mobile Number"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="flat"
          >
            Flat, House no., Building, Company, Apartment
          </label>
          <input
            id="flat"
            type="text"
            placeholder="Flat, House no., Building, Company, Apartment"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="area"
          >
            Area, Colony, Street, Sector, Village
          </label>
          <input
            id="area"
            type="text"
            placeholder="Area, Colony, Street, Sector, Village"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="city"
          >
            City
          </label>
          <select
            id="city"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Select City</option>
            {/* Add more cities as needed */}
          </select>
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="pincode"
          >
            Pin Code
          </label>
          <input
            id="pincode"
            type="text"
            placeholder="Enter Pin Code"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>

        <div className="mb-4">
          <label
            className="block text-sm font-medium text-gray-700"
            htmlFor="state"
          >
            State
          </label>
          <select
            id="state"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option>Select State</option>
            {/* Add more states as needed */}
          </select>
        </div>

        <div className="mb-6">
          <label className="inline-flex items-center">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5 text-indigo-600"
            />
            <span className="ml-2 text-gray-700">
              Use as my default address
            </span>
          </label>
        </div>

        <div>
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-md text-sm font-medium hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add New Address
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddAddress;
