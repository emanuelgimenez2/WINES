/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/img-redundant-alt */

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { LogoutButton } from "../logout/logout";

export default function Avatar({ user }) {
  const { isLoading } = useAuth0();
  if (isLoading) {
    return <div>Loading...</div>;
  }


  return (
    <div className="flex -space-x-4  items-center  ">
      <a href="/profile">
      <div className="relative inline-block">
        <img
          className="inline-block object-cover w-12 h-12 rounded-full"
          src={user.picture }
          alt={user.name}
        />
        <span className="absolute bottom-0 right-0 inline-block w-3 h-3 bg-green-600 border-2 border-white rounded-full"></span>
      </div>
      </a>
      <LogoutButton />
    </div>
  );
}
