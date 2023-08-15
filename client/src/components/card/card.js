/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FaShoppingCart } from "react-icons/fa";
import { AddShoppingCart } from "../../actions/action";
import { useAuth0 } from "@auth0/auth0-react";
import { Link } from "react-scroll";

function Card({ id, name, image, price, summary, descuento }) {
  const history = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useAuth0();

  function AddtoCart(id) {
    const producto = {
      id_prod_cart: id,
      amount: 1,
      product: {
        name: name ? name : "Nombre No Disponible",
        price: price ? price * (1 - descuento / 100) : 0,
        descuento: descuento ? descuento : 0,
        image: image,
      },
    };
    let shoppingCart = JSON.parse(localStorage.getItem("shoppingCarts"));
    if (!shoppingCart) {
      shoppingCart = [producto];
    } else {
      if (!shoppingCart.filter((prod) => prod.id_prod_cart === id).length > 0) {
        shoppingCart.push(producto);
      }
    }
    localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCart));
    if (isAuthenticated) {
      const id_usuario = user.sub;
      dispatch(AddShoppingCart({ id_usuario, products: shoppingCart }));
    } else {
      dispatch(AddShoppingCart({ products: shoppingCart }));
    }
  }
  var precios = price / ((100 - descuento) / 100);
  return (
    <div className="flex justify-center scroll-smooth">
      <div className="w-80 p-2 rounded-xl transform transition-all hover:-translate-y-2 duration-300 shadow-lg hover:shadow-2xl">
        <img
          className="h-50 object-cover rounded-xl border border-violet-300"
          src={
            image
              ? image
              : "https://www.cocinayvino.com/wp-content/uploads/2020/02/Vino-e1582312813825.jpg"
          }
          alt=""
        />
        <div className="">
          <h2 className="font-normal m-2"> {name} </h2>
        </div>

        <div className="flex justify-center">
          {descuento > 0 ? (
            <div>
              <p className="text-base text-gray-600 font-bold">
                Precio
                <span className="line-through text-red-600 opacity-50">
                  {Math.floor(precios)}
                </span>
                &nbsp;
                <span className="text-base text-blue-600 font-bold">
                  ${price} Dto.{descuento}%
                </span>
              </p>
            </div>
          ) : (
            <p className="text-base text-gray-600 font-bold">Precio ${price}</p>
          )}
        </div>

        <div className="m-2 flex row gap-5 justify-center">
          <a
            role="button"
            className="border border-violet-700 px-4 py-1 rounded-md hover:bg-violet-700 hover:text-white flex justify-center"
            onClick={() => {
              history(`/detail/${id}`);
            }}
          >
            Ver Detalle
          </a>
          <div className="flex content-center">
            <Link
              to="navbar"
              spy={true}
              smooth={true}
              offset={-100}
              duration={1000}
              onClick={() => AddtoCart(id)}
              className="text-white bg-violet-500 px-4 py-1 rounded-md hover:bg-violet-900 flex justify-center content-center cursor-pointer"
            >
              
              <FaShoppingCart className="mt-1 mx-1" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
