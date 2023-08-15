/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { updateUserOrders, addStock, mailCambioEstado } from "../../actions/action";
import { useDispatch } from "react-redux";
import logo from "../../assets/logo.png";
import enviarMail from "../../components/envioMails/EnvioMails";


export default function OrderDetail() {
  const location = useLocation();
  const { state } = location;
  const dispatch = useDispatch();
  const navigate = useNavigate() 
 
  var btnEstado = ""   
  
  function changeStatus(id, estado) {
    console.log(`-${estado}-`);
    var proxEstado = ""
    if (estado === 'Activar') proxEstado = 'Creada' // estaba Cancelada
    if (estado === 'Revertir Proceso') proxEstado = 'Procesando'
    if (estado === 'Cancelada') proxEstado = 'Cancelada'
    if (estado === 'Procesar') proxEstado = 'Procesando'
    if (estado === 'Completo') proxEstado = 'Completo'
    console.log('change', id,'estado BOTON:', estado,'estado a Crear:', proxEstado);
    dispatch(updateUserOrders({ id: id, estado: proxEstado }));
    // paso a completo y saco el stock
    if (estado === 'Procesar') {
      dispatch(addStock(id, "menos"))      
      dispatch(mailCambioEstado(enviarMail(estado, state.email, id, state.total )))
      
    }
    if (estado === 'Cancelada') {
      dispatch(addStock(id, "mas"))
      dispatch(mailCambioEstado(enviarMail(estado, state.email, id, state.total)))     
    }
    if (estado === 'Completo') {
      dispatch(mailCambioEstado(enviarMail(estado, state.email, id, state.total, state.products)))             
    }
    window.location.href = '/admin/ventas';

}  
console.log('state.estado: ', state.estado);

  if (state.estado === 'Creada') btnEstado = 'Procesar'
  if (state.estado === 'Cancelada') btnEstado = 'Activar'
  if (state.estado === 'Procesando') btnEstado = 'Completo'
  if (state.estado === 'Completo') btnEstado = 'Revertir Proceso'

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
          <header className="flex justify-between border-b pb-8">
            <div className="font-semibold text-gray-800">Detalle de Compras</div>

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


                <div className="flex justify-center font-bold space-x-4 text-2xl border-t border-gray-100 px-9 py-4">

                <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" 
                        onClick={() => changeStatus(state.id, btnEstado)}>
                          {btnEstado}
                </button>
                &nbsp;&nbsp;&nbsp;
                <button className="bg-red-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer" 
                        onClick={() => changeStatus(state.id, 'Cancelada')}>
                          Cancelar
                </button>

                </div>

              <a                
                className="flex font-semibold text-indigo-600 text-sm  justify-start cursor-pointer"
                onClick={() => (navigate('/admin/ventas'))}
              >
                <svg
                  className="fill-current mr-2 text-indigo-600 w-5"
                  viewBox="0 0 448 512"
                >
                  <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                </svg>
                Ventas
              </a>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
