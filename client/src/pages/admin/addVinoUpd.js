/* eslint-disable no-lone-blocks */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import {
  AddProductUpd,
  getCategories,
  getlocation,
  getProducer,
} from "../../actions/action";
import axios from "axios";

export function validate(input) {
  let errors = {};
  if (input.name === "") {
    errors.name = "Debe indicar un nombre!";
  }

  if (!input.price) {
    errors.price = "Precio requerido!";
  } else if (input.price < 1) {
    errors.price = "Precio invalido";
  }

  if (input.image === "") {
    errors.image = "Debe indicar una imagen!";
  }

  if (!input.summary) {
    errors.summary = "Descripcion requerida!";
  }

  if (!input.alcohol) {
    errors.alcohol = "Debe indicar una graduacion!";
  } else if (input.alcohol < 1) {
    errors.alcohol = "Graduacion invalida";
  }

  if (!input.producer) {
    errors.producer = "Debe seleccionar 1 productor!";
  }

  if (!input.place) {
    errors.place = "Debe seleccionar 1 locacion!";
  }
  if (!input.stock) {
    errors.stock = "Debe ingresar el stock ";
  }
  if (!input.minimo) {
    errors.minimo = "Debe ingresar el stock Minimo";
  }
  if (!input.categ) {
    errors.categ = "Debe seleccionar 1 categoria!";
  }

  return errors;
}

function Addvino() {
  //const url = "http://localhost:3001";
  const url = "https://back-pgvinos.herokuapp.com";
  const navigate = useNavigate();
  const { productores, locations, categories } = useSelector((state) => state);
  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const [prod, Setprod] = useState(null);
  let id = useParams(); //traer el id del url

  useEffect(() => {
    dispatch(getProducer());
    dispatch(getlocation());
    dispatch(getCategories());
    axios
      .get(`${url}/products/detail/${id.id}`)
      .then((detailProduct) => {
        Setprod(detailProduct.data[0]);
      })
      .catch((error) => {
        console.log(error + "error al obtener el producto");
      });
  }, []);

  const [input, setInput] = useState({
    id: 0,
    name: "",
    price: "",
    image: "",
    summary: "",
    alcohol: "",
    productor: "",
    location: "",
    category: "",
    categ: "",
    place: "",
    producer: "",
    stock: 0,
    minimo: 0,
    descuento: 0,
  });

  if (prod && input.name === "") {
    setInput({
      ...input,
      id: prod.id,
      name: prod.name,
      price: prod.price,
      alcohol: prod.alcohol,
      image: prod.image,
      place: prod.location.id_place,
      producer: prod.productor.id_Prod,
      categ: prod.category.id_categ,
      stock: prod.stock,
      minimo: prod.minimo,
      summary: prod.summary,
      descuento: prod.descuento,
    });
  }
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

  function handleProductor(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value.substring(4).trim(),
      producer: e.target.value.substring(0, 2).trim(),
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleLocacion(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value.substring(4).trim(),
      place: e.target.value.substring(0, 2).trim(),
    });
    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  }

  function handleCategoria(e) {
    e.preventDefault();
    setInput({
      ...input,
      [e.target.name]: e.target.value.substring(4).trim(),
      categ: e.target.value.substring(0, 2).trim(),
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
    if (input.name !== "") {
      input.price = input.price * (1 - input.descuento / 100);
      dispatch(AddProductUpd(input));
      alert("Producto agregado con exito!");
      navigate("/admin/listProduct");
    } else {
      alert("No puede enviar el formulario vacio!");
    }
  };

  return (
    <div className='bg-[url("https://www.cronista.com/files/image/346/346068/610b207323724.jpg")] bg-cover bg-center m-0'>
      <div className="w-full max-w-lg mx-auto">
        <form
          onSubmit={(e) => handleSubmit(e)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 grid"
        >
          <h1 className="justify-self-center">
            COMPLETE LOS SIGUIENTES CAMPOS:
          </h1>

          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Nombre:{" "}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input.name}
              onChange={handleChange}
            />
            {errors.name && <p className="text-red-500">{errors.name}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Precio:{" "}
            </label>
            <input
              type="text"
              id="price"
              name="price"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input.price}
              onChange={handleChange}
            />
            {errors.price && <p className="text-red-500">{errors.price}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="descuento"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Descuento:{" "}
            </label>
            <input
              type="text"
              id="descuento"
              name="descuento"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input.descuento}
              onChange={handleChange}
            />
            {errors.descuento && (
              <p className="text-red-500">{errors.descuento}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="stock"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Stock:{" "}
            </label>
            <input
              type="text"
              id="stock"
              name="stock"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input.stock}
              onChange={handleChange}
            />
            {errors.stock && <p className="text-red-500">{errors.stock}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="minimo"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              minimo Minimo:{" "}
            </label>
            <input
              type="text"
              id="minimo"
              name="minimo"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input.minimo}
              onChange={handleChange}
            />
            {errors.minimo && <p className="text-red-500">{errors.minimo}</p>}
          </div>
          <div className="mb-4">
            <label
              htmlFor="image"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Imagen:{" "}
            </label>
            <input
              type="text"
              id="image"
              name="image"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input.image}
              onChange={handleChange}
            />
            {errors.image && <p className="text-red-500">{errors.image}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="summary"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Descripcion:{" "}
            </label>
            <textarea
              id="summary"
              name="summary"
              cols="30"
              rows="3"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input.summary}
              onChange={handleChange}
            ></textarea>
            {errors.summary && <p className="text-red-500">{errors.summary}</p>}
          </div>

          <div className="mb-4">
            <label
              htmlFor="alcohol"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Graduacion alcoholica:{" "}
            </label>
            <input
              type="text"
              id="alcohol"
              name="alcohol"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={input.alcohol}
              onChange={handleChange}
            />
            {errors.alcohol && <p className="text-red-500">{errors.alcohol}</p>}
          </div>

          <div className="mt-4">
            <label
              htmlFor="productor"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Productor:
            </label>
            <select
              className="shadow block appearance-none w-full  border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="productor"
              id="productor"
              onChange={(e) => handleProductor(e)}
            >
              <option selected disabled>
                Seleccionar
              </option>

              {productores.map((productor) => {
                {
                  if (productor.id_Prod === input.producer) {
                    return (
                      <option
                        selected
                        value={productor.name}
                        key={productor.id_Prod}
                      >{`${productor.id_Prod} - ${productor.description}`}</option>
                    );
                  } else {
                    return (
                      <option
                        value={productor.name}
                        key={productor.id_Prod}
                      >{`${productor.id_Prod} - ${productor.description}`}</option>
                    );
                  }
                }
              })}
            </select>
            {errors.producer && (
              <p className="text-red-500">{errors.producer}</p>
            )}
          </div>

          <div className="mt-6">
            <label
              htmlFor="location"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Locacion:
            </label>
            <select
              className="shadow block appearance-none w-full  border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="location"
              id="location"
              onChange={(e) => handleLocacion(e)}
            >
              <option disabled>Seleccionar</option>

              {locations &&
                locations.map((location) => {
                  {
                    if (location.id_place === input.place) {
                      return (
                        <option
                          selected
                          value={location.name}
                          key={location.id_place}
                        >{`${location.id_place} - ${location.description}`}</option>
                      );
                    } else {
                      return (
                        <option
                          value={location.name}
                          key={location.id_place}
                        >{`${location.id_place} - ${location.description}`}</option>
                      );
                    }
                  }
                })}
            </select>
            {errors.place && <p className="text-red-500">{errors.place}</p>}
          </div>

          <div className="mt-6">
            <label
              htmlFor="category"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Categoria:
            </label>
            <select
              className="shadow block appearance-none w-full  border border-gray-200 text-gray-700 py-2 px-3 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              name="category"
              id="category"
              onChange={(e) => handleCategoria(e)}
            >
              <option disabled>Seleccionar</option>

              {categories.map((category) => {
                {
                  if (category.id_categ === input.categ) {
                    return (
                      <option
                        selected
                        value={category.name}
                        key={category.id_categ}
                      >{`${category.id_categ} - ${category.variety}->${category.type}->${category.degreeSugar}`}</option>
                    );
                  } else {
                    return (
                      <option
                        value={category.name}
                        key={category.id_categ}
                      >{`${category.id_categ} - ${category.variety}->${category.type}->${category.degreeSugar}`}</option>
                    );
                  }
                }
              })}
            </select>
            {errors.categ && <p className="text-red-500">{errors.categ}</p>}
          </div>

          <button
            className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={Object.keys(errors).length !== 0}
          >
            Grabar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Addvino;
