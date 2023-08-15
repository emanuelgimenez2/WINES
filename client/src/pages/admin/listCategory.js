import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories,delAdmin } from '../../actions/action';
import { Link } from "react-router-dom";

function ListCategory() {
    const { categories } = useSelector(state => state);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getCategories());
    }, [dispatch])


    const handleDelete = (id_categ) => {
        dispatch(delAdmin(id_categ,'categories','id_categ','categ'))
        window.location.href = '/admin/listCategory';
    }


    return (
        <>
            <div className="align-middle inline-block min-w-full shadow overflow-hidden bg-white shadow-dashboard px-8 pt-3 rounded-bl-lg rounded-br-lg">
                <label className="text-3xl font-semibold">Categorias</label>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <button
                    className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right'
                    onClick={() => (window.location.href = '/admin/home')}>
                    Página Principal
                </button>
                &nbsp;
                <Link
                    to={'/admin/formCategory'}
                    state={
                        {
                            id: 0,
                            type: '',
                            variety: '',
                            degreeSugar: ''
                        }
                    }
                >
                    🖋️
                </Link>

                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Tipo</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Variedad</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Grado de azucar</th>
                            <th className="px-6 py-3 border-b-2 border-gray-300 text-left text-sm leading-4 text-blue-500 tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categories && categories.map(category => {
                            return (
                                <tr key={category.id_categ}>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{category.type}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{category.variety}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">{category.degreeSugar}</td>
                                    <td className="px-6 py-4 whitespace-no-wrap border-b text-blue-900 border-gray-500 text-sm leading-5">
                                        <Link
                                            to={'/admin/formCategory'}
                                            state={
                                                {
                                                    id: category.id_categ,
                                                    type: category.type,
                                                    variety: category.variety,
                                                    degreeSugar: category.degreeSugar
                                                }
                                            }
                                        >
                                            🖋️
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(category.id_categ)}
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

export default ListCategory;