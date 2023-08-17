import axios from "axios";

import {
  GET_PRODUCTS,
  GET_FILTER_PRODUCT_NAME,
  GET_CATEGORY, 
  GET_FILTER_PRODUCT_OFFER,
  GET_PRODUCT_DETAIL,
  GET_PRODUCER,
  GET_LOCATION,
  GET_CATEGORIES,
  GET_STARS,
  GET_REVIEW,
  SHOPPING_CART,
  GET_ORDERS_USER,
  DEL_PRODUCTS,
  ACT_STOCK,
  DEL_ADMIN,
  GET_USER,
  GET_DESCUENTOS,
  GET_FAVORITE,
  GET_ROL,
} from "./constant";

//const url = "https://back-pgvinos.herokuapp.com";

const url = "http://localhost:3001" 

export function addStock(id,suma) {
  return async function (dispatch) {
      var review = await axios.put(`${url}/stock/?id=${id}&suma=${suma}`);
      return dispatch({
          type: ACT_STOCK,
          payload: review.data
      })
  }
}

export function getReview(id) {
  return async function (dispatch) {
      var review = await axios.get(`/recipes/detail/${id}`);
      return dispatch({
          type: GET_REVIEW,
          payload: review.data
      })
  }
}


export function getReviewById(id) {
  return async function (dispatch) {
    var review = await axios.get(`${url}/review/stars/${id}`)
    return dispatch({ 
      type: GET_REVIEW, 
      payload: review.data[0]
      })
  } 
}
export function postReview(prod,user,desc,star) {
  return function (dispatch) {
    axios.post(`${url}/review?id_prod=${prod}&id_user=${user}&description=${desc}&stars=${star}`)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}

// End Reviews

// Baja logica del Producto
export function delProducto(id) {
 
  return async function (dispatch) {
    await axios.put(`${url}/products/del/${id}`)
      .then((product) => {
        dispatch({ type: DEL_PRODUCTS, payload: product.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getProducto() {
  return function (dispatch) {
    axios
      .get(`${url}/products`)
      .then((product) => {
        dispatch({ type: GET_PRODUCTS, payload: product.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getProductoAll() {

  return function (dispatch) {
    axios
      .get(`${url}/products/all`)
      .then((product) => {
        dispatch({ type: GET_PRODUCTS, payload: product.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function getStars(id) {
  return function (dispatch) {
    axios
      .get(`${url}/review/stars/id_prod=${id}`)
      .then((review) => {
        dispatch({ type: GET_STARS, payload: review.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function filterProductoName(name) {
  const data = name ? name : "";
  return async function (dispatch) {
    axios
      .get(`${url}/products?name=${data}`)
      .then((data) => {
        dispatch({ type: GET_FILTER_PRODUCT_NAME, payload: data.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function Category() {
  return async function (dispatch) {
    axios
      .get(`${url}/filters`)
      .then((res) => {
        dispatch({ type: GET_CATEGORY, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}
export function filterProductoCategory(data) {
  return async function (dispatch) {
    axios
      .post(`${url}/filters/product`, data)
      .then((res) => {
        
        dispatch({ type: GET_PRODUCTS, payload: res.data });
      })
      .catch((err) => {
        console.log(err);
      });
  };
}

export function filterProductOffer(payload) {
  var response = axios.get(url + "/productos/offer/" + payload);
  return async function (dispatch) {
    try {
      return dispatch({
        type: GET_FILTER_PRODUCT_OFFER,
        payload: response,
      });
    } catch (error) {
      alert("error, no se pudo encontrar las ofertas");
    }
  };
}

export function getProductDetail(id) {
  return function (dispatch) {
   axios.get(`${url}/products/detail/${id}`)
   .then(detailProduct => {
    dispatch({
       type: GET_PRODUCT_DETAIL,
       payload: detailProduct.data[0]
     })
   })
    .catch (error => {
     console.log(error + "error al obtener el producto")
   })
 }
 }

export function getProducer() {
  return function (dispatch) {
    axios.get(`${url}/productor`)
      .then(productor => {
        dispatch({ type: GET_PRODUCER, payload: productor.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function getlocation() {
  return function (dispatch) {
    axios.get(`${url}/location`)
      .then(productor => {
        dispatch({ type: GET_LOCATION, payload: productor.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function getCategories() {
  return function (dispatch) {
    axios.get(`${url}/category`)
      .then(category => {
        dispatch({ type: GET_CATEGORIES, payload: category.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export function getDescuento() {
  return function (dispatch) {
    axios.get(`${url}/descuentos`)
      .then(category => {
        dispatch({ type: GET_DESCUENTOS, payload: category.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}
// Borra registros de los campos auxiliares de Administracion
export function delAdmin(id,tabla,campo,campoProd) {
 
  return function (dispatch) {
    axios.delete(`${url}/admin?id=${id}&tabla=${tabla}&campo=${campo}&campoProd=${campoProd}`)
      .then(data => {
        dispatch({ type: DEL_ADMIN, payload: data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}



export function AddProduct(product) {
  return function (dispatch) {
    axios.post(`${url}/products`, product)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function AddProductUpd(product) {
  
  return function (dispatch) {
    axios.put(`${url}/products`, product)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}


export function AddLocacion(location) {
  return function (dispatch) {
    axios.post(`${url}/location`, location)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function UpdateLocacion(location) {
  return function (dispatch) {
    axios.put(`${url}/location`, location)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export function AddDescuento(descto) {
  return function (dispatch) {
    axios.post(`${url}/descuento`, descto)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}
export function AddBodega(productor) {
  return function (dispatch) {
    axios.post(`${url}/productor`, productor)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function UpdateBodega(productor) {
  return function (dispatch) {
    axios.put(`${url}/productor`, productor)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function AddCategoria(category) {
  return function (dispatch) {
    axios.post(`${url}/category`, category)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function UpdateCategoria(category) {
  return function (dispatch) {
    axios.put(`${url}/category`, category)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function AddShoppingCart(data) {
  const {id_usuario, products} = data;
  console.log('data: ', data);
  if(id_usuario){
    return async function (dispatch) {
      await axios.post(`${url}/shoppingCart`, data)
        .then(response => {
          //dispatch( { type: SHOPPING_CART, payload: response }) Se Puede mandar mensaje de confirmacion 
        })
        .catch(err => {
          console.log(err,' Data:',data)
        });
      dispatch(GetShoppingCart(id_usuario));
    }
  }
  return { type: SHOPPING_CART, payload: products ? products : [] }
}
 
export function GetShoppingCart(id_usuario) {
  return function (dispatch) {
    axios.get(`${url}/shoppingCart?id_usuario=${id_usuario}`)
      .then(response => {
        dispatch({ type: SHOPPING_CART, payload: response.data })
      })
      .catch(err => {

        dispatch({ type: SHOPPING_CART, payload: [] })
        console.log('GetShoppingCart',err)
      })
  }
}

export function DeleteShoppingCartAll(id_usuario) {
  if(id_usuario){
    return function (dispatch) {
      axios.delete(`${url}/shoppingCart/deleteAll`,{data:{id_usuario}})
      .then(response => {
        dispatch({ type: SHOPPING_CART, payload: [] }) // se puede mandar el mensaje que da la api 
      })
      .catch(err => {
        dispatch({ type: SHOPPING_CART, payload: [] })
        // console.log(err)
      })
    }
  }
  return { type: SHOPPING_CART, payload: [] }
}

export function DeleteShoppingCart({id_usuario,id_prod_cart,products}) {
  if(id_usuario){
    return function (dispatch) {
      axios.delete(`${url}/shoppingCart`,{data:{id_usuario,id_prod_cart}})
      .then(response => {
        dispatch(GetShoppingCart(id_usuario))
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  return { type: SHOPPING_CART, payload: products }
}

export function postCreateOrder(user_id,total,products,id_payment) {
  return function (dispatch) {
    axios.post(`${url}/orders`,{user_id,total,products,id_payment})
      .then(response => {
        return 'Orden Creada'
      })
      .catch(err => {
        console.log(err)
        return 'Orden no completada'
      })
  }
}

export function getUserOrders(user_id) {

  return function (dispatch) {
    axios.get(`${url}/orders?user_id=${user_id}`)
      .then(response => {
        dispatch({ type: GET_ORDERS_USER, payload: response.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function getOrders() {
  return function (dispatch) {
    axios.get(`${url}/orders`)
      .then(response => {
        dispatch({ type: GET_ORDERS_USER, payload: response.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function getOrdersGraf(fDesde,fHasta) {
  return async function (dispatch) {
    await axios.get(`${url}/orders/estado?fdesde=${fDesde}&fhasta=${fHasta}`)
      .then(response => {
        dispatch({ type: GET_ORDERS_USER, payload: response.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}


export function deleteUserOrders(id,user_id) {
  return function (dispatch) {
    axios.delete(`${url}/orders`,{data:{id,user_id}})
      .then(response => {
        // se puede enviar un mensaje de eliminado o algo por si se quiere
        dispatch(getUserOrders(user_id))
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function updateUserOrders(data) {
  return function (dispatch) {
    axios.put(`${url}/orders`,data)
      .then(response => {
        // se puede enviar un mensaje de eliminado o algo por si se quiere
        return 'Modificado'
      })
      .catch(err => {
        console.log(err)
        return 'Error al Modificadar'
      })
  }
}

export function AddUser(user) {


  localStorage.setItem('user', user.id)
  localStorage.setItem('email', user.email) 
  localStorage.setItem('role', user.role) 

  return function (dispatch) {
    axios.post(`${url}/user`, user)
      .then(response => {

        
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function payment(data) {
  return function (dispatch) {
    return axios.post(`${url}/payment`,data)
      .then(response => {
//   
          dispatch(postCreateOrder(
            response.data.user_id,
            response.data.total,
            response.data.products,
            response.data.id_payment,
            response.data.price,  
            response.data.email          
          ));
      })
      .catch(err => {
        console.log(err)
        return 'Error al Modificadar'
      })
  }
}

export function UpdateDireccion(data) {
  return function (dispatch) {
    axios.put(`${url}/orders/dir`,data)
      .then(response => {        
        return 'Direccion agregada'
      })
      .catch(err => {
        console.log(err)
        return 'Error al Modificadar'
      })
  }
}

export function getUser() {
  return function (dispatch) {
    axios.get(`${url}/user`)
      .then(user => {
        dispatch({ type: GET_USER, payload: user.data })
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function mailCambioEstado(data) {
  return function (dispatch) {
    axios.post(`${url}/email`, data)
      .then(response => {
        return response
      })
      .catch(err => {
        console.log(err)
      })
  }
}

export function getUserById(id) {


  return function (dispatch) {
    return axios.get(`${url}/user/${id}`)
      .then(user => {
        dispatch({ type: GET_ROL, payload: user.data })
        return user.data
       
       
      })
      .catch(err => {
        console.log(err)
      })
  }
}       

export function getFavorite(id_usuario) {
  return function (dispatch) {
    return axios.get(`${url}/favorite?id_usuario=${id_usuario}`)
      .then(resp => {
        
        dispatch({ type: GET_FAVORITE, payload: resp.data })
      })
      .catch(err => {
        dispatch({ type: GET_FAVORITE, payload: [] })
      })
  }
}

export function addFavorite(data) {
  return function (dispatch) {
    axios.post(`${url}/favorite`,data)
      .then(resp => {
        dispatch(getFavorite(data.id_usuario))
      })
      .catch(err => {
        console.log(err)
      })
    }
  }
  
  export function deleteFavorite(data) {
    return function (dispatch) {
      axios.delete(`${url}/favorite`,{data})
      .then(resp => {
          dispatch(getFavorite(data.id_usuario))
      })
      .catch(err => {
        console.log(err)
      })
    }
}
  
