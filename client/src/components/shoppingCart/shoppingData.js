/* eslint-disable no-redeclare */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { payment } from "../../actions/action";

export default function ShoppingData() {

    const dispatch = useDispatch();

    useEffect(() => {
        var products = [
            { product_id: 1, quantity: 1, price: 1470 },
            { product_id: 2, quantity: 1, price: 1835 }
        ]
        dispatch(payment({ products: products, user_id: 'auth0|62d5cc456d6e278e9d3f060e', total: 3305 }))
        var products = [{ product_id: 54, quantity: 1, price: 980 }, { product_id: 2, quantity: 1, price: 1835 }]
        dispatch(payment({ products: products, user_id: 'auth0|62d5cc456d6e278e9d3f060e', total: 2815 }))
        var products = [{ product_id: 7, quantity: 3, price: 426 }, { product_id: 14, quantity: 1, price: 1915 }]
        dispatch(payment({ products: products, user_id: 'auth0|62d5cc456d6e278e9d3f060e', total: 2341 }))
        var products = [{ product_id: 4, quantity: 1, price: 2000 }, { product_id: 18, quantity: 3, price: 740 }]
        dispatch(payment({ products: products, user_id: 'auth0|62d5cc456d6e278e9d3f060e', total: 940 }))
        var products = [{ product_id: 8, quantity: 1, price: 1490 }, { product_id: 7, quantity: 1, price: 426 }]
        dispatch(payment({ products: products, user_id: 'auth0|62d5cc456d6e278e9d3f060e', total: 1916 }))
        var products = [{ product_id: 14, quantity: 1, price: 1915 }, { product_id: 17, quantity: 1, price: 2600 }]
        dispatch(payment({ products: products, user_id: 'auth0|62d5cc456d6e278e9d3f060e', total: 4515 }))
        var products = [{ product_id: 48, quantity: 1, price: 426 }, { product_id: 47, quantity: 1, price: 1480 }]
        dispatch(payment({ products: products, user_id: 'auth0|62d5cc456d6e278e9d3f060e', total: 1906 }))
        var products = [{ product_id: 57, quantity: 1, price: 1200 }, { product_id: 58, quantity: 1, price: 1491 }]
        dispatch(payment({ products: products, user_id: 'auth0|62d5cc456d6e278e9d3f060e', total: 2691 }))
        var products = [{ product_id: 31, quantity: 1, price: 2050 }, { product_id: 44, quantity: 1, price: 3110 }]
        dispatch(payment({ products: products, user_id: 'auth0|62d5cc456d6e278e9d3f060e', total: 5160 }))
        var products = [{ product_id: 32, quantity: 1, price: 1960 }, { product_id: 45, quantity: 1, price: 1666 }]
        dispatch(payment({ products: products, user_id: 'auth0|62d5cc456d6e278e9d3f060e', total: 3626 }))
        var products = [{ product_id: 33, quantity: 1, price: 3300 }, { product_id: 46, quantity: 1, price: 650 }]
        dispatch(payment({ products: products, user_id: 'auth0|62d5cc456d6e278e9d3f060e', total: 3950 }))



    }, [dispatch]);


    return (
        <>
            <div>Hecho</div>
        </>
    )
}