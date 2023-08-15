//****************/
// Payment
//****************/
const { Router } = require('express');
const router = Router();
const mercadopago = require('mercadopago');
const axios = require('axios');
const { TK_MERCADOPAGO } = process.env;
mercadopago.configure({
    access_token: TK_MERCADOPAGO // Ver tema de .env para ponerlo ahi
});


router.post('/', function (req, res, next) {
    const {products,total,user_id}= req.body;
    console.log(products)
    const Items = products.map(product =>{
        return {
            name: product.name,
            unit_price: product.price,
            quantity: 1
        }
    })
    const SetProduct = products.map(product =>{
        return {
            product_id: product.product_id,
            quantity: product.quantity,
            price: product.price
        }
    })
    let preference = {
        items: Items,
        back_urls: {
			"success": `http://localhost:3001/payment/success`,
			"failure": "http://localhost:3001/payment/failure",
			"pending": "http://localhost:3001/payment/pending"
		},
        external_reference: `${user_id}`,
        binary_mode: true,
        statement_descriptor: "WINE",
        auto_return: "approved",
    };
    mercadopago.customer_data
    mercadopago.preferences
    .create(preference)
    .then(function (response) {
        console.log({products: SetProduct,
            total: total,
            init_point: response.body.init_point,
            user_id: response.body.external_reference,
            id_payment: response.body.id,})
        res.json({
            products: SetProduct,
            total: total,
            init_point: response.body.init_id,
            user_id: response.body.external_reference,
            id_payment: response.body.id,
        });
    })
    .catch(function (error) {
        console.log(error);
    });
})

router.get('/success', function (req, res, next) {
    const { status } = req.query
    console.log('req.query: ', req.query);
    if(status === 'approved'){
        const { external_reference , preference_id} = req.query
        axios.put('http://localhost:3001/orders/pagos',{user_id:external_reference,id_payment:preference_id, estado:'Creada'})
        .then(resp=>{
            return res.redirect('http://localhost:3000/user/comprarealizada');
        })
        .catch(e => {
            next(e)
        });
    }else{
        res.redirect('http://localhost:3000/error/elpagofallo');
    }
})

router.get('/pending', function (req, res, next) {
    const { status } = res.query
    if(status !== 'approved'){
        const { external_reference } = req.query
        axios.put('http://localhost:3001/orders',{id:1, user_id:1, estado:'Pendiente'})
        .then(resp=>{
            return res.redirect('http://localhost:3000/user/orders');
        })
        .catch(e => {
            next(e)
        });
    }else{
        res.redirect('http://localhost:3000/error/el pago quedo pendiente');
    }
})

router.get('/failure', function (req, res, next) {
    res.redirect('http://localhost:3000/error/El pago fallo');
})

module.exports = router;