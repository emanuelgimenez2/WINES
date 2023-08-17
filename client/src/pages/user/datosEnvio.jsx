/* eslint-disable no-unused-vars */
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { UpdateDireccion } from "../../actions/action";

const url = "http://localhost:3001" 

export function validate(direccion) {
  let errors = {};

  if (direccion.calle === "") {
    errors.calle = "Debe indicar una calle!";
  }

  if (!direccion.ciudad) {
    errors.ciudad = "Debe indicar una ciudad!";
  }

  if (!direccion.provincia) {
    errors.provincia = "Debe indicar una provincia!";
  }

  if (!direccion.codigoPostal) {
    errors.codigoPostal = "Debe indicar un codigo postal!";
  }

  return errors;
}

function DatosEnvio() {  
 
  const [order, setOrder] = useState(null);
  const { id } = useParams();
  const [errors, setErrors] = useState({});
  const [continuar, setContinuar] = useState(false);
  const dispatch = useDispatch();
  const [direccion, setDireccion] = useState({
    calle: "",
    ciudad: "",
    provincia: "",
    codigoPostal: "",
  });

  const email = localStorage.getItem('email')
  
  useEffect(() => {
    axios.get(`${url}/orders` , {id, email}).then((res) => {   
      setOrder(res.data[0]);
    });
  }, []);

  useEffect(() => {
    axios.put(`{url}/email`, {id, email }).then((res) => {   
     
    });
  }, []);

  function handleChange(e) {
    e.preventDefault();
    setDireccion({
      ...direccion,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...direccion,
        [e.target.name]: e.target.value,
      })
    );
  }

  const data = {
    id,
    direccion: `calle: ${direccion.calle}, ciudad: ${direccion.ciudad}, provincia: ${direccion.provincia}, codigo postal: ${direccion.codigoPostal}`,
  };

  const handleSend = (e) => {
    e.preventDefault();
    if (direccion.calle !== "") {
      localStorage.setItem("direccion", JSON.stringify(direccion));
      dispatch(UpdateDireccion(data));
      toast.success("Direccion guardada!");
      setContinuar(true);
    } else {
      toast.error("El formulario esta vacio!");
    }
  }; 

  return (
    <div className="mt-10">
      {order && (
        <div className="sm:mt-0">
          <div className="md:grid md:grid-cols-2 md:gap-6 mx-8">
            <div className="md:col-span-1">
              <div className="px-4 sm:px-0 ml-2">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Datos de Envio
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  Proporcione una direccion de envio.
                </p>
              </div>
            </div>

            <div className="p-2 rounded-md flex flex-row-reverse">
              <img src={logo} alt="logo" className="w-20 h-20" />
            </div>

            <div className="mt-5 md:mt-0 md:col-span-2 mr-4 border border-purple-300 rounded-sm shadow-lg lg:mx-40">
              <form >
                <div className="shadow overflow-hidden sm:rounded-md">
                  <div className="px-4 py-5 bg-white sm:p-6">
                    <div className="grid grid-cols-6 gap-6">
                      <div className="col-span-6">
                        <label
                          htmlFor="street-address"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Calle
                        </label>
                        <input
                          type="text"
                          name="calle"
                          id="calle"
                          autoComplete="calle"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={direccion.calle}
                          onChange={handleChange}
                        />
                        {errors.calle && (
                          <p className="text-red-500 text-sm">{errors.calle}</p>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                        <label
                          htmlFor="city"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Ciudad
                        </label>
                        <input
                          type="text"
                          name="ciudad"
                          id="ciudad"
                          autoComplete="address-level2"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={direccion.ciudad}
                          onChange={handleChange}
                        />
                        {errors.ciudad && (
                          <p className="text-red-500 text-sm">
                            {errors.ciudad}
                          </p>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="region"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Provincia
                        </label>
                        <input
                          type="text"
                          name="provincia"
                          id="provincia"
                          autoComplete="address-level1"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={direccion.provincia}
                          onChange={handleChange}
                        />
                        {errors.provincia && (
                          <p className="text-red-500 text-sm">
                            {errors.provincia}
                          </p>
                        )}
                      </div>

                      <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                        <label
                          htmlFor="postal-code"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Codigo Postal
                        </label>
                        <input
                          type="number"
                          name="codigoPostal"
                          id="codigoPostal"
                          autoComplete="postal-code"
                          className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                          value={direccion.codigoPostal}
                          onChange={handleChange}
                        />
                        {errors.codigoPostal && (
                          <p className="text-red-500 text-sm">
                            {errors.codigoPostal}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 flex gap-3">
                    <button
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={(e) => handleSend(e)}
                      disabled={Object.keys(errors).length !== 0}
                    >
                      Guardar
                    </button>

                    <button
                      className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-400 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      disabled={!continuar}
                    >
                      <Link
                        style={{pointerEvents: continuar ? '' : 'none'}}
                        to={`/user/orderDetail`}
                        state={{
                          products: order.order_items,
                          total: order.total,
                          confirm: true,
                          id_order: order.id,
                          id_payment: order.id_payment,
                        }}
                      >
                        Continuar
                      </Link>
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
              <p className="lg:mx-60 mt-2">*Debe guardar una direccion para poder continuar</p>
        </div>
      )}
    </div>
  );
}

export default DatosEnvio;
