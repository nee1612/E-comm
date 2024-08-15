import React, { useContext, useState, useEffect } from "react";
import HomeComp from "../../Componetns/HomeComp";
import Nav from "../../Componetns/Navbar";
import ShopByCategories from "../../Componetns/ShopByCategories";
import ProductGrid from "../../Componetns/ProductGrid";
import DealsOfTheMonth from "../../Componetns/DealsOfTheMonth";
import ReviewCarousel from "../../Componetns/ReviewCarousel";
import InstagramStories from "../../Componetns/InstagramStories";
import Footer from "../../Componetns/Footer";
import { useRef } from "react";
import UserContext from "../../Context/UserContext";
import Loader from "../../Componetns/Loader";

function Home() {
  const productGridRef = useRef(null);
  const { loading } = useContext(UserContext);
  const [loadingSec, setLoadingSec] = useState(true);
  const scrollToProductGrid = () => {
    if (productGridRef.current) {
      productGridRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoadingSec(false);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loadingSec ? (
        <Loader />
      ) : (
        <div>
          <Nav scrollToProductGrid={scrollToProductGrid} />
          <HomeComp scrollToProductGrid={scrollToProductGrid} />
          <ShopByCategories />
          <div ref={productGridRef}>
            <ProductGrid />
          </div>
          <DealsOfTheMonth scrollToProductGrid={scrollToProductGrid} />
          <ReviewCarousel />

          <InstagramStories pageType="home" />
          <Footer />
        </div>
      )}
    </>
  );
}

export default Home;
