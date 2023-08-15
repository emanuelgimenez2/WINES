/* eslint-disable jsx-a11y/anchor-is-valid */
import React  from "react";
import "./filter.scss";

export default function Filter({
  handleFilter,
  handleFilterInitialData,
  filterdata,
  name,
}) {

  let tempName =
    name === "Productor"
      ? filterdata.Productor
      : name === "DegreeSugar"
      ? filterdata.DegreeSugar
      : name === "Tinto"
      ? filterdata.Tinto
      : name === "Blanco"
      ? filterdata.Blanco
      : filterdata.Rosado;

  return (
    <>
      <div className="flex justify-center flex-row">
        <div className="mb-3 xl:w-96 ">
          <select
            className="form-select appearance-none
            flex justify-center
            block
            w-full
            px-3
            py-1.5
            text-base
            font-normal
            text-gray-700
            bg-white bg-clip-padding bg-no-repeat
            border border-solid border-violet-500
            rounded
            transition
            ease-in-out
            m-0
            focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none wrapper-filter"
            aria-label="Default select example"
            onChange={(e) => {
              handleFilter(name, e.target.value);
              handleFilterInitialData();
            }}
            // onBlur={() => {
            //   handleFilterInitialData();
              
            // }}
          >
            <option hidden value={name} >{name}</option>
            {tempName &&
              tempName.map((item, index) => {
                return (
                  <option value={item}  key={index}>
                    {item}
                  </option>
                );
              })}
          </select>
        </div>
      </div>
    </>
  );
}
