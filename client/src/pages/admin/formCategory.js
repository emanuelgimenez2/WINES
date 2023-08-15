import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { AddCategoria, UpdateCategoria } from "../../actions/action";

export function validate(input) {
  let errors = {};
  if (input.variety === "") {
    errors.variety = "Debe indicar una variedad!";
  }

  if (input.type === "") {
    errors.type = "Debe seleccionar un tipo!";
  }

  if (input.degreeSugar === "") {
    errors.degreeSugar = "Debe seleccionar una graduacion!";
  }

  return errors;
}

function AddCategory() {
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const tipos = ["Tinto", "Rosado", "Blanco"];
  const sugars = ["Seco", "Abocado", "Semiseco", "Dulce", "Dulce Natural"];
  const [input, setInput] = useState({
    id: state ? state.id : "",
    variety: state ? state.variety : "",
    type: state ? state.type : "",
    degreeSugar: state ? state.degreeSugar : "",
  });

  const [errors, setErrors] = useState({});

  function handleChange(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.variety !== "") {
      if (!state || input.id === 0) {
        dispatch(AddCategoria(input));
        alert("Categoria agregada con exito!");
      } else {
        dispatch(UpdateCategoria(input));
        alert("Categoria modificada con exito!");
      }
      navigate("/admin/listCategory");
    } else {
      alert("No puede enviar el formulario vacio!");
    }
  };

  return (
    <div className='bg-[url("https://ewine.cl/img/cms/Tipos_de_vino.png")] bg-cover bg-center m-0 w-full h-screen'>
      <div className="w-full h-full max-w-lg mx-auto">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="bg-white shadow-md rounded px-8 pt-10 pb-10 grid"
        >
          <h1 className="justify-self-center">
            COMPLETE LOS SIGUIENTES CAMPOS:
          </h1>

          <div className="mb-4">
            <label
              htmlFor="variety"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Variedad:{" "}
            </label>
            <input
              type="text"
              id="variety"
              name="variety"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input.variety}
              onChange={handleChange}
            />
            {errors.variety && <p className="text-red-500">{errors.variety}</p>}
          </div>

          <div className="mt-6">
            <label
              htmlFor="type"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tipo:
            </label>
            <select
              className="shadow block appearance-none w-full  border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="type"
              id="type"
              onChange={(e) => handleChange(e)}
              value={input.type}
            >
              <option value="" disabled>
                Seleccionar
              </option>

              {tipos.map((tipo, index) => {
                return (
                  <option value={tipo} key={index}>
                    {tipo}
                  </option>
                );
              })}
            </select>
            {errors.type && <p className="text-red-500">{errors.type}</p>}
          </div>

          <div className="mt-6">
            <label
              htmlFor="degreeSugar"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Tipo:
            </label>
            <select
              className="shadow block appearance-none w-full  border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="degreeSugar"
              id="degreeSugar"
              onChange={(e) => handleChange(e)}
              value={input.degreeSugar}
            >
              <option value="" disabled>
                Seleccionar
              </option>

              {sugars.map((sugar, index) => {
                return (
                  <option value={sugar} key={index}>
                    {sugar}
                  </option>
                );
              })}
            </select>
            {errors.degreeSugar && (
              <p className="text-red-500">{errors.degreeSugar}</p>
            )}
          </div>

          <button
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            {state ? "MODIFICAR" : "AGREGAR"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddCategory;
