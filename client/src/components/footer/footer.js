import React from "react";
import { useNavigate } from "react-router-dom";

import Newsletter from "./Newsletter";

const Footer = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-auto container py-16 xl:px-20 lg:px-12 sm:px-6 px-4">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 md:gap-8 gap-4">
        <div className="flex flex-col flex-shrink-0">
          <div>
            <h3 className="text-2xl font-bold text-gray-900">Wines </h3>
          </div>
          <p className="text-sm leading-none text-gray-800 mt-4">
            Copyright © 2022 Wines
          </p>
          <p className="text-sm leading-none text-gray-800 mt-4">
            All rights reserved
          </p>
        </div>
        <div className="sm:ml-0 ml-8">
          <h2 className="text-base font-semibold leading-4 text-gray-800">
            Empresa
          </h2>

          <p
            onClick={() => {
              navigate("/about");
            }}
            className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer"
          >
            Quienes somos
          </p>

          <p
            onClick={() => {
              navigate("/contact");
            }}
            className="hover:text-gray-500 text-base leading-4 mt-6 text-gray-800 cursor-pointer"
          >
            Nuestras Sucursales
          </p>
        </div>

        <Newsletter />
      </div>
    </div>
  );
};

export default Footer;
