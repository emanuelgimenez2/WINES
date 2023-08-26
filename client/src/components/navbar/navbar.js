import React, { useEffect, useState } from "react";
import Search from "../search/search";
import { useAuth0 } from "@auth0/auth0-react";
import logo from "../../assets/logo.png";
import ShoppingCartBtn from "../shoppingCart/shoppingCartBtn";
import Avatar from "../avatar/avatar";
import { useDispatch } from "react-redux";
import { AddUser, getUserById } from "../../actions/action";
import jwt_decode from "jwt-decode";
import ReturnUserLoged from "../../navigation/returnUserLoged";

export default function Navbar() {
  const { loginWithRedirect } = useAuth0();
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [data, setData] = useState(false);
  const { getAccessTokenSilently } = useAuth0();
  const [userRole, setUserRole] = useState(false); 
  const id = user && user.sub;

  async function loadertoken() {
    await getAccessTokenSilently().then((res) => {
      var decoded = jwt_decode(res);
      setData(decoded);
    });
  }

  useEffect(() => {
    loadertoken();
  }, [getAccessTokenSilently]);

  return (
    <div className="bg-blue-500" id="navbar">
      <nav className="relative px-4 py-4 flex justify-between items-center bg-white">
        <span className="sr-only">Workflow</span>
        <img className="h-8 w-auto sm:h-20 m-0" src={logo} alt="" />

        <div className="lg:hidden">
          <ShoppingCartBtn />
        </div>
        <section className="MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)}
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}>
            <div
              className="absolute top-0 right-0 px-8 py-8"
              onClick={() => setIsNavOpen(false)}
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>

            <ul className="flex flex-col items-center justify-between min-h-[250px]">
              <li className="border-b border-gray-400 my-8 uppercase">
                <Search />
              </li>
              <li className="border-b border-gray-400 my-8 uppercase">
                {!isAuthenticated ? (
                  <button
                    className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-violet-500 hover:bg-indigo-700"
                    href="#"
                    onClick={() => loginWithRedirect()}
                  >
                    Sign in
                  </button>
                ) : (
                  <Avatar user={user} />
                )}
                <div>
                  {isAuthenticated && data
                    ? dispatch(
                        AddUser({
                          id: user.sub,
                          full_name: user.nickname,
                          email: user.email,
                          role:
                            data &&
                            data["https://my-domain.com/roles"][0] === "Admin"
                              ? "Admin"
                              : "user",
                        })
                      )
                    : null}
                </div>
              </li>
            </ul>
          </div>
        </section>

        <ul className="hidden absolute top-1/2 left-1/2 transform -translate-y-1/2 -translate-x-1/2 lg:flex lg:mx-auto lg:flex lg:items-center lg:w-auto lg:space-x-6">
       
          <li>
            <Search />
          </li>
          <li className="text-gray-300">
         
          </li>
          <div className="hidden md:flex">
            <ShoppingCartBtn />
          </div>
        </ul>
        {/* <div className="hidden lg:flex lg:items-center lg:w-auto lg:space-x-6">
          {!isAuthenticated ? (
            <button
              onClick={() => loginWithRedirect()}
              className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-violet-500 hover:bg-indigo-700"
              href="#"
            >
              Sign up
            </button>
          ) : (
            <Avatar user={user} />
          )}

          {isAuthenticated && data
            ? dispatch(
                AddUser({
                  id: user.sub,
                  full_name: user.nickname,
                  email: user.email,
                  role:
                    data && data["https://my-domain.com/roles"][0] === "Admin"
                      ? "Admin"
                      : "user",
                })
              )
            : null}
        </div> */}
      </nav>
      <style>{`
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
    `}</style>
    </div>
  );
}
