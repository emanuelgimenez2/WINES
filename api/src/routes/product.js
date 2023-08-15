//****************/
// Products
//****************/
const { Router } = require('express');
const { Product, Productor, Product_state, Location, Category } = require('../db')
const { Sequelize, Op } = require('sequelize');
const router = Router();

// Getting all Products from DB
// Search by ID
// Search by Name 
router.get('/', function (req, res, next) {
  try {
    const { name } = req.query;
    const condition = {};
    const where = {};
    if (name) {
      Product.findAll({
        attributes: {exclude: ['id_prod','id_place','id_categ','id_state']},
        where: {
          name: { [Op.iLike]: `%${name}%` },
          status : 1,
          stock: { [Op.gt]: 0 },
        },
        include: [
          {model: Productor},
          {model: Location},
          {model: Category},
          {model: Product_state},
        ],
      })
      .then((resp) => {
        resp.length
        ? res.send(resp)
        : res.send({ message: 'No pude acceder a productos' })
      })
    } else {
      Product.findAll(
        {
          attributes: {exclude: ['id_prod','id_place','id_categ','id_state']},
          where: {
            status: 1,
            stock: { [Op.gt]: 0 }
          },
          include: [
            {model: Productor},
            {model: Category},
            {model: Location},
            {model: Product_state},
          ],
        })
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

router.get('/all', function (req, res, next) {
  try {
    const { name } = req.query;
    const condition = {};
    const where = {};
      Product.findAll(
        {
          attributes: {exclude: ['id_prod','id_place','id_categ','id_state']},
          include: [
            {model: Productor},
            {model: Category},
            {model: Location},
            {model: Product_state},
          ],
        })
        .then((resp) => {
          resp.length
            ? res.send(resp)
            : res.send({ message: 'No pude acceder a productos' })
        })
  } catch (error) {
    console.log('Error', error)
  }
})

router.get('/detail/:id', function (req, res, next) {
  try {
    const { id } = req.params;
      Product.findAll({
        attributes: {exclude: ['id_prod','id_place','id_categ','id_state']},
        where: {
          id: req.params.id
        },
        include: [
          {model: Productor},
          {model: Category},
          {model: Location},
          {model: Product_state},
        ]
      })
        .then((resp) => {
          resp.length
            ? res.send(resp)
            : res.send({ message: 'No pude acceder a productos' })
        })
  } catch (error) {
    console.log('Error', error)
  }
})

router.post('/', async function (req, res, next) {
  const { name, price, place, categ, summary, producer, alcohol, image,stock,minimo,descuento } = req.body;
  if (!name || !place || !price || !categ || !summary || !producer || !alcohol || !image || !stock || !minimo || !descuento) {
    return res.send("Falta información para poder darte de alta el Producto")
  }
  try {
    const newProduct = await Product.create({
      name,
      price,
      categ,
      place,
      status: 1,
      summary,
      producer,
      alcohol,
      image,
      stock,
      minimo,
      descuento
    })
    res.status(200).send(`Product Created : ${newProduct.id}`);
  } catch (error) {
    console.log('Error', req.body)
    next(error)
  }
})

router.put('/', async (req, res) => {
  const { id, name, price, place, categ, summary, producer, alcohol, image,stock,minimo,descuento } = req.body;
  console.log('req.body: ', req.body);
  var estado = '1';
  if (stock === '0' ){
    estado = '3' // Sin Stock 
  }

  try {
    const newProduct = await Product.findOne({
      where: { id }
    });
    newProduct.name = name 
    newProduct.price = price
    newProduct.place = place 
    newProduct.categ = categ
    newProduct.summary = summary
    newProduct.producer = producer
    newProduct.alcohol = alcohol
    newProduct.image =  image 
    newProduct.status = estado
    newProduct.stock = stock
    newProduct.minimo = minimo
    newProduct.descuento = descuento
    if (id) await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.send(error);
  }
});

router.put('/del/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const newProduct = await Product.findOne({
      where: { id }
    });
    newProduct.status = 2 
    if (id) await newProduct.save();
    res.json(newProduct);
  } catch (error) {
    res.send(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    let eliminados = await Product.destroy({
      where: { id }
    })
    res.send(`Deleted  ${eliminados} registro`);
  } catch (error) {
    console.log('error: ', error);
    res.send(error);
  }
})

module.exports = router