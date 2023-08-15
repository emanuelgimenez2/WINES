import { React , Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getFavorite , deleteFavorite} from "../../actions/action";
import { Link } from "react-router-dom";

export default function ListFavorites() {
    const { listFavorite } = useSelector(state => state);
    const id_usuario = localStorage.getItem("user");
    const dispatch = useDispatch();

    useEffect(()=>{ 
        dispatch(getFavorite(id_usuario))
    },[dispatch]);

    function DeletetoFav(id){
        if (id_usuario) {
            dispatch(deleteFavorite({id_usuario:id_usuario,id_prod:id}))
        }
    }
    
    return (
        <div>
            <div className="px-10 py-10">
                <div className="w-4/4 bg-white px-10 py-10">
                    <div className="flex justify-between border-b pb-8">
                        <h1 className="font-semibold text-2xl">Lista Favoritos</h1>
                    </div>
                    <div className="flex mt-10 mb-5">
                        <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">Producto/s</h3>
                    </div>    
            {listFavorite && listFavorite.map(x => {
                return(
                    <Fragment key={x.id_prod_cart}>
                          <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                            <div className="flex w-2/5">
                              <div className="w-20">
                                <img
                                  className="h-24"
                                  src={x.product.image}
                                  alt={x.product.name}
                                />
                              </div>
                              <div className="flex flex-col justify-between ml-4 flex-grow">
                                <span className="font-bold text-sm">
                                  {x.product.name}
                                </span>
                                <a
                                  href={`/detail/${x.id_prod}`}
                                  className="font-semibold hover:text-blue-500 text-gray-500 text-xs"
                                  onClick={() => {}}
                                >
                                  Ver Detalle
                                </a>
                                <a
                                  href="#"
                                  className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                                  onClick={() => {DeletetoFav(x.id_prod)}}
                                >
                                  Quitar Producto
                                </a>
                              </div>
                            </div>
                          </div>
                        </Fragment>
                )
            })}
            </div>
            </div>
        </div>
    );
}

