import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from 'react-router-dom';
import { FaShoppingCart ,FaRegHeart} from "react-icons/fa";
import { VscNotebook } from "react-icons/vsc"


function Profile() {
  const { user } = useAuth0()
  const navigate = useNavigate()  
  return (
    <div>


      {user &&

        <div className="bg-gray-200 font-sans h-screen w-full grid justify-center items-center ">
          <div className="card w-80 sm:w-[500px] mx-auto bg-white  shadow-xl hover:shadow mt-2 mb-0 ">
            <img className="w-32 mx-auto rounded-full -mt-20 border-8 border-white" src={user.picture} alt="" />
            <div className="text-center mt-2 text-md sm:text-2xl font-medium">{user.name}</div>
            <div className="text-center mt-2 font-light text-sm">{user.nickname}</div>

            <div class="px-6 text-center mt-2 font-light text-sm">
              <p>
                ID: {user.sub}
              </p>
            </div>
            <hr className="mt-8" />
            <div className="flex p-4 text-sm sm:text-md">
              <div className="w-1/3 text-center flex justify-center content-center hover:font-bold">
                <a href='/user/orders'>Mis Ordenes</a>
                <VscNotebook className="mt-1 mx-1 hidden sm:block" />

              </div>
              <div class="w-0 border border-gray-300">
              </div>
              <div className="w-1/3 text-center flex justify-center content-center hover:font-bold">
                <a href='/shoppingCart'>Mi Carrito</a>
                <FaShoppingCart className="mt-1 mx-1 hidden sm:block" />

              </div>
              <div className="w-0 border border-gray-300">
              </div>
              <div className="w-1/3 text-center flex justify-center content-center hover:font-bold">
                <a href='/user/listfavorite'>Mis Favoritos</a>
                <FaRegHeart className="mt-1 mx-1 hidden sm:block" />

              </div>
            </div>


          </div>
          <button
            class="m-0 bg-purple-400 px-20 py-5 text-sm shadow-sm font-semibold tracking-wider  text-purple-100 rounded-full hover:shadow-2xl hover:bg-purple-500 flex content-center justify-center"
            onClick={() => navigate(-1)}>
            Página Principal
          </button>

        </div>}



    </div>

  )
}

export default Profile