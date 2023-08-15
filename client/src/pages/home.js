import React from "react";
import Cards from "../components/cards/cards";
import Filters from "../components/filters/filters";
import Footer from "../components/footer/footer";
import Navbar from "../components/navbar/navbar";
import ScrollToTop from "react-scroll-to-top";
// import Offers from "../components/offers/offers";

function Home() {
  return (
    <>
      <ScrollToTop 
      smooth
      color="#4338ca" 
      className="flex justify-center items-center"
      top={300}
      />
      <div>
        <div>
          <Navbar />
        </div>

        <div>
          <Filters />
        </div>
        {/* <div>
          <Offers />
        </div> */}
        <div>
          <Cards />
        </div>
        <div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
