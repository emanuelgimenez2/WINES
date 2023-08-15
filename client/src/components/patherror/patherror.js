import React from "react";
import imgVino from "../../assets/vinos-caros-removebg-preview.png";

const Error = ({msj}) => {
  return (
    <div className="flex items-center flex-col justify-center lg:flex-row py-28 px-6 md:px-24 md:py-20 lg:py-32 gap-16 lg:gap-28">
      <div className="w-full lg:w-1/2">
        {/*  <img className="hidden lg:block" src="https://i.ibb.co/v30JLYr/Group-192-2.png" alt="" /> */}
        <img
          className="hidden md:block lg:hidden"
          src="https://www.casadevinosmendoza.com.ar/wp-content/uploads/2022/04/promo-4-500x500.jpg"
          alt=""
        />
        <img className="md:hidden" src="" alt={imgVino} />
      </div>
      <div className="w-full lg:w-1/2">
        <h1 className="py-4 text-3xl lg:text-4xl font-extrabold text-gray-800">
          {msj}
        </h1>

        <button
          onClick={() => (window.location.href = "/")}
          className="w-full lg:w-auto my-4 border rounded-md px-1 sm:px-16 py-5 bg-indigo-600 text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-700 focus:ring-opacity-50"
        >
          Go back to Homepage
        </button>
      </div>
    </div>
  );
};

export default Error;
