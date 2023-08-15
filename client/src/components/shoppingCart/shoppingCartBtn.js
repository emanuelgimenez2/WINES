/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect , useState} from "react";
import {  useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { AddShoppingCart , GetShoppingCart } from "../../actions/action";
import { useAuth0 } from "@auth0/auth0-react";

export default function ShoppingCartBtn() {
  const { shoppingCart } = useSelector((state) => state);
  const [totalProductCart,setTotalProductCart] = useState(shoppingCart.length)
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const localShoppingCart = JSON.parse(localStorage.getItem('shoppingCarts'));
  const { user, isAuthenticated } = useAuth0();
    
  // useEffect(()=>{
  //   let id_usuario = '';
  //   if(isAuthenticated){
  //     id_usuario = user.sub;
  //   }
  //   if(localShoppingCart && isAuthenticated){
  //     dispatch(AddShoppingCart({products:localShoppingCart,id_usuario:id_usuario}))
  //   }else{
  //     if(isAuthenticated && !localShoppingCart){
  //       dispatch(GetShoppingCart(id_usuario))
  //       localStorage.setItem('shoppingCarts',JSON.stringify(shoppingCart))
  //     }else{
  //       dispatch(AddShoppingCart({products:localShoppingCart}))
  //     }
  //   }
  // },[dispatch]);

  useEffect(()=>{
    setTotalProductCart(localShoppingCart ? localShoppingCart.length : 0)
  },[shoppingCart]);

  return (
    <>
      <div
         className="font-sans block mt-4 lg:inline-block lg:mt-0 lg:ml-6 align-middle text-black hover:text-gray-700">
            <a  href="/shoppingCart" role="button" className="relative center">
                <svg className="flex-1 w-8 h-8 fill-current" viewBox="0 0 24 24">
                    <path d="M17,18C15.89,18 15,18.89 15,20A2,2 0 0,0 17,22A2,2 0 0,0 19,20C19,18.89 18.1,18 17,18M1,2V4H3L6.6,11.59L5.24,14.04C5.09,14.32 5,14.65 5,15A2,2 0 0,0 7,17H19V15H7.42A0.25,0.25 0 0,1 7.17,14.75C7.17,14.7 7.18,14.66 7.2,14.63L8.1,13H15.55C16.3,13 16.96,12.58 17.3,11.97L20.88,5.5C20.95,5.34 21,5.17 21,5A1,1 0 0,0 20,4H5.21L4.27,2M7,18C5.89,18 5,18.89 5,20A2,2 0 0,0 7,22A2,2 0 0,0 9,20C9,18.89 8.1,18 7,18Z"/>
                </svg>
                <span className="absolute right-0 top-0 rounded-full bg-red-600 w-4 h-4 top right p-0 m-0 text-white font-mono text-sm  leading-tight text-center">
                    {totalProductCart}
                </span>
            </a>
       
      </div>
    </>
  );
}
