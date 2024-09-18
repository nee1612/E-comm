import React, { useState, useRef, useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { wishlistDb, productData } from "../Config/firebase";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { toast } from "react-toastify";
import UserContext from "../Context/UserContext";
import Cookies from "universal-cookie";
import { useScroll } from "../Context/ScrollContext";
import ConfModal from "./ConfModal"; // Import ConfModal

const cookies = new Cookies();

const ProductGrid = () => {
  const navigate = useNavigate();
  const { userDetails, wishlist, fetchWishlistItems } = useContext(UserContext);
  const { productGridRef } = useScroll();
  const wishlistTitles = new Set(wishlist.map((item) => item.title)); // Use Set for fast lookup
  const refToken = cookies.get("auth-token");
  const wishlistRef = collection(wishlistDb, "wishlistDb");

  const [itemsData, setItemsData] = useState([]);
  const fetchProductData = async () => {
    const productRef = collection(productData, "productData");
    try {
      const productSnapshot = await getDocs(productRef);
      const data = productSnapshot.docs.map((doc) => doc.data());
      setItemsData(data); // Set fetched Firebase data to state
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchProductData();
  }, []);

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8;
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = itemsData.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );
  const totalPages = Math.ceil(itemsData.length / productsPerPage);
  const topRef = useRef(null);
  const gridRef = useRef(null); // Ref for the grid container

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    if (topRef.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navigateToProductPage = (e, product) => {
    e.preventDefault();
    navigate("/product", { state: product });
  };

  const pageNumbersToShow = () => {
    const pagesToShow = 3; // Number of page numbers to show
    let pages = [];

    if (totalPages <= pagesToShow) {
      pages = Array.from({ length: totalPages }, (_, i) => i + 1);
    } else {
      const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

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

  const handleWishlistClick = async (e, product) => {
    e.stopPropagation();
    const token = cookies.get("auth-token");

    if (!token) {
      toast.error("Please login first", {
        position: "top-center",
        className: "custom-toast-error",
        bodyClassName: "customToast",
      });
      return;
    }
    try {
      const productInWishlist = wishlistTitles.has(product.title);
      if (productInWishlist) {
        const itemDoc = wishlist.find((item) => item.title === product.title);
        await deleteDoc(doc(wishlistRef, itemDoc.id));
        toast.success("Removed from wishlist", {
          position: "top-center",
          className: "custom-toast-success",
          bodyClassName: "customToast",
        });
      } else {
        // Add to wishlist
        await addDoc(wishlistRef, {
          userId: userDetails.uid,
          title: product.title,
          label: product.label,
          rating: product.rating,
          image: product.image,
          price: product.price,
          isFromWishlist: true,
        });
        toast.success("Added to wishlist");
      }

      fetchWishlistItems();
    } catch (err) {
      console.error(err);
      toast.error("An error occurred", {
        position: "top-center",
        className: "custom-toast-error",
        bodyClassName: "customToast",
      });
    }
  };

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null); // State to keep track of the selected product

  const addItemToCart = (e, product, isFromWishlist = false) => {
    e.stopPropagation();
    const token = cookies.get("auth-token");

    if (!token) {
      toast.error("Please login first", {
        position: "top-center",
        className: "custom-toast-error",
        bodyClassName: "customToast",
      });
      return;
    }
    setSelectedProduct({
      title: product.title,
      price: product.price,
      image: product.image,
      label: product.label,
      userId: userDetails.uid,
      rating: product.rating,
      isFromWishlist,
    });
    setShowModal(true); // Show the modal
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate-slideInFromBottom");
          // Stop observing after animation has been
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.01 }
    );

    if (gridRef.current) observer.observe(gridRef.current);

    return () => {
      if (gridRef.current) observer.unobserve(gridRef.current);
    };
  }, []);

  return (
    <>
      <p
        className="flex justify-center text-3xl font-bold font-raleway"
        ref={productGridRef}
      >
        Our Bestseller
      </p>
      <div ref={topRef} className="p-8 font-raleway mx-3">
        <div ref={gridRef} className="grid gap-7 prodGrid ">
          {currentProducts.map((item, index) => {
            const product = item.product || item;
            const dummyOriginalPrice = (product.price * 1.3).toFixed(2);
            const discountedPrice = product.price.toFixed(2);

            return (
              <div
                onClick={(e) => navigateToProductPage(e, product)}
                key={index}
                className="relative p-4 rounded-md bg-white shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative group">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-[16rem] object-cover mb-4 rounded-md"
                  />
                  {refToken ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill={wishlistTitles.has(product.title) ? "red" : "none"}
                      stroke={
                        wishlistTitles.has(product.title) ? "red" : "#F5EDED"
                      }
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-heart absolute top-2 right-2 text-xl opacity-100 transition-opacity duration-300 cursor-pointer"
                      onClick={(e) => handleWishlistClick(e, product)}
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="#F6F5F5"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-heart absolute top-2 right-2 text-xl opacity-100 transition-opacity duration-300 cursor-pointer"
                      onClick={(e) => handleWishlistClick(e, product)}
                    >
                      <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                  )}
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
                <button
                  onClick={(e) => addItemToCart(e, product)}
                  className="w-full mt-4 bg-black text-white py-2 px-4 rounded-lg hover:bg-gray-800"
                >
                  Add to Cart
                </button>
              </div>
            );
          })}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex flex-wrap justify-center mt-8">
        <button
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-2 text-sm md:px-4 md:py-2 bg-gray-300 rounded-md mx-1 hover:bg-gray-400 disabled:bg-gray-200 transition-colors"
        >
          Previous
        </button>

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

        <button
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-2 text-sm md:px-4 md:py-2 bg-gray-300 rounded-md mx-1 hover:bg-gray-400 disabled:bg-gray-200 transition-colors"
        >
          Next
        </button>
      </div>

      {/* Confirmation Modal */}
      {showModal && (
        <ConfModal
          showModal={showModal}
          setShowModal={setShowModal}
          item={selectedProduct}
          fetchWishlist={fetchWishlistItems}
        />
      )}
    </>
  );
};

export default ProductGrid;
