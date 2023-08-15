//****************/
// Order_Itemss
//****************/
const { Router } = require('express');
const { Order_Item } = require('../db')
const router = Router();

router.get('/', function (req, res, next) {
    try {
      const { id, product } = req.query;
      const condition = {};
      const where = {};
      if (id) where.order_id = id;
      if (product) where.product_id = product;
      if (where) condition.where = where;
      Order_Item.findAll(condition)
      .then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: 'No pude acceder a order-items' })
      })
    } catch (error) {
      next(error)
    }
  })
   
  router.get('/total', function (req, res, next) {
    try {
      Order_Item.findAll({
        include: { model: Product },
        attributes: [
          ['Order_Item.product_id', 'Product.name'],
          [Sequelize.fn('sum', Sequelize.col('Order_Item.quantity')), 'Amount'],
          [Sequelize.fn('sum', Sequelize.col('Order_Item.quantity' * 'Product.price')), 'Total'],
        ],
        group: ['Order_Item.product_id', 'Product.name'],
      }
      )
        .then((resp) => {
          resp.length
            ? res.send(resp)
            : res.send({ message: 'No pude acceder a order-items' })
        })
    } catch (error) {
      console.log('err:', error)
    }
  })
 

  module.exports = router;