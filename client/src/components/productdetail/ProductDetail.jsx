/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect ,useState} from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./productDetail.css";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, getReviewById, AddShoppingCart , addFavorite , deleteFavorite ,getFavorite} from "../../actions/action";
import { FaShoppingCart , FaRegHeart , FaHeart} from "react-icons/fa"
import { useAuth0 } from "@auth0/auth0-react";


function DetailsComponent() {

  const history = useNavigate();
  const dispatch = useDispatch()
  const { detailProduct, review , listFavorite} = useSelector(state => state)
  const { user, isAuthenticated } = useAuth0();
  const [fav,setFav]= useState(false);
  let usuario = localStorage.getItem('user');
  
  let { id } = useParams(); //traer el id del url

  useEffect(() => {
    dispatch(getProductDetail(id))
    dispatch(getReviewById(id))
    getFav();
  }, [dispatch, id]);

  useEffect(() => {
    headerFav()
  }, [listFavorite]);


  function AddtoCart(id) {
    const producto = {
      id_prod_cart: id,
      amount: 1,
      product: {
        name: detailProduct.name ? detailProduct.name : 'Nombre No Disponible',
        price: detailProduct.price ? detailProduct.price : 0,
        image:detailProduct.image,
      }
    };
    let shoppingCart = JSON.parse(localStorage.getItem('shoppingCarts'));
    if (!shoppingCart) {
      shoppingCart = [producto];
    } else {
      if (!shoppingCart.filter(prod => prod.id_prod_cart === id).length > 0) {
        shoppingCart.push(producto);
      }
    }
    localStorage.setItem('shoppingCarts', JSON.stringify(shoppingCart))
    if (isAuthenticated) {
      const id_usuario = user.sub;
      dispatch(AddShoppingCart({ id_usuario:id_usuario, products: shoppingCart }));
    } else {
      dispatch(AddShoppingCart({ products: shoppingCart }));
    }
  }

  function getFav(){
    if (usuario) {
      dispatch(getFavorite(usuario))
    }
  }
  
  function AddtoFav(id){
    if (usuario) {
      dispatch(addFavorite({id_usuario:usuario,id_prod:id}))
    }
  }

  function DeletetoFav(id){
    if (usuario) {
      dispatch(deleteFavorite({id_usuario:usuario,id_prod:id}))
    }
  }

  function headerFav(){
    let result = listFavorite.find(favorite => favorite.id_prod == id);
    if(result){
      setFav(true)
    }else{
      setFav(false)
    }
  }

  function createMarkup(xtext) {
    return { __html: xtext };
  }
  var precios = detailProduct.price / ((100-detailProduct.descuento) /100)
  return detailProduct ? (
    <div className="inline-flex ">
      <nav aria-label="Breadcrumb" className="m-0">
        <ol
          className="max-w-2xl mx-auto px-4 flex items-center space-x-2 sm:px-6 lg:max-w-7xl lg:px-8"
        ></ol>
      </nav>

      <div className="mt-10 max-w-2xl mx-auto sm:px-6 lg:max-w-7xl lg:gap-x-4">
        <div className="hidden aspect-w-3 aspect-h-4 rounded-lg overflow-hidden lg:block">
          <img
            src={detailProduct.image}
            alt={detailProduct.name}
            className="w-[450px] h-full object-center object-cover"
          ></img>
        </div>
      </div>

      <div className="max-w-2xl mx-auto pt-10 pb-16 px-4 sm:px-6 lg:max-w-7xl lg:pt-16 lg:pb-24 lg:px-8 lg:grid lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8">
        <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <h1 className="font-extrabold tracking-tight text-gray-900 sm:text-3xl">
            {detailProduct.name}
          </h1>
        </div>

        <div className="mt-4 lg:mt-0 lg:row-span-3">
          <h2 className="sr-only">Precio: $</h2>
          {detailProduct.descuento > 0 ? (
            <div>
             <p className="text-base text-gray-600 font-bold">Precio
             <span className="line-through opacity-50"> ${Math.floor(precios)}</span>&nbsp;
             <span className="text-base text-blue-600 font-bold">${detailProduct.price } Dscto.{detailProduct.descuento}%</span>
             </p>
             </div>
          ) : 
            <p className="text-3xl text-gray-900">${detailProduct.price}</p>
          }

          <div className="mt-6">
            <h3 className="sr-only">Reseñas</h3>
            <div className="flex items-center">
              <div className="flex items-center">

                <a className={BrightStar(1, review.avg)} href='#/'>⭐</a>
                <a className={BrightStar(2, review.avg)} href='#/'>⭐</a>
                <a className={BrightStar(3, review.avg)} href='#/'>⭐</a>
                <a className={BrightStar(4, review.avg)} href='#/'>⭐</a>
                <a className={BrightStar(5, review.avg)} href='#/'>⭐</a>
              </div>
              <p className="sr-only">4 out of 5 stars</p>
              <a
                href="#/"
                className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                {review.count} Reseñas
              </a>
            </div>
          </div>
          <span
            className="absolute -inset-px rounded-md pointer-events-none"
            aria-hidden="true"
          ></span>
          {usuario && 
            <button
              type="submit"
              className="mt-10 w-full bg-indigo-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={() => {
                if(fav === true){
                  DeletetoFav(id)
                }else{
                  AddtoFav(id)
                }
              }}
            >
              {fav === true ? <FaHeart className="mx-2 text-base" /> : <FaRegHeart className="mx-2 text-base" />}
            </button>
          }
          <button
            type="submit"
            className="mt-10 w-full bg-indigo-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => AddtoCart(id)}
          >
            Agregar al Carrito
            <FaShoppingCart className="mx-2 text-base" />
          </button>
          <button
            onClick={() => {
              history(`/review/${id}`);
            }}
            className="mt-6 w-full bg-indigo-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
            Ver Reseñas
          </button>
          <button
            className="mt-6 w-full bg-indigo-500 border border-transparent rounded-md py-3 px-8 flex items-center justify-center text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={() => (window.location.href = '/')}>
            Página Principal
          </button>

        </div>

        <div className="py-4 lg:pt-6 lg:pb-2 lg:col-start-1 lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
          <div className="">
            <div>
              <h3 className="sr-only">Descripcion:</h3>

              <div className="space-y-6">
                <p
                  className="text-base text-gray-900"
                  dangerouslySetInnerHTML={createMarkup(detailProduct.summary)}
                />
              </div>
            </div>

            <hr className="mt-4" />

            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900">Caracteristicas</h3>

              <div className="mt-2">
                <ul className="pl-4 list-disc text-sm space-y-2">
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      Variedad: {detailProduct.category && detailProduct.category.variety}
                    </span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      Tipo: {detailProduct.category && detailProduct.category.type}
                    </span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      Degree Sugar: {detailProduct.category && detailProduct.category.degreeSugar}
                    </span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      Origen: {detailProduct.location && detailProduct.location.description}
                    </span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      Productor: {detailProduct.productor && detailProduct.productor.description}
                    </span>
                  </li>
                  <li className="text-gray-400">
                    <span className="text-gray-600">
                      Grad. Alcoholica: {detailProduct.alcohol}
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="mt-4 inline-flex">
              <h2 className="text-sm font-medium text-gray-900">Stock:</h2>

              <div className="px-2 space-y-6">
                <p className="text-sm text-gray-600">
                  {detailProduct.product_state && detailProduct.product_state.description}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

function BrightStar(id, level) {
  if (id <= Math.floor(level)) {
    return "starOn"
  } else {
    return "starOff"
  }
}
export default DetailsComponent;
