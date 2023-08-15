/* eslint-disable no-unused-vars */
/* eslint-disable default-case */
// TODO
// Pring Actions
// Initialize State
// Get Acctions
import {
  GET_PRODUCTS,
  GET_CATEGORY,
  GET_FILTER_PRODUCT_NAME,
  POST_PRODUCTS,
  GET_FILTER_PRODUCT_CATEGORY,
  GET_FILTER_PRODUCT_OFFER,
  GET_PRODUCT_DETAIL,
  GET_CATEGORIES,
  GET_PRODUCER,
  GET_LOCATION,
  GET_STARS,
  GET_REVIEW,
  SHOPPING_CART,
  GET_ORDERS_USER,
  GET_USER,
  GET_DESCUENTOS,
  GET_FAVORITE,
  GET_ROL
} from "../actions/constant";

const initialState = {
  products: [],
  category: [],
  productores: [],
  locations: [],
  categories: [],
  detailProduct: [],
  review: [],
  shoppingCart: [],
  ordersUser: [],
  users: [],
  listFavorite: [],
  rol:false,
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    
    case GET_REVIEW:
      return {
        ...state,
        review: action.payload,
      }

    case GET_STARS:
      return {
        ...state,
        review: action.payload,
      }

    case GET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case GET_PRODUCT_DETAIL:
      return {
        ...state,
        detailProduct: action.payload,
      };
    case GET_FILTER_PRODUCT_NAME:
      return {
        ...state,
        products: action.payload,
      };

    case GET_CATEGORY:
      return {
        ...state,
        category: action.payload,
      };

    case GET_CATEGORIES:
      return {
        ...state,
        categories: action.payload,
      };
      case GET_DESCUENTOS:
        return {
          ...state,
          descuentos: action.payload,
        };
        
    case GET_PRODUCER:
      return {
        ...state,
        productores: action.payload,
      };

    case GET_LOCATION:
      return {
        ...state,
        locations: action.payload,
      };
    case SHOPPING_CART:
      return {
        ...state,
        shoppingCart: action.payload,
      };
    case GET_ORDERS_USER:
      return {
        ...state,
        ordersUser: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        users: action.payload,
      };
    case GET_FAVORITE:
      return {
        ...state,
        listFavorite: action.payload,
      };
      case  GET_ROL:
       
      return {
        ...state,
        rol: action.payload,
      };
    default:
      return state;
  }
}

export default rootReducer;
