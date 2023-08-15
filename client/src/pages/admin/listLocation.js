import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getlocation,delAdmin } from '../../actions/action';
import { Link } from "react-router-dom";

function ListLocation() {
    const { locations } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getlocation());
    }, [dispatch])


    const handleDelete = (id_prod) => {
        dispatch(delAdmin(id_prod,'locations','id_place','place'))
        window.location.href = '/admin/listLocation';
    }

    return (
        <>
            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg ">
                
                <label className="text-3xl font-semibold">Locations</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                    className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right'
                    onClick={() => (window.location.href = '/admin/home')}>
                    Página Principal
                </button>
                <Link
                    to={'/admin/formLocation'}
                    state={
                        {
                            id_place:0,
                            description: ''
                        }
                    }
                >
                    🖋️
                </Link>                
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Ubicacion</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locations && locations.map(location => {
                            return (
                                <tr key={location.id_place}>
                                    <td>{location.description}</td>
                                    <td>
                                        <button className="px-5 py-2 border-blue-500 border text-blue-500 rounded transition duration-300 hover:bg-blue-700 hover:text-white focus:outline-none">
                                            <Link
                                                to={'/admin/formLocation'}
                                                state={
                                                    {
                                                        id_place: location.id_place,
                                                        description: location.description
                                                    }
                                                }
                                            >
                                                🖋️
                                            </Link>
                                            &nbsp;  &nbsp;&nbsp;&nbsp;
                                        </button>
                                        &nbsp;&nbsp;&nbsp;
                                        <button className="px-5 py-2 border-red-500 border text-red-500 rounded transition duration-300 hover:bg-red-700 hover:text-white focus:outline-none"
                                            onClick={() => handleDelete(location.id_place)}
                                        >🚫</button>
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

export default ListLocation;