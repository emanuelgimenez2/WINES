import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders, deleteUserOrders } from "../../actions/action";
import { Link } from "react-router-dom";
import "./orders.scss";
import logo from "../../assets/logo.png";
import moment from "moment";

export default function UserOrders() {
  const dispatch = useDispatch();
 
  const { ordersUser } = useSelector((state) => state);


  useEffect(() => {
    const id_usuario = localStorage.getItem("user");

    dispatch(getUserOrders(id_usuario));
  }, [dispatch]);

  function deleteOrder(id, user_id) {
    dispatch(deleteUserOrders(id, user_id));
  }

  function FilterOrders(estado) {
    let resultado = [];  
    if (ordersUser.length > 0) {
      if (estado === "Ingreso") {
        resultado = ordersUser.filter((order) => order.estado === estado);
        
      } else {
        resultado = ordersUser.filter((order) => order.estado !== "Ingreso");
      }
    }
    return (
      
      <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
        <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
          {resultado.length > 0 ? (
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Estado
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody>
                { resultado.map((x) => {
                  return (
                    <tr key={x.id}>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {x.estado}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">{`$ ${x.total}`}</td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {moment(x.fecha).format("DD/MM/YYYY")}
                      </td>
                      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                        {estado === "Ingreso" && (
                          <button
                            className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                            onClick={() => deleteOrder(x.id, x.user_id)}
                          >
                            Eliminar
                          </button>
                        )}
                        &nbsp;&nbsp;&nbsp;&nbsp;
                        {estado === "Ingreso" && (
                          <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                            <Link
                              to={`/user/address/${x.id}`}
                              state={{
                                products: x.order_items,
                                total: x.total,
                                confirm: true,
                                id_order: x.id,
                                id_payment: x.id_payment,
                              }}
                            >
                              Finalizar Compra
                            </Link>
                          </button>
                        )}
                        {estado !== "Ingreso" && (
                          <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
                            <Link
                              to={"/user/orderDetail"}
                              state={{
                                products: x.order_items,
                                total: x.total,
                              }}
                            >
                              Ver Detalle
                            </Link>
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h3 className="text-black text-2xl title-font font-bold mb-2">
              Sin Compras Pendientes
            </h3>
          )}
        </div>
      </div>
    );
  }

  return (
    UserOrders &&
    <>
      <div className="bg-white p-8 rounded-md w-full">
        <div className=" flex items-center justify-between pb-6">
          <h2 className="text-gray-600 font-semibold">COMPRA PENDIENTE</h2>

          <div className="flex bg-gray-50 items-center p-2 rounded-md">
            <img src={logo} alt="logo" className="w-10 h-10" />
          </div>
        </div>

        {ordersUser && FilterOrders("Ingreso")}
        <br />
        <h2 className="text-gray-600 font-semibold">COMPRAS REALIZADAS</h2>
        {ordersUser && FilterOrders()}
      </div>
      <div className="px-5 py-5 bg-white border-t flex flex-col xs:flex-row items-center xs:justify-between">
        <button
          className="bg-purple-400 px-20 py-5 text-sm shadow-sm font-semibold tracking-wider  text-purple-100 rounded-full hover:shadow-2xl hover:bg-purple-500"
          onClick={() => (window.location.href = "/")}
        >
          Página Principal
        </button>
      </div>
      </>
    
  );
}
