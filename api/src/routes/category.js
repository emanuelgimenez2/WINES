//****************/
// Category
//****************/
const { Router } = require('express');
const { Category } = require('../db')
const router = Router();
const { Op } = require('sequelize');

router.get('/', function (req, res, next) {
  try {
    Category.findAll()
      .then((resp) => {
        resp.length
          ? res.status(200).send(resp)
          : res.status(404).json({message:'Error para mostrar las categorias'});
      })
  } catch (error) {
    next(error)
  }
})

router.post('/', (req,res ,next) => {
  const {variety ,type, degreeSugar } = req.body;
  if(!variety || !type || !degreeSugar){
      res.status(400).json({message:'Faltan datos primordiales'});
  }
  const conditions = {};
  conditions.where = {
    [Op.and]: [
        { variety: {[Op.iLike]: `${variety}`}},
        { type: type},
        { degreeSugar: degreeSugar}
    ]
  };
  conditions.defaults = {
      variety: variety,
      type: type,
      degreeSugar: degreeSugar
  };
  Category.findOrCreate(conditions)
  .then(response => {
      if(response[1] === false){
          res.status(404).json({message:'Categoria ya existente'});
      }
      res.status(200).json({message:'Categoria Creada'});
  })
  .catch(e => {next(e)});
});

router.put('/', (req,res ,next) => {
  const {id} = req.body;
  if(!id){
      res.status(400).json({message:'Falta id para encontrar categoria a modificar'});
  }
  Category.update(
    req.body,{
      where:{
        id_categ: id
      }
    }
  )
  .then(response => {
      response[0] === 1 
      ? res.status(200).json({message:'la categoria se modifico con exito'})
      : res.status(404).json({message:'ocurrio un problema a la hora de modificar la categoria'});
  })
  .catch(e => {
    next(e)
    res.status(404).json({message:'ocurrio un problema a la hora de modificar la categoria'})
  });
});

router.delete('/', (req,res ,next) => {
  const {id} = req.body;
  if(!id){
      res.status(400).json({message:'Falta id para eliminar la categoria'});
  }
  Category.destroy({ where:{id_categ: id}})
  .then(response => {
      response ? res.status(200).json({message:'la categoria se elimino con exito'})
      : res.status(404).json({message:'la id de dicha categoria no existe'});
  })
  .catch(e => {
    next(e)
    res.status(404).json({message:'ocurrio un problema a la hora de modificar la categoria'})
  });
});

module.exports = router;