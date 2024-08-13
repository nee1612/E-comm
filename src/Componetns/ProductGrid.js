import React, { useState } from "react";
import { products } from "../ProductJSON/products"; // Update the import path as necessary

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const ProductGrid = () => {
  const { casualWear, westernWear, kidsWear, ethnicWear } =
    products[0].categories;

  const allProducts = [
    ...casualWear,
    ...westernWear,
    ...kidsWear,
    ...ethnicWear,
  ];

  const shuffledProducts = shuffleArray(allProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;

  // Calculate the index of the first and last product on the current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;

  // Get the current products to display
  const currentProducts = shuffledProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Calculate the total number of pages
  const totalPages = Math.ceil(shuffledProducts.length / productsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <>
      <p className="flex justify-center text-3xl font-bold font-raleway">
        Our Bestseller
      </p>
      <div className="p-8 font-raleway">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {currentProducts.map((product, index) => {
            const dummyOriginalPrice = (product.price * 1.3).toFixed(2);
            const discountedPrice = product.price.toFixed(2);

            return (
              <div
                key={index}
                className="relative p-4 rounded-md bg-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative group">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[16rem] object-cover mb-4 rounded-md"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    className="lucide lucide-heart absolute top-2 right-2 text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-500">
                  {product.description && product.description.substring(0, 50)}
                  ...
                </p>
                <div className="flex justify-between items-center mt-4">
                  <div className="text-base font-semibold font-radio-canada">
                    <span className="text-black mr-2">${discountedPrice}</span>
                    <span className="text-gray-400 line-through mr-2">
                      ${dummyOriginalPrice}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center mt-8">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-300 rounded-md mx-1 hover:bg-gray-400 disabled:bg-gray-200"
          >
            Previous
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`px-4 py-2 rounded-md mx-1 ${
                currentPage === index + 1
                  ? "bg-black text-white"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-300 rounded-md mx-1 hover:bg-gray-400 disabled:bg-gray-200"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
