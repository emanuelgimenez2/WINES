/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { filterProductoName } from "../../actions/action";

export default function Search() {
  const dispatch = useDispatch();

  const [name, setName] = useState("");

  function handleInputChange(e) {
 
    if (e.key === "Enter") {
      dispatch(filterProductoName(name));
    }
  }
  useEffect(() => {
    dispatch(filterProductoName(name));
  }, [name]);

  return (
    <>
      <div>
        <input
          onKeyPress={(e) => handleInputChange(e)}
          onChange={(e) => setName(e.target.value)}
          // onBlur={() => {
          //   setName("");
          // }}
          type="text"
          id="search-navbar"
          className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Buscar..."
          value={name}
        />
      </div>
    </>
  );
}
