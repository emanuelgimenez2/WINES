//****************/
// Profile
//****************/
const { Router } = require('express');
const { Profile } = require('../db')
const router = Router();

router.get('/', function (req, res, next) {
  try {
    const { id } = req.query;
    const condition = {};
    const where = {};
    if (id) where.id = id;
    if (where) condition.where = where;
    Profile.findAll(condition)
      .then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: 'No pude acceder a Profile' })
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
    const newProfile = await Profile.create({
      description
    })
    res.status(200).send("Profile Creada");
  } catch (error) {
    console.log('Error', req.body)
    next(error)
  }
})

router.put('/', async (req, res) => {
  const { id, description } = req.body;
  try {
    const profile = await Profile.findOne({
      where: { id }
    });
    profile.description = description;
    if (id) await profile.save();
    res.json(profile);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/', async (req, res) => {
  try {
    let { id } = req.body;
    let eliminados = await Profile.destroy({
      where: { id }
    })
    res.send(`Deleted  ${eliminados} registro`);
  } catch (error) {
    console.log('error: ', error);
    res.send(error);
  }
})

module.exports = router