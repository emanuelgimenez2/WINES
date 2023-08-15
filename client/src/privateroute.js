import React from "react";

import { Route, useNavigate } from "react-router-dom";



const PrivateRoute = ({
  component: Component,
  exact = false,
  path,
  authenticated,
}) => {
  const navigate = useNavigate();
  return (
    <Route
      exact={exact}
      path={path}
      render={(props) =>
        authenticated ? <Component {...props} /> : /* navigate("/") */null
      }
    />
  );
};

export default PrivateRoute;
