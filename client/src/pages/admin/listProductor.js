import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducer,delAdmin } from '../../actions/action';
import { Link } from "react-router-dom";

function ListProductor() {
    const { productores } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getProducer());
    }, [dispatch])

    const handleDelete = (id_Prod) => {
        dispatch(delAdmin(id_Prod, 'productors', '"id_Prod"', 'producer'))
        window.location.href = '/admin/listProductor';
    }


    return (
        <>

            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg ">

                <label className="text-3xl font-semibold">Bodegas</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                    className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right'
                    onClick={() => (window.location.href = '/admin/home')}>
                    Página Principal
                </button>
                &nbsp;
                <Link
                    to={'/admin/formProductor'}
                    state={
                        {
                            id_Prod: 0,
                            description: ''
                        }
                    }
                >
                    🖋️
                </Link>
                <table className="min-w-full">

                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Bodega</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {productores && productores.map(productor => {
                            return (
                                <tr key={productor.id_Prod}>
                                    <td>{productor.description}</td>
                                    <td>
                                        <Link
                                            to={'/admin/formProductor'}
                                            state={
                                                {
                                                    id_Prod: productor.id_Prod,
                                                    description: productor.description
                                                }
                                            }
                                        >
                                            🖋️
                                        </Link>
                                        &nbsp;
                                        <button onClick={() => handleDelete(productor.id_Prod)}>🚫</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ListProductor;