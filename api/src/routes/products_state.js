//****************/
// Products_states
//****************/
const { Router } = require('express');
const { Product_state } = require('../db')
const router = Router();

router.get('/', function (req, res, next) {
    try {
      const { id, cod } = req.query;
      const condition = {};
      const where = {};
      if (id) where.id = id;
      if (cod) where.cod = cod;
      if (where) condition.where = where;
      Product_state.findAll(condition)
      .then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: 'No pude acceder a Product_state' })
      })
    } catch (error) {
      next(error)
    }
  })

  router.post('/', async function (req, res, next) {
    const { id_ref,cod,description } = req.body;
    if (!id_ref || !cod || !descrip) {
        return res.send("Falta información para poder darte de alta la Tabla")
    }
    try {
        const newProducts_state = await Products_state.create({ 
          id_ref,
            cod,
            description
        })
        res.status(200).send("Products_state Creada");
    } catch (error) {
        console.log('Error', req.body)
        next(error)
    }
})

  module.exports = router