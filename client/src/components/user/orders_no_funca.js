/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders, deleteUserOrders } from "../../actions/action";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

export default function UserOrders() {
  const dispatch = useDispatch();
  const { ordersUser } = useSelector((state) => state);
  const { user, isAuthenticated } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      const id_usuario = user.sub;

      dispatch(getUserOrders(id_usuario));
    }
  }, [dispatch]);

  function deleteOrder(id, user_id) {
    dispatch(deleteUserOrders(id, user_id));
  }

  function FilterOrders(estado) {
    let resultado = [];
    if (ordersUser.length > 0) {
      if (estado === "Creada") {
        resultado = ordersUser.filter((order) => order.estado === estado);
      } else {
        resultado = ordersUser.filter((order) => order.estado !== "Creada");
      }
    }
    return (
      <div>
        {resultado.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Estado</th>
                <th>Total</th>
                <th>Fecha</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {resultado.map((x) => {
                return (
                  <tr key={x.id}>
                    <td>{x.estado}</td>
                    <td>{x.total}</td>
                    <td>{x.fecha}</td>
                    <td>
                      {estado === "Creada" && (
                        <button onClick={() => deleteOrder(x.id, x.user_id)}>
                          Eliminar
                        </button>
                      )}
                      {estado === "Creada" && (
                        <Link
                          to={"/user/orderDetail"}
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
                      )}
                      {estado !== "Creada" && (
                        <Link
                          to={"/user/orderDetail"}
                          state={{
                            products: x.order_items,
                            total: x.total,
                          }}
                        >
                          Ver Detalle
                        </Link>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
            &bprn;
          </table>
        ) : (
          <h3>Sin Compras Pendientes</h3>
        )}
      </div>
    );
  }

  return (
    <>
      <div>
        <h2>COMPRA PENDIENTE</h2>
        {ordersUser && FilterOrders("Creada")}
        <h2>COMPRAS REALIZADAS</h2>
        {ordersUser && FilterOrders()}
      </div>
    </>
  );
}
