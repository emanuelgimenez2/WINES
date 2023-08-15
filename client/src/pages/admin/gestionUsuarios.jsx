/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/action";
// import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";


function GestionUsuarios() {
  // const navigate = useNavigate();
  const { users } = useSelector((state) => state);
  const dispatch = useDispatch();
  // const [eliminado, setEliminado] = useState(1)
   useEffect(() => {
     dispatch(getUser());
   }, []);

  // useEffect(() => {
  //   console.log('eliminado: ', eliminado);
  //   if (eliminado === 1) dispatch(getUser());
  //   setEliminado(0)
  // }, [dispatch, eliminado]);



const changeRole = (id, role) => {
  //axios.put(`http://localhost:3001/user/perfil/?id=${id}&role=${role}`)
  axios.put(`https://back-pgvinos.herokuapp.com/user/perfil/?id=${id}&role=${role}`)
  toast.success('Cambio de Perfil Realizado.')
  window.location.href = '/admin/usuarios';
}



return (
  <div>
    <h1 className="m-3">Gestionar Usuarios</h1>
    <button
        className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right"
        onClick={() => (window.location.href = "/admin/home")}
      >
        Página Principal
      </button>
    <section className="bg-white">
      <div className="container flex justify-center">
        <div className="">
          <div className="w-full px-4 mx-auto">
            <div className="max-w-full">
              <table className="table-auto w-full border rounded-md shadow-lg">
                <thead>
                  <tr className="bg-violet-500 text-center">
                    <th
                      className="w-1/4 min-w-[160px] text-lg font-semibold text-white py-1 px-3 lg:px-4 border-l border-transparent"
                    >
                      Usuario
                    </th>
                    <th
                      className="w-1/4 min-w-[160px] text-lg font-semibold text-white py-1 px-3 lg:px-4 border-l border-transparent"
                    >
                      Email
                    </th>
                    <th
                      className="w-1/4 min-w-[160px] text-lg font-semibold text-white py-1 px-3 lg:px-4 border-l border-transparent"
                    >
                      Role
                    </th>

                    <th
                      className="w-1/2 min-w-[160px] text-lg font-semibold text-white py-1 px-3 lg:px-4 border-l border-transparent"
                    >
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => {
                    return (
                      <tr>
                        <td
                          className="text-center text-dark font-medium text-base py-3 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]"
                        >
                          {user.full_name}
                        </td>
                        <td
                          className="text-center text-dark font-medium text-base py-3 px-2 bg-white border-b border-l border-[#E8E8E8]"
                        >
                          {user.email}
                        </td>
                        <td
                          className="text-center text-dark font-medium text-base py-3 px-2 bg-[#F3F6FF] border-b border-l border-[#E8E8E8]"
                        >
                          {user.role}
                        </td>

                        <td
                          className="text-center text-dark font-medium text-sm py-1 px-2 m-0 bg-white border-b border-l border-[#E8E8E8] w-80 inline-flex items-center justify-center gap-1"

                        >
                          <button
                            className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right'
                            onClick={() => changeRole(user.id,'Admin')}>
                            Hacer Admin
                          </button>
                          &nbsp;
                          <button
                            className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right'
                            onClick={() => changeRole(user.id,'User')}>
                            Cliente
                          </button>
                          &nbsp;
                          <button
                            className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-2 mt-2 rounded focus:outline-none focus:shadow-outline align-right'
                            onClick={() => changeRole(user.id,'Baja')}>
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
);

                }
export default GestionUsuarios;
