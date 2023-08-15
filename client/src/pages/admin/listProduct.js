import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProductoAll, delProducto } from "../../actions/action";
import { Link } from "react-router-dom";
import Pagination from "../../components/pagination";
import { useNavigate } from "react-router-dom";

function ListProduct() {
  const { products } = useSelector((state) => state);
  const dispatch = useDispatch();
  //const navigate = useNavigate();

  useEffect(() => {
    dispatch(getProductoAll());
  }, [dispatch]);

  // Paginado
  const [currentPage, setCurrentPage] = useState(1);
  const productPerPage = 12;
  const LastProductForPage = currentPage * productPerPage;
  const FirtProductForPage = LastProductForPage - productPerPage;

  const currentProducts = products.slice(
    FirtProductForPage,
    LastProductForPage
  );

  const paginado = (pageNumber) => {
    return setCurrentPage(pageNumber);
  };

  const handleDelete = (id_prod) => {
    dispatch(delProducto(id_prod));
    window.location.href = "/admin/listProduct"
  };

  return (
    <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
      <label className="text-3xl font-semibold">Products</label>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <button
        className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right"
        onClick={() => (window.location.href = "/admin/home")}
      >
        Página Principal
      </button>
      <Link
                    to={'/admin/addProduct'}
                    state={
                        {
                          id:0,
                          name: '',
                          price: '',
                          image: '',
                          summary: '',
                          alcohol: '',
                          productor: '',
                          location: '',
                          category: '',
                          categ: '',
                          place: '',
                          producer: '',
                          stock: 0,
                          minimo: 0,
                          descuento: 0
                        }
                    }
                >
                    🖋️
                </Link>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left leading-4 text-blue-500 tracking-wider">
              Nombre
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Precio
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Bodega
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Ubicacion
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Categoria tipo
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Categoria variedad
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Categoria degreeSugar
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Descuento
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">
              Acciones
            </th>
          </tr>
        </thead>
        {products &&
          currentProducts.map((product) => {
            return (
              <tbody className="bg-white w-full" key={product.id}>
                <tr>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm leading-5 text-gray-800">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b border-gray-500">
                    <div className="text-sm leading-5 text-blue-900">
                      {product.price}
                    </div>
                  </td>

                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {product.productor.description}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {product.location.description}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {product.category.type}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {product.category.variety}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {product.category.degreeSugar}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {product.descuento}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                    {product.product_state.description}
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                    <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
                      <Link to={`/admin/addProductUpd/${product.id}`}>🖋️</Link>
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-no-wrap text-right border-b border-gray-500 text-sm leading-5">
                    <button
                      className="px-5 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                      onClick={() => handleDelete(product.id)}
                    >
                      🚫
                    </button>
                  </td>
                </tr>
              </tbody>
            );
          })}
      </table>
      <Pagination
        productPerPage={productPerPage}
        products={products.length}
        paginado={paginado}
      />
    </div>
  );
}

export default ListProduct;
