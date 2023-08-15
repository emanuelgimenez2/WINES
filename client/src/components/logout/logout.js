/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

export const LogoutButton = () => {
  const { logout } = useAuth0();

  return (
    <div className="flex -space-x-4  items-center ">
      <a
        onClick={() => {
          localStorage.removeItem("user");
          localStorage.removeItem("role");
          localStorage.removeItem("email");
          logout({ returnTo: window.location.origin });
        }}
        href="#"
        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-violet-500 hover:bg-indigo-700"
      >
        Salir
      </a>
    </div>
  );
};
