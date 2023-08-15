/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { postReview, getUserOrders } from "../../actions/action";
import axios from "axios";
import "./review.css";

export function validate(input) {
  let errors = {};
  if (!input.description) {
    errors.description = "Por favor ingrese si review!";
  }
  return errors;
}

function GetReviews() {
  const id_usuario = localStorage.getItem("user");
  var muestroDatos = "SI";
  const url = "https://back-pgvinos.herokuapp.com";

  // const url = "http://localhost:3001"
  const [errors, setErrors] = useState({});
  const [review, Setreview] = useState(null);
  const [prod, Setprod] = useState(null);
  const [actReview, SetactReview] = useState(false);
  const [starValue, SetStareValue] = useState(0);
  const dispatch = useDispatch();
  const { ordersUser } = useSelector((state) => state);

  let id = useParams(); //traer el id del url

  const selStars = document.querySelectorAll(".stars a");
  // Manejo de las Estrellas
  selStars.forEach((star, clickedIdx) => {
    star.addEventListener("click", () => {
      SetStareValue(clickedIdx + 1);
      console.log(`star ${clickedIdx + 1}`);
    });
  });

  useEffect(() => {
    GetData(id.id);
    const id_usuario = localStorage.getItem("user");
    dispatch(getUserOrders(id_usuario));
  }, [id]);

  if (ordersUser && !actReview) {
    for (var i = 0; i < ordersUser.length; i++) {
      var element = ordersUser[i];
      for (var z = 0; z < element.order_items.length; z++) {
        var produ = element.order_items[z].product_id;

        if (produ === id.id) {
          SetactReview(true);
          break;
        }
      }
    }
  }

  const [input, setInput] = useState({
    id: 0,
    id_prod: "",
    id_user: "",
    star: "",
    description: "",
  });

  if (review && input.id_prod === "") {
    setInput({
      ...input,
      id: review.id,
      id_prod: review.id_prod,
      id_user: review.id_user,
      description: review.description,
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
  const handleDelete = (id, id_prod) => {
    DeleteData(id, id_prod);
  };

  async function GetData(id) {
    await axios
      .get(`${url}/review/${id}`)
      .then((detailreview) => {
        Setreview(detailreview);
      })
      .catch((error) => {
        console.log(error + " error al obtener el review");
      });
    await axios
      .get(`${url}/products/detail/${id}`)
      .then((detailProduct) => {
        Setprod(detailProduct.data[0]);
      })
      .catch((error) => {
        console.log(error + "error al obtener el producto");
      });
  }
  // Deletes and resfresh screen
  async function DeleteData(id, id_prod) {
    await axios
      .delete(`${url}/review?id=${id}`)
      .then((response) => {
        return "deleted";
      })
      .catch((err) => {
        console.log(err);
      });

    await axios
      .get(`${url}/review/${id_prod}`)
      .then((detailreview) => {
        Setreview(detailreview);
      })
      .catch((error) => {
        console.log(error + " error al obtener el review");
      });
    await axios
      .get(`${url}/products/detail/${id_prod}`)
      .then((detailProduct) => {
        Setprod(detailProduct.data[0]);
      })
      .catch((error) => {
        console.log(error + "error al obtener el producto");
      });
  }
  const handleSubmit = () => {
    if (input.description !== "" && starValue > 0) {
      dispatch(postReview(id.id, id_usuario, input.description, starValue));
      // alert('Review agregado con exito!')

      axios
        .get(`${url}/review/${id.id}`)
        .then((detailreview) => {
          Setreview(detailreview);
        })
        .catch((error) => {
          console.log(error + "error al obtener el Review");
        });
      input.description = "";
      SetStareValue(0);
    } else {
      alert("No puede enviar el formulario vacio!");
    }
  };

  if (review && prod) {
    if (review.data.message === "No pude acceder a Review") {
      muestroDatos = "NO";
    }
    return (
      <>
        {/* <div className="bg-violet-500 mx-auto">
                    <h1 className="p-2 text-center text-lg ">Reviews</h1>
                </div> */}
        <div className="flex">
          <div className="w-[400px] m-5">
            <img className="imagen" src={prod.image} alt={prod.name}></img>
          </div>
          <div className="w-[900px]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-gray-700 uppercase bg-gray-200 dark:bg-gray-700 dark:text-gray-400 m-10">
                <tr>
                  <th scope="col" className="py-3 px-6 text-sm columns-4">
                    Descripcion
                  </th>
                  <th scope="col" className="py-3 px-6 text-sm">
                    Stars
                  </th>
                  <th scope="col" className="py-3 px-6 text-sm">
                    Opciones
                  </th>
                </tr>
              </thead>
              {muestroDatos === "SI" ? (
                <tbody>
                  {review.data.map((datos) => {
                    return (
                      <tr
                        key={datos.id}
                        className="bg-white border-b dark:bg-gray-900 dark:border-gray-700 m-10 p-5"
                      >
                        <td className="p-3">{datos.description}</td>
                        <td className="inline-flex p-3 mx-4">
                          <p className={BrightStar(1, datos.stars)}>⭐</p>
                          <p className={BrightStar(2, datos.stars)}>⭐</p>
                          <p className={BrightStar(3, datos.stars)}>⭐</p>
                          <p className={BrightStar(4, datos.stars)}>⭐</p>
                          <p className={BrightStar(5, datos.stars)}>⭐</p>
                        </td>
                        {datos.id_user === id_usuario ? (
                          <td
                            className="p-3 cursor-pointer"
                            onClick={() =>
                              handleDelete(datos.id, datos.id_prod)
                            }
                          >
                            ⛔ Eliminar
                          </td>
                        ) : (
                          <td></td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              ) : null}
            </table>
            <br />
            {actReview === true ? (
              <>
                <div className="mt-5">
                  <p>
                    <b>Ingrese su Review:</b>
                  </p>
                </div>
                <div className="mb-4">
                  <textarea
                    id="description"
                    name="description"
                    cols="30"
                    rows="3"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    value={input.description}
                    onChange={handleChange}
                  ></textarea>
                  {errors.description && (
                    <p className="text-red-500">{errors.description}</p>
                  )}
                </div>

                <div className="stars">
                  <b>Calificacion:</b>&nbsp;
                  <div className="">
                    <a onClick={() => handleSubmit()} href="#/">
                      ⭐
                    </a>
                    <a onClick={() => handleSubmit()} href="#/">
                      ⭐
                    </a>
                    <a onClick={() => handleSubmit()} href="#/">
                      ⭐
                    </a>
                    <a onClick={() => handleSubmit()} href="#/">
                      ⭐
                    </a>
                    <a onClick={() => handleSubmit()} href="#/">
                      ⭐
                    </a>
                  </div>
                </div>
              </>
            ) : null}

            <div className="divBoton">
              {/* <button className='bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline'
                                onClick={() => handleSubmit()}
                                disabled={Object.keys(errors).length !== 0}>Grabar
                            </button>
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; */}
              <button
                className="bg-violet-500 hover:bg-violet-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline align-right"
                onClick={() => (window.location.href = "/")}
              >
                Página Principal
              </button>
            </div>
          </div>
        </div>
      </>
    );
  } else {
    return <div>Cargando...</div>;
  }
}

function BrightStar(id, level) {
  if (id <= Math.floor(level)) {
    return "starOn";
  } else {
    return "starOff";
  }
}

export default GetReviews;
