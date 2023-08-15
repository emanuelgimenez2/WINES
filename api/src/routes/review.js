//****************/
// Review
//****************/
const { Router } = require('express');
const { Sequelize } = require('sequelize');
const { Review } = require('../db')
const router = Router();

router.get('/', function (req, res, next) {
  try {
    const { id_prod, id_user } = req.query;
    const condition = {};
    const where = {};
    if (id_prod) where.id_prod = id_prod;
    if (id_user) where.id_user = id_user;
    if (where) condition.where = where;
    Review.findAll(condition)
      .then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: 'No pude acceder a Review' })
      })
  } catch (error) {
    next(error)
  }
})
// Show reviews of one product
router.get('/:id', function (req, res, next) {
  try {
    const { id } = req.params;
    const condition = {};
    const where = {};
    if (id) where.id_prod = id;
    if (where) condition.where = where;
    Review.findAll(condition)
      .then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: 'No pude acceder a Review' })
      })
  } catch (error) {
    next(error)
  }
})



// Calcula el procentaje de Stars
router.get('/stars/:id', function (req, res, next) {
  try {
    const { id } = req.params;
    console.log('id_prod: ', id);
    // const condition = {};
    // const where = {};
    // if (id_prod) where.id_prod = id_prod;
    // if (where) condition.where = where;
    Review.findAll({
      where: { id_prod:id },
      attributes: [
        [Sequelize.fn('AVG', Sequelize.col('review.stars')), 'avg'],
        [Sequelize.fn('COUNT', Sequelize.col('review.stars')), 'count']
      ],
      })
      .then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: 'No pude acceder a Review' })
      })
  } catch (error) {
    next(error)
  }
})



router.post('/', async function (req, res, next) {
  const { id_user, id_prod, stars, description } = req.query;
  if (!id_user || !id_prod || !stars || !description) {
    return res.send("Falta información para poder darte de alta la Tabla")
  }
  try {
    const newReview = await Review.create({
      id_prod,
      id_user,
      stars,
      description
    })
    res.status(200).send("Review Creada");
  } catch (error) {
    console.log('Error', req.body)
    next(error)
  }
})

router.put('/', async (req, res) => {
  const { id, id_user, id_prod, stars, description } = req.body;
  if (!id || !id_user || !id_prod || !stars || !description) {
    return res.send("Falta información para poder darte de alta la Tabla")
  }  
  try {
    const review = await Review.findOne({
      where: { id }
    });
    review.id_user = id_user;
    review.id_prod = id_prod;
    review.stars = stars;
    review.description = description;
    if (id) await review.save();
    res.status(200).json(review);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/', async (req, res) => {
  const { id } = req.query;
  try {
    let eliminados = await Review.destroy({
      where: { id:id }
    })
    res.send(`Deleted  ${eliminados} registro`);
  } catch (error) {
    console.log('error: ', error);
    res.send(error);
  }
})

module.exports = router