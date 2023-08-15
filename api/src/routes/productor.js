//****************/
// Productor
//****************/
const { Router } = require('express');
const { Productor } = require('../db')
const router = Router();

router.get('/', function (req, res, next) {
  try {
    const { id } = req.query;
    const condition = {};
    const where = {};
    if (id) where.id_Prod = id;
    if (where) condition.where = where;
    Productor.findAll(condition)
      .then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: 'No pude acceder a Productor' })
      })
  } catch (error) {
    next(error)
  }
})

router.post('/', async function (req, res, next) {
  const { description } = req.body;
  if (!description) {
    return res.send("Falta información para poder darte de alta la Tabla")
  }
  try {
    const newProductor = await Productor.create({
      description
    })
    res.status(200).send("Productor Created");
  } catch (error) {
    console.log('Error', req.body)
    next(error)
  }
})

router.put('/', async (req, res) => {
  const { description , id_Prod} = req.body;
  try {
    const productor = await Productor.findOne({
      where: { id_Prod }
    });
    productor.description = description;
    if (id_Prod) await productor.save();
    res.json(productor);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/', async (req, res) => {
  try {
    let { id_Prod } = req.body;
    let eliminados = await Productor.destroy({
      where: { id_Prod }
    })
    res.send(`Deleted  ${eliminados} registro`);
  } catch (error) {
    console.log('error: ', error);
    res.send(error);
  }
})

module.exports = router