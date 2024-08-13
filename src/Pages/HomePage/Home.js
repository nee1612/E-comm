import React from "react";
import HomeComp from "../../Componetns/HomeComp";
import Nav from "../../Componetns/Navbar";
import ShopByCategories from "../../Componetns/ShopByCategories";
import ProductGrid from "../../Componetns/ProductGrid";
import DealsOfTheMonth from "../../Componetns/DealsOfTheMonth";
import ReviewCarousel from "../../Componetns/ReviewCarousel";
import InstagramStories from "../../Componetns/InstagramStories";
import Footer from "../../Componetns/Footer";

function Home() {
  return (
    <div>
      <Nav />
      <HomeComp />
      <ShopByCategories />
      <ProductGrid />
      <DealsOfTheMonth />
      <ReviewCarousel />
      <InstagramStories />
      <Footer />
    </div>
  );
}

export default Home;
