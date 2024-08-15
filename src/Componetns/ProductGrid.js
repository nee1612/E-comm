import React, { useState, useRef, useEffect } from "react";
import { products } from "../ProductJSON/products"; // Update the import path as necessary
import { useNavigate } from "react-router-dom";

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
};

const ProductGrid = () => {
  const navigate = useNavigate();
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
  const productsPerPage = 8;

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

  // Create a ref for the top of the component
  const topRef = useRef(null);

  // Handle page change with scroll to top
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToProductPage = (e, product) => {
    e.preventDefault();

    navigate("/product", {
      state: product,
    });
  };

  // Calculate which page numbers to display
  const pageNumbersToShow = () => {
    const totalPages = Math.ceil(shuffledProducts.length / productsPerPage);
    const pagesToShow = 3; // Number of page numbers to show

    let pages = [];

    // Handle edge cases when there are fewer pages than the number to display
    if (totalPages <= pagesToShow) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      // Determine the range of pages to display
      const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

      // Adjust startPage if endPage exceeds totalPages
      if (endPage - startPage + 1 < pagesToShow) {
        pages = Array.from(
          { length: pagesToShow },
          (_, i) => endPage - pagesToShow + 1 + i
        );
      } else {
        pages = Array.from({ length: pagesToShow }, (_, i) => startPage + i);
      }
    }

    return pages;
  };

  const handleWishlistClick = (e, product) => {
    e.stopPropagation();
    console.log("Added to wishlist:", product);
  };
  return (
    <>
      <p className="flex justify-center text-3xl font-bold font-raleway">
        Our Bestseller
      </p>

      <div ref={topRef} className="p-8 font-raleway mx-3">
        <div className="grid gap-7 prodGrid">
          {currentProducts.map((product, index) => {
            const dummyOriginalPrice = (product.price * 1.3).toFixed(2);
            const discountedPrice = product.price.toFixed(2);

            return (
              <div
                onClick={(e) => {
                  // Navigate to the product detail page
                  navigateToProductPage(e, product);
                }}
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
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-heart absolute top-2 right-2 text-white text-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                    onClick={(e) => handleWishlistClick(e, product)} // Handle heart click
                  >
                    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                  </svg>
                </div>
                <h2 className="text-lg font-semibold">{product.title}</h2>
                <p className="text-gray-500">
                  {product.description && product.description.substring(0, 40)}
                  ...
                </p>
                <p className="bg-green-100 text-green-700 text-sm inline-block mt-2 px-2 rounded-md">
                  {product.label}
                </p>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-base font-semibold font-radio-canada">
                    <span className="text-black mr-2">${discountedPrice}</span>
                    <span className="text-gray-400 line-through mr-2">
                      ${dummyOriginalPrice}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800">
                  View Product
                </button>
              </div>
            );
          })}
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-wrap justify-center mt-8">
          {/* Previous Button */}
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-2 text-sm md:px-4 md:py-2 bg-gray-300 rounded-md mx-1 hover:bg-gray-400 disabled:bg-gray-200 transition-colors"
          >
            Previous
          </button>

          {/* Page Numbers */}
          {pageNumbersToShow().map((page, index) =>
            page === "..." ? (
              <span
                key={index}
                className="px-3 py-2 text-sm md:px-4 md:py-2 mx-1"
              >
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => paginate(page)}
                className={`px-3 py-2 text-sm md:px-4 md:py-2 rounded-md mx-1 ${
                  currentPage === page
                    ? "bg-black text-white"
                    : "bg-gray-300 hover:bg-gray-400"
                } transition-colors`}
              >
                {page}
              </button>
            )
          )}

          {/* Next Button */}
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-2 text-sm md:px-4 md:py-2 bg-gray-300 rounded-md mx-1 hover:bg-gray-400 disabled:bg-gray-200 transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductGrid;
