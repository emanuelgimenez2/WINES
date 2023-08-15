import React from "react";
import { Link } from "react-router-dom";

function AdminHome() {
  return (
    <div>
      <div className="flex mx-auto px-4 sm:px-6">
        <div className="flex gap-2 justify-center mx-auto items-center border-b-2 border-gray-100 py-2 md:justify-start md:space-x-10">
          <div className="text-2xl font-bold transition duration-150 border-b-8 border-transparent hover:border-purple-500">
            <Link to={`/admin/listProduct`}>Productos</Link>
          </div>
          <div className="text-2xl font-bold transition duration-150 border-b-8 border-transparent hover:border-purple-500">
            <Link to={`/admin/listProductor`}>Bodegas</Link>
          </div>
          <div className="text-2xl font-bold transition duration-150 border-b-8 border-transparent hover:border-purple-500">
            <Link to={`/admin/listCategory`}>Categorias</Link>
          </div>
          <div className="text-2xl font-bold transition duration-150 border-b-8 border-transparent hover:border-purple-500">
            <Link to={`/admin/listLocation`}>Ubicaciones</Link>
          </div>
          <div className="text-2xl font-bold transition duration-150 border-b-8 border-transparent hover:border-purple-500">
            <Link to={`/admin/ventas`}>Ventas</Link>
          </div>
          <div className="text-2xl font-bold transition duration-150 border-b-8 border-transparent hover:border-purple-500">
            <Link to={`/admin/usuarios`}>Usuarios</Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center mt-5">
        <button
          className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-4 px-8 mt-2 rounded focus:outline-none focus:shadow-outline align-right"
          onClick={() => (window.location.href = "/")}
        >
          Página Principal
        </button>
      </div>
    </div>
  );
}

export default AdminHome;
