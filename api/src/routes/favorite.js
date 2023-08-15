//****************/
// Favorite
//****************/
const { Router } = require('express');
const { Favorite , Product} = require('../db');
const { Op } = require("sequelize");
const router = Router();

router.get('/', function (req, res, next) {
    const {id_usuario} = req.query;
    if(!id_usuario || id_usuario === null) res.status(404).json({message: `Error al buscar el usuario, Falta id`});
    Favorite.findAll({
        where:{
            id_usuario: id_usuario
        },
        include:{ model:Product , attributes: ['name' , 'image'],}
    })
    .then(resp=>{
        Object.entries(resp).length > 0 ? res.status(200).json(resp) 
        : res.status(404).json({message: `No Tiene Favoritos`})
    }).catch(e => next(error))
})

router.post('/', function (req, res, next) {
    const {id_usuario , id_prod} = req.body;
    console.log(req.body)
    if(!id_usuario || !id_prod) res.status(404).json({message: `Error al cargar el producto a favoritos, Faltan datos`});
    Favorite.findOrCreate({
        where:{
            [Op.and]:[{id_usuario: id_usuario},{id_prod: id_prod}]
        },
        defaults:{
            id_usuario: id_usuario,
            id_prod: id_prod,
        }
    })
    .then(resp=>{
        resp[1] === true ? res.status(200).json({message: `OK`})
        : res.status(404).json({message: `Producto ya agregado`});
    })
    .catch( e => next(e));
})

router.delete('/', function (req, res, next) {
    const {id_usuario , id_prod} = req.body;
    if(!id_usuario || !id_prod) res.status(404).json({message: `Error al eliminar el producto de favoritos, Faltan datos`});
    Favorite.destroy({
        where:{
            [Op.and]:[{id_usuario: id_usuario},{id_prod: id_prod}]
        }
    })
    .then(resp=>{
        resp ? res.status(200).json({message: `OK`})
        : res.status(404).json({message: `Producto ya Eliminado`});
    })
    .catch( e => next(e));
})

module.exports = router