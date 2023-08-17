import React, { useEffect, useState } from "react";
import DetailsComponent from "../components/productdetail/ProductDetail";
import ShoppingCart from "../components/shoppingCart/shoppingCar";
import ShoppingData from "../components/shoppingCart/shoppingData";

import Home from "../pages/home";

import Review from "../../src/components/review/review";
import Profile from "../../src/components/profile/Profile.jsx";
import Error from "../components/patherror/patherror";
import OrderDetail from "../pages/user/orderDetail";
import OrderDetailAdmin from "../pages/user/orderDetailAdmin";
import Contact from "../components/footer/contact";

import UserOrders from "../pages/user/orders";
import DatosEnvio from "../pages/user/datosEnvio";
import CompraRealizada from "../pages/user/CompraRealizada";
import ListFavorites from "../pages/user/listFavorite.jsx";
import About from "../components/about/about";

import { useAuth0 } from "@auth0/auth0-react";

import { getUserById } from "../actions/action";
import { useDispatch } from "react-redux";

//import ListDescuentos from "../pages/admin/listDescuentos";
const msj = "Ud. debe tener ser administrador para acceder a esta página";


function HandleRoutes() {
  const { user } = useAuth0();
  const dispatch = useDispatch();
  const [userRole, setUserRole] = useState(false);

  const id = user && user.sub;

  const handleSearchForUserRoleApi = async () => {
    let res = await dispatch(getUserById(id));

    res.role && setUserRole(res.role);
  };

  useEffect(() => {
    id && handleSearchForUserRoleApi();
  }, [id]);


  const routes = [
    {
      path: "/",
      element: <Home />,
      exact: true,
      private: false,
    },
    {
      path: "/shoppingCart",
      element: <ShoppingCart />,

      exact: true,
      private: false,
    },
    {
      path: "/detail/:id",
      element: <DetailsComponent />,
      exact: true,
      private: true,
    },
    {
      path: "/contact",
      element: <Contact />,
      exact: true,
      private: true,
    },    
    
    {
      path: "/review/:id",
      element: <Review />,
      exact: true,
      private: true,
    },     
   
    {
      path: "/user/orders",
      element: <UserOrders />,
      exact: true,
      private: true,
    },
    {
      path: "/user/orderDetail/",
      element: <OrderDetail />,
      exact: true,
      private: true,
    },
    {
      path: "/user/orderDetailAdmin/",
      element: <OrderDetailAdmin />,
      exact: true,
      private: true,
    },
    {
      path: "/profile",
      element: <Profile />,
      exact: true,
      private: true,
    },
    {
      path: "/error",
      element: <Error msj={msj} />,
      exact: true,
      private: true,
    },
    {
      path: "/user/comprarealizada",
      element: <CompraRealizada />,
    },
    {
      path: "/user/address/:id",
      element: <DatosEnvio />,
    },
    {
      path: "/user/listfavorite",
      element: <ListFavorites />
    },
  
    {
      path: "/shoppingData",
      element: <ShoppingData />,
      exact: true,
      private: false,
    },
    {
      path: "/about",
      element: <About />,
      exact: true,
      private: false,
    },
  ];
  return routes;
  
}
export default HandleRoutes;
