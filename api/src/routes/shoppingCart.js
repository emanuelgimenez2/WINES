//****************/
// ShoppingCart
//****************/
const { Router } = require('express');
const { Shopping_cart  , Product} = require('../db')
const router = Router();
const { Op } = require('sequelize');


// Obtener carrito de compras
router.get('/', function (req, res, next) {
    const {id_usuario} = req.query;
    if(!id_usuario || id_usuario === null) res.status(404).json({message: `Error al buscar el carrito, Falta id`});
    Shopping_cart.findAll({
        attributes: ['id_prod_cart', 'amount'],
        where:{
            id_usuario: id_usuario
        },
        include:{ model:Product , attributes: ['name' , 'price' , 'image'],}
    })
    .then(resp=>{
        Object.entries(resp).length > 0 ? res.status(200).json(resp) 
        : res.status(404).json({message: `Carrito Vacio`})
    }).catch(e => next(error))
});

// Modificar cantidad dentro del producto de compras
router.put('/', function (req, res, next) {
    const {id_usuario , id_prod_cart , amount} = req.body;
    if(!id_usuario || !id_prod_cart || !amount) res.status(404).json({message: `Error al modificar la cantidad dentro del carrito, Faltan datos`});
    Shopping_cart.update({
        amount: amount
    },{
        where: {
            [Op.and]: [{id_usuario: id_usuario} , {id_prod_cart: id_prod_cart}]
        }
    })
    .then(resp=>{
        resp[0] === 1 ? res.status(200).json({message: `Datos modificados`}) 
        : res.status(404).json({message: `Error al modificar`})
    })
});

// Eliminar un producto al carrito
router.delete('/', function (req, res, next) {
    const {id_usuario , id_prod_cart} = req.body;
    console.log(req.body)
    if(!id_usuario || !id_prod_cart) res.status(404).json({message: `Error al modificar la cantidad dentro del carrito, Faltan datos`});
    Shopping_cart.destroy({
        where: {
            [Op.and]: [{id_usuario: id_usuario} , {id_prod_cart: id_prod_cart}]
        }
    })
    .then(resp=>{
        resp === 1 ? res.status(200).json({message: `Producto eliminado del carrito`}) 
        : res.status(404).json({message: `Error al eliminar el producto del carrito`})
    })
});

// Eliminar todo el carrito
router.delete('/deleteAll', function (req, res, next) {
    const {id_usuario } = req.body;
    if(!id_usuario ) res.status(404).json({message: `Error al modificar la cantidad dentro del carrito, Faltan datos`});
    Shopping_cart.destroy({
        where: {
            id_usuario: id_usuario
        }
    })
    .then(resp=>{
        resp? res.status(200).json({message: `Productos eliminados del carrito`}) 
        : res.status(404).json({message: `Error al eliminar los productos del carrito`})
    })
});

// Agregar un producto al carrito
router.post('/', function (req, res, next) {
    const {id_usuario , products} = req.body;
    if(!id_usuario || !products) res.status(404).json({message: `Error al cargar el carrito, Faltan datos`});
    const ArrayProduct = products.map(x => {
        return Shopping_cart.findOrCreate({
            where:{
                [Op.and]:[{id_usuario: id_usuario},{id_prod_cart: x.id_prod_cart}]
            },
            defaults:{
                id_usuario: id_usuario,
                id_prod_cart: x.id_prod_cart,
                amount: 1
            }
        })
    })
    Promise.all(ArrayProduct).then(resp=>{
        res.status(404);
        const respuesta = {message: 'Error al cargar el carrito' , actualizado: false};
        resp.map(x => {
            if(x[1] === true){
                res.status(200);
                respuesta.message = 'Carrito Actualizado';
                respuesta.actualizado = true
            }
        })
        res.json(respuesta)
    }).catch( e => next(e));
});

// Confirmacion de Compra de productos dentro del carrito
router.get('/confirm', async function (req, res, next) {
    try {
        const {id_usuario} = req.body;
        if(!id_usuario) res.status(404).json({message: `Error intentar comprar,Falta id del usuario`});
        const CantidadProductos = await Shopping_cart.findAll({
            attributes: {exclude: ['id_usuario','amount','id']},
            where: {id_usuario: id_usuario}
        });
        const ProductosDisponibles = CantidadProductos.map(producto =>{
            return Shopping_cart.findOne({
                attributes: {exclude: ['id_usuario','amount','id']},
                where: {
                    [Op.and]: [
                        {id_usuario: id_usuario}, 
                        {id_prod_cart: producto.id_prod_cart} , 
                        {amount: {[Op.gte]: 1}}
                    ]
                }
            });
        })
        const Resultado = await Promise.all(ProductosDisponibles)
        if(!Resultado.includes(null) && CantidadProductos.length > 0){
            res.status(200).json({message: `OK`})
        }else{
            res.status(404).json({message: `ERROR`})
        }
    } catch (error) {
        next(error)
    }
});

module.exports = router;