/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { Fragment, useEffect, useState } from "react";
import NumberFormat from "react-number-format";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  AddShoppingCart,
  DeleteShoppingCartAll,
  DeleteShoppingCart,
  payment,
  GetShoppingCart,
} from "../../actions/action";
import logo from "../../assets/logo.png";
import { toast } from "react-toastify";



export default function ShoppingCart() {

  const [windowSize, setWindowSize] = useState();


  const navigate = useNavigate();
  const { shoppingCart } = useSelector((state) => state);
  const [listProduct, setListProduct] = useState({});
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  var pantalla = "PC"
  let localShoppingCart = JSON.parse(localStorage.getItem("shoppingCarts"));

  useEffect(() => {
    window.addEventListener("resize", () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    });
  }, [])

  if (!windowSize) {
    pantalla = "PC"
  } else {
    if (windowSize.width < 600) {
      pantalla = "Phone"
    } else {
      pantalla = "PC"
    }
  }

  useEffect(() => {
    const id_usuario = localStorage.getItem("user");
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    if (localShoppingCart && id_usuario) {
      dispatch(AddShoppingCart({ products: localShoppingCart, id_usuario }));
      if (!localShoppingCart) {
        dispatch(AddShoppingCart({ products: localShoppingCart }));
      }
    } else {
      if (id_usuario && !localShoppingCart) {
        dispatch(GetShoppingCart(id_usuario));
        localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCart));
      } else {
        dispatch(AddShoppingCart({ products: localShoppingCart }));
      }
    }
  }, [dispatch]);

  useEffect(() => {
    if (shoppingCart.length > 0) {
      let sum = 0;
      for (var i = 0; i < shoppingCart.length; i++) {
        sum += shoppingCart[i].product.price;
      }
      setTotal(sum);
    } else {
      setTotal(0);
    }
  }, [shoppingCart]);

  function handleCount(e, product) {


    let sum = 0;
    for (var i = 0; i < shoppingCart.length; i++) {
      if (product.id_prod_cart === shoppingCart[i].id_prod_cart) {
        shoppingCart[i].product.price =
        shoppingCart[i].product.price / shoppingCart[i].amount;
        shoppingCart[i].amount = e.value;
        shoppingCart[i].product.price = shoppingCart[i].product.price * e.value;
        sum += shoppingCart[i].product.price;
      } else {
        sum += shoppingCart[i].product.price;
      }
    }
    localStorage.setItem("shoppingCarts", JSON.stringify(shoppingCart));

    setTotal(sum);
  }

  function sumTotal() {
    let sum = 0;
    shoppingCart.forEach((e) => {
      sum += e.amount * e.product.price;
    });

    setTotal(sum); 
  }

  function clearCart(id_prod_cart) {
    const id_usuario = localStorage.getItem("user");
    if (!id_prod_cart) {
      localStorage.removeItem("shoppingCarts");
      if (id_usuario) {
        dispatch(DeleteShoppingCartAll(id_usuario));
      } else {
        dispatch(DeleteShoppingCartAll());
      }
    } else {
      const result = localShoppingCart.filter(
        (product) => product.id_prod_cart !== id_prod_cart
      );
      localStorage.setItem("shoppingCarts", JSON.stringify(result));
      setListProduct({
        ...listProduct,
        [id_prod_cart]: {
          amount: 0,
          subtotal: 0,
        },
      });
      sumTotal();
      if (id_usuario) {
        dispatch(DeleteShoppingCart({ id_usuario, id_prod_cart }));
      } else {
        dispatch(DeleteShoppingCart({ products: result }));
      }
    }
  }

  function createOrder() {
    const id_usuario = localStorage.getItem("user");
    if (id_usuario) {
      if (shoppingCart.length > 0) {
        const products = shoppingCart.map((product) => {
          return {
            name: product.product.name,
            price: product.product.price,
            product_id: product.id_prod_cart,
            quantity: parseInt(product.amount),
          };
        });
        dispatch(payment({ products: products, user_id: id_usuario, total: total }))
        .then(()=>{
          clearCart();
          toast.success('Orden Ingresada!')
          navigate("/user/orders");
        })
      } else {
        alert("Carrito Vacio");
      }
    } else {
      alert("Por favor debe logearse para realizar la compra");
    }
  }

 
  if (shoppingCart.length > 0) {
    if (pantalla !== "PC") {
     
      return (
        <div className="container mx-auto mt-10">
          <div className="container justify-center">
            <div className="flex shadow-md my-10 justify-center w-auto ">
              <div className="w-3/4 bg-white px-10 py-10">
                <div className="flex justify-between border-b pb-8">
                  <img src={logo} alt="logo" className="w-12 h-12" />
                  <h1 className="font-semibold text-2xl">Carrito de Compras</h1>
                  <img src={logo} alt="logo" className="w-12 h-12" />
                </div>
              </div>
            </div>
          </div>
          <div className="container mx-auto mt-10">
            <div className="container justify-center">
              <div className="flex shadow-md my-10 justify-center w-auto "></div>
              <div className="flex justify-center my-6">
                <div className="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5">
                  <div className="flex-1">
                    <table className="w-full text-sm lg:text-base" >
                      <thead>
                        <tr className="h-12 uppercase">
                          <th className="hidden md:table-cell"></th>
                          <th className="text-center">Producto</th>
                          <th className="lg:text-center text-left pl-5 lg:pl-0">
                            <span className="lg:hidden" title="Cantidad">Cant.</span>
                            <span className="hidden lg:inline">Cantidad</span>
                          </th>
                          <th className="hidden text-right md:table-cell">Precio</th>
                          <th className="text-right">Total</th>
                        </tr>
                      </thead>

                      <tbody>

                        {shoppingCart.length > 0 ? (
                          shoppingCart.map((product) => {
                            return (
                              <Fragment key={product.id_prod_cart}>
                                <tr>
                                  <td className="hidden pb-4 md:table-cell">
                                    <a href="#">
                                      <img src={'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSo5m6byX_gPMYQbehVup4TGdqTIsPD_5HQew&usqp=CAU'} alt={product.product.name} className="w-20 rounded" />
                                    </a>
                                  </td>
                                  <td>
                                    <a href="#">
                                      <p className="mb-2 md:ml-4">{product.product.name}</p>
                                    </a>
                                    <form action="" method="POST">
                                      <button type="submit" className="text-gray-700 md:ml-4" onClick={() => clearCart(product.id_prod_cart)} >
                                        <small>(Remove item)</small>
                                      </button>
                                    </form>
                                  </td>

                                  <td className=" text-right md:table-cell">

                                    <div className="relative flex flex-row w-full h-8">
                                      <input type="number"
                                        min="1"
                                        max="100" //<=== TODO aca va el stock
                                        value={product.amount}
                                        onChange={(e) => handleCount(e.target, product)}
                                        className="text-sm lg:text-base text-center  font-medium justify-center w-full font-semibold text-center text-gray-700 bg-gray-200 outline-none focus:outline-none hover:text-black focus:text-black" />

                                    </div>

                                  </td>
                                  <td className="hidden text-right md:table-cell">
                                    <span className="text-sm lg:text-base font-medium">
                                      <NumberFormat value={product.product.price / product.amount} displayType={'text'} thousandSeparator={true} prefix={'$ '} />
                                    </span>
                                  </td>
                                  <td className="text-right">
                                    <span className="text-sm lg:text-base font-medium">
                                      <NumberFormat value={product.product.price} displayType={'text'} thousandSeparator={true} prefix={'$ '} />
                                    </span>

                                  </td>

                                </tr>
                              </Fragment>
                            );
                          })
                        ) : (
                          <>
                            <h1 className="text-center text-gray-600 text-2xl justify-end ">
                              No hay productos
                            </h1>
                          </>
                        )}
                      </tbody>
                    </table>


                    <> </>

                  </div>
                </div>
              </div>
            </div>

            <div className="my-4 mt-6 -mx-2 lg:flex justify-center  border-b pb-8">

              <div className="lg:px-2 lg:w-1/2 justify-center  ">
                {/* <div className="p-4 bg-gray-100 rounded-full">
                <h1 className="ml-2 font-bold uppercase">Order Details</h1>
              </div> */}
                <div
                  id="summary"
                  className="w-100% px-8 py-10 border border-transparent rounded-md shadow-sm "
                >
                  <h1 className="font-semibold text-2xl border-b pb-8">
                    Resumen de Pedido
                  </h1>

                  <div className="p-4">
                    <div className="flex justify-between pt-4 border-b">
                      <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Items
                      </div>
                      <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                        {shoppingCart.length}
                      </div>
                    </div>

                    <div className="flex justify-between border-b">
                      <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Subtotal
                      </div>
                      <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                        <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$ '} />
                      </div>
                    </div>

                    <div className="flex justify-between pt-4 border-b">
                      <div className="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800">
                        Total
                      </div>
                      <div className="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900">
                        <NumberFormat value={total} displayType={'text'} thousandSeparator={true} prefix={'$ '} />
                      </div>
                    </div>
                    <div>
                      <button
                        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-700"
                        onClick={() => clearCart()}
                      >
                        Limpiar Carrito{" "}
                      </button>
                    </div>
                    <div className="border-t mt-8">
                      {/* <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                      <span>Total </span>
                      <span>
                        <NumberFormat
                          value={total}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$ "}
                        />
                      </span>
                    </div> */}
                      <div>
                        <button
                          className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-violet-500 hover:bg-indigo-700"
                          onClick={() => createOrder()}
                          disabled={!shoppingCart.length > 0}
                        >
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <>
                  <a
                    href="#"
                    className="flex font-semibold text-indigo-600 text-sm mt-10"
                    onClick={() => (window.location.href = "/")}
                  >&nbsp;&nbsp;&nbsp;&nbsp;
                    <svg
                      className="fill-current mr-2 text-indigo-600 w-5"
                      viewBox="0 0 448 512"
                    >
                      <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                    </svg>
                    Continuar Comprando
                  </a>
                </>
              </div>
            </div>
          </div>
        </div>
      )
    } else {
      
      return (
        <>
          <div className="bg-gray-100 px-10 py-10">
            <div className="container mx-auto mt-10">
              <div className="flex shadow-md my-10">
                <div className="w-3/4 bg-white px-10 py-10">
                  <div className="flex justify-between border-b pb-8">
                    <img src={logo} alt="logo" className="w-8" />
                    <h1 className="font-semibold text-2xl">Carrito de Compras</h1>
                    <h2 className="font-semibold text-2xl">
                      {shoppingCart.length} Productos
                    </h2>
                  </div>
                  <div className="flex mt-10 mb-5">
                    <h3 className="font-semibold text-gray-600 text-xs uppercase w-2/5">
                      Detalle de Producto
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                      Cantidad
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                      Precio
                    </h3>
                    <h3 className="font-semibold text-center text-gray-600 text-xs uppercase w-1/5 ">
                      Total
                    </h3>
                  </div>
                  {shoppingCart.length > 0 ? (
                    shoppingCart.map((product) => {
                      return (
                        <Fragment key={product.id_prod_cart}>
                          <div className="flex items-center hover:bg-gray-100 -mx-8 px-6 py-5">
                            <div className="flex w-2/5">
                              <div className="w-20">
                                <img
                                  className="h-24"
                                  src={product.product.image}
                                  alt={product.product.name}
                                />
                              </div>
                              <div className="flex flex-col justify-between ml-4 flex-grow">
                                <span className="font-bold text-sm">
                                  {product.product.name}
                                </span>
                                <a
                                  href="#"
                                  className="font-semibold hover:text-red-500 text-gray-500 text-xs"
                                  onClick={() => clearCart(product.id_prod_cart)}
                                >
                                  Quitar Producto
                                </a>
                              </div>
                            </div>
                            <div className="flex justify-center w-1/5">
                              <input
                                className="mx-2 border text-center w-12"
                                type="number"
                                min="1"
                                max="100" //<=== TODO aca va el stock
                                value={product.amount}
                                onChange={(e) => handleCount(e.target, product)}
                              />
                            </div>
                            <span className="text-center w-1/5 font-semibold text-sm">
                              <NumberFormat
                                value={product.product.price / product.amount}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$ "}
                              />
                            </span>
                            <span className="text-center w-1/5 font-semibold text-sm">
                              <NumberFormat
                                value={product.product.price}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"$ "}
                              />
                            </span>
                          </div>
                        </Fragment>
                      );
                    })
                  ) : (
                    <div className="flex justify-center">
                      <h1 className="text-center text-gray-600 text-2xl">
                        No hay productos
                      </h1>
                    </div>
                  )}
                  <> </>
                  <>
                    <a
                      href="#"
                      className="flex font-semibold text-indigo-600 text-sm mt-10"
                      onClick={() => (window.location.href = "/")}
                    >
                      <svg
                        className="fill-current mr-2 text-indigo-600 w-5"
                        viewBox="0 0 448 512"
                      >
                        <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
                      </svg>
                      Continuar Comprando
                    </a>
                  </>
                </div>
                <div
                  id="summary"
                  className="w-1/4 px-8 py-10 border border-transparent rounded-md shadow-sm "
                >
                  <h1 className="font-semibold text-2xl border-b pb-8">
                    Resumen de Pedido
                  </h1>
                  <div className="flex justify-between mt-10 mb-5">
                    <span className="font-semibold text-sm uppercase">
                      Productos {shoppingCart.length}
                    </span>
                    <span className="font-semibold text-sm">
                      {" "}
                      <NumberFormat
                        value={total}
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$ "}
                      />
                    </span>
                  </div>
                  <div>
                    <button
                      className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-red-500 hover:bg-red-700"
                      onClick={() => clearCart()}
                    >
                      Limpiar Carrito
                    </button>
                  </div>
                  <div className="border-t mt-8">
                    <div className="flex font-semibold justify-between py-6 text-sm uppercase">
                      <span>Total </span>
                      <span>
                        <NumberFormat
                          value={total}
                          displayType={"text"}
                          thousandSeparator={true}
                          prefix={"$ "}
                        />
                      </span>
                    </div>
                    <div>
                      <button
                        className="ml-8 whitespace-nowrap inline-flex items-center justify-center px-8 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-violet-500 hover:bg-indigo-700"
                        onClick={() => createOrder()}
                        disabled={!shoppingCart.length > 0}
                      >
                        Comprar
                      </button>
                    </div>
                  </div>
                  <> </>
                </div>
              </div>
            </div>
          </div>
        </>
      );
    }
  } else {
    if (localShoppingCart) {
      if (localShoppingCart.length === 0){
        window.location.href = "/"
      }
      return (
        <div>Cargando...</div>
        )
      } else {
        window.location.href = "/"
      }
  }
}
