/* eslint-disable jsx-a11y/heading-has-content */
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProducto } from "../../actions/action";
import Card from "../card/card";
import Error10 from "../errorpage/errorpage";
import ReactPaginate from "react-paginate";

const PER_PAGE = 10;

function Cards() {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    dispatch(getProducto());
  }, [dispatch]);

  useEffect(() => {
    setCurrentPage(0)
  }, [products]) 

  if (products.message === "No pude acceder a productos") {
    return (
      <div className="bg-gray-100">
        <Error10 />
      </div>
    );
  }

  //React-paginate
  const handlePageClick = ({ selected: selectedPage }) => {
    setCurrentPage(selectedPage);
  };

  const offset = currentPage * PER_PAGE;

  const currentPageProduct = products.slice(offset, offset + PER_PAGE);

  const pageCount = Math.ceil(products.length / PER_PAGE);

  const hrefBuilder = () => {
    return "#listado";
  };

  return (
    <div className="bg-gray-100" id="listado">
      <div className="flex justify-center p-4">
        <ReactPaginate
          previousLabel={"Pag.Anterior"}
          nextLabel={"Proximo"}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          containerClassName={
            'relative z-0 inline-flex rounded-md -space-x-px" aria-label="Pagination'
          }
          previousClassName={
            "flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md dark:bg-gray-900 dark:text-gray-200 hover:bg-violet-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
          }
          pageLinkClassName={
            "items-center hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md sm:flex dark:bg-gray-900 dark:text-gray-200 hover:bg-violet-500 dark:hover:bg-violet-500 hover:text-white dark:hover:text-gray-200"
          }
          nextClassName={
            "flex items-center px-4 py-2 mx-1 text-gray-700 transition-colors duration-200 transform bg-white rounded-md dark:bg-gray-900 dark:text-gray-200 hover:bg-violet-500 dark:hover:bg-blue-500 hover:text-white dark:hover:text-gray-200"
          }
          activeClassName={
            "italic text-lg font-bold"
          }
          hrefBuilder={hrefBuilder}
          hrefAllControls={true}
        />
      </div>

      <div className="w-full min-h-screen gap-4 flex-wrap flex justify-center items-center">
        {products &&
          currentPageProduct.map((e) => {
            return (
              <Card
                name={e.name}
                image={e.image}
                key={e.id}
                id={e.id}
                price={e.price}
                summary={e.summary}
                descuento={e.descuento}
              />
            );
          })}
      </div>
      
    </div>
  );
}

export default Cards;
