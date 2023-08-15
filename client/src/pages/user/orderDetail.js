/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import ReturnUserLoged from "../../navigation/returnUserLoged";

export default function OrderDetail() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate()
  var pagina = "/";

  if (ReturnUserLoged() === "Admin") {
    pagina = "/admin/ventas";
  }

  function payout() {
    const id_usuario = localStorage.getItem("user");
    if (id_usuario) {
      window.location = `https://www.mercadopago.com.ar/checkout/v1/redirect?pref_id=${state.id_payment}`;
    }
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="flex justify-between border-b pb-8">
            <div className="font-semibold text-gray-800">Detalle de Compra</div>

            <img src={logo} alt="logo" className="h-8 w-auto  " />
          </header>

          {state.products && (
            <div className="overflow-x-auto p-3">
              <table className="table-auto w-full">
                <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                  <tr>
                    <th className="p-2">
                      <div className="font-semibold text-left">Producto</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Cantidad</div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">
                        Precio Unit.
                      </div>
                    </th>
                    <th className="p-2">
                      <div className="font-semibold text-center">Subtotal</div>
                    </th>

                    {!state.confirm && <th>Accion</th>}
                  </tr>
                </thead>
                <tbody className="text-sm divide-y divide-gray-100">
                  {state.products.map((item) => {
                    return (
                      <tr key={item.product.id}>
                        <td className="p-2">
                          <div className="font-medium text-gray-800">
                            {item.product.name}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center">{item.quantity}</div>
                        </td>
                        <td className="p-2">
                          <div className="text-center font-medium text-green-500">
                            ${item.price}
                          </div>
                        </td>
                        <td className="p-2">
                          <div className="text-center font-medium text-green-500">
                            ${item.quantity * item.price}
                          </div>
                        </td>

                        {!state.confirm && (
                          <td>
                            <Link
                              to={`/detail/${item.product.id}`}
                            >
                              Ver Producto
                            </Link>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              <div className="flex justify-end font-bold space-x-4 text-2xl border-t border-gray-100 px-5 py-4">
                <div>Total</div>
                <div className="text-blue-600">
                  $ <span x-text="total.toFixed(2)">{state.total}</span>
                </div>
              </div>

              {state.confirm && (
                <div className="flex justify-center font-bold space-x-4 text-2xl border-t border-gray-100 px-9 py-4">
                  <button
                    className="bg-indigo-600 px-12 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                    onClick={() => payout()}
                  >
                    Pagar
                  </button>
                </div>
              )}
              <a                
                className="flex font-semibold text-indigo-600 text-sm  justify-start cursor-pointer"
                onClick={() => (navigate('/'))}
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-5"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Página Principal
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
