import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getOrders } from "../../actions/action";
import { Link } from "react-router-dom";

export default function UserOrders() {
    const dispatch = useDispatch();
    const { ordersUser } = useSelector(state => state)
    const [verEstado, setVerEstado] = useState('Todos')

    useEffect(() => {
        dispatch(getOrders());
    }, [dispatch]);

    function cambiarEstado(est) {
        setVerEstado(est)
    }

    function FilterOrders(estado) {
        let resultado = [];
        if (ordersUser.length > 0) {
            if (estado !== 'Todos') {
                resultado = ordersUser.filter(order => order.estado === estado)
            } else {
                resultado = ordersUser.filter(order => order.estado !== 'Ingreso')
            }
        }
        return (
            <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
                <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
                    {resultado.length > 0 ?
                        <table className="min-w-full leading-normal">
                            <thead>
                                <tr>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Estado</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Total</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Fecha</th>
                                    <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {resultado.map(x => {
                                    return (
                                        <tr key={x.id}>
                                            <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">{x.estado}</td>
                                            <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">{x.total}</td>
                                            <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">{x.fecha}</td>
                                            <td className="px-1 py-1 border-b border-gray-200 bg-white text-sm">
                                                <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer"><Link
                                                    to={'/user/orderDetailAdmin'}
                                                    state={
                                                        {
                                                            id: x.id,
                                                            products: x.order_items,
                                                            total: x.total,
                                                            estado: x.estado,
                                                            email: x.emailEnvio
                                                        }
                                                    }
                                                >
                                                    Ver Detalle
                                                </Link></button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                        : <h3 className="text-black text-2xl title-font font-bold mb-2" >Sin Compras Pendientes</h3>}
                </div>
            </div>
        )
    }

    return (
        <>
            <div className="bg-white p-8 rounded-md w-full flex">
                <br />
                <h2 className="text-gray-600 font-semibold">COMPRAS REALIZADAS</h2>
                <div>
                    &nbsp;&nbsp;Filtros&nbsp;&nbsp;
                </div>
                <div>
                    <button className="bg-indigo-600 px-4 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={() => cambiarEstado("Creada")}>Creadas</button>&nbsp;
                </div>
                <div>
                    <button className="bg-indigo-600 px-4 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={() => cambiarEstado("Procesando")}>Procesando</button>&nbsp;
                </div>
                <div>
                    <button className="bg-indigo-600 px-4 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={() => cambiarEstado("Completo")}>Completos</button>&nbsp;
                </div>
                <div>
                    <button className="bg-indigo-600 px-4 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer" onClick={() => cambiarEstado("Todos")}>Todos</button>
                </div>

            </div>
                {ordersUser && FilterOrders(verEstado)}
            <div className="bg-white flex p-8 rounded-md w-full">
                <div className="lg:w-1/2">
                    <button
                        className="bg-indigo-600 px-4 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                        onClick={() => (window.location.href = '/admin/home')}>
                        Página Administración
                    </button>
                    &nbsp;&nbsp;&nbsp;&nbsp;
                    <button
                        className="bg-indigo-600 px-4 py-1 rounded-md text-white font-semibold tracking-wide cursor-pointer"
                        onClick={() => (window.location.href = '/admin/graficos')}>
                        Graficos
                    </button>
                </div>

            </div>

        </>
    );

}


