//****************/
// Stock
//****************/
const { Router, response } = require('express');
const router = Router();

require('dotenv').config();
const { Sequelize, QueryTypes } = require('sequelize');
const fs = require('fs');
const path = require('path');
const { DB_USER, DB_PASSWORD, DB_HOST, DB_NAME } = process.env;

const seq = new Sequelize(`postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/${DB_NAME}`, {
  logging: false, // set to console.log to see the raw SQL queries
  native: false, // lets Sequelize know we can use pg-native for ~30% more speed
});

// /stock
router.get('/', async function (req, res, next) {
          try {
          const [records] = await seq.query(
            'select count(*) as cant FROM products',
            { logging: console.log,
              type: QueryTypes.SELECT
            });
          res.send(records);
        } catch (error) {
          console.log(error)
        }

})

router.put('/', async function (req, res, next) {
  try {
    const { id, suma } = req.query;
    if (suma=="menos"){
      var sql = `update products set stock = stock - quantity from "DATA" , order_items, orders where orders.id = ${id} and "orderId" = orders.id and order_items.order_id = "DATA".order_id and products.id = product_id`
    } else {
      var sql = `update products set stock = stock + quantity from "DATA" , order_items, orders where orders.id = ${id} and "orderId" = orders.id and order_items.order_id = "DATA".order_id and products.id = product_id`
    }
    console.log(sql)
    const [records] = await seq.query(sql,
      {
        logging: console.log,
        type: QueryTypes.SELECT
      });
    res.send({message:'ok'})
  } catch (error) {
    console.log(error)
  }

})


module.exports = router;