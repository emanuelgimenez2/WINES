/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import Filter from "../filter/filter";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  Category,
  filterProductoCategory,
  // getProducto,
} from "../../actions/action";
import "./filters.scss";

export default function Filters() {
  const dispatch = useDispatch();
  // var pantalla = "PC"

  useEffect(() => {
    dispatch(Category());
   
  }, []);

  function capitalizarPrimeraLetra(str) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  const filterdata = useSelector((state) => state.category);

  async function handleFilter(name, category) {
    let tempName = capitalizarPrimeraLetra(name);
    let tempData = {};
    tempData[tempName] = category;

    await dispatch(filterProductoCategory(tempData));
  }

  async function handleFilterInitialData() {
    //await dispatch(getProducto());
    await dispatch(Category());

  }
  return (
    <>
      <div className="flex gap-3 justify-center m-2">
        <div className=" w-40">
          <Filter
            handleFilterInitialData={handleFilterInitialData}
            handleFilter={handleFilter}
            filterdata={filterdata}
            name="Productor"
          />
        </div>
        <div className="w-40">
          <Filter
            handleFilterInitialData={handleFilterInitialData}
            handleFilter={handleFilter}
            filterdata={filterdata}
            name="DegreeSugar"
          />
        </div>
        <div className="w-40">
          <Filter
            handleFilterInitialData={handleFilterInitialData}
            handleFilter={handleFilter}
            filterdata={filterdata}
            name="Tinto"
          />
        </div>
        <div className="w-40">
          <Filter
            handleFilterInitialData={handleFilterInitialData}
            handleFilter={handleFilter}
            filterdata={filterdata}
            name="Blanco"
          />
        </div>
        <div className="w-40">
          <Filter
            handleFilterInitialData={handleFilterInitialData}
            handleFilter={handleFilter}
            filterdata={filterdata}
            name="Rosado"
          />
        </div>
        <div>
          <p className="cursor-pointer" title="Sacar Filtros" onClick={() => (window.location.href = '/')}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path>
              
            </svg>
          </p>
        </div>
        <div className="flex space-x-4">
        </div>
      </div>
    </>
  );
}
