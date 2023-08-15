//****************/
// Locations
//****************/
const { Router } = require('express');
const { Sequelize, Op } = require('sequelize');
const { Location } = require('../db')
const router = Router();

router.get('/', function (req, res, next) {
  try {
    const { description, id_place, } = req.query;
    const condition = {};
    const where = {};
    if (id_place) where.id_place = id_place;
    if (where) condition.where = where;
    if (description) {
      Location.findAll({
        where: {
          description: { [Op.like]: `%${description}%` },
        }
      }
      )
        .then((resp) => {
          resp.length
            ? res.send(resp)
            : res.send({ message: 'No pude acceder a lugares' })
        })
    } else {
      Location.findAll(condition)
        .then((resp) => {
          resp.length
            ? res.send(resp)
            : res.send({ message: 'No pude acceder a productos' })
        })

    }
  } catch (error) {
    console.log('Error', error)
  }
})

router.post('/', async function (req, res, next) {
  const { description } = req.body;
  if (!description) {
    return res.send("Falta información para poder darte de alta la Tabla")
  }
  try {
    const newLocation = await Location.create({
      description
    })
    res.status(200).send("Location Created");
  } catch (error) {
    console.log('Error', req.body)
    next(error)
  }
})
router.put('/', async (req, res) => {
  const { id_place, description } = req.body;
  try {
    const location = await Location.findOne({
      where: { id_place }
    });
    location.description = description;
    if (id_place) await location.save();
    res.json(location);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/', async (req, res) => {
  try {
    let { id_place } = req.body;
    let eliminados = await Location.destroy({
      where: { id_place }
    })
    res.send(`Deleted  ${eliminados} registro`);
  } catch (error) {
    console.log('error: ', error);
    res.send(error);
  }
})

module.exports = router