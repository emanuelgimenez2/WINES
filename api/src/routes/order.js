//****************/
// Orders
//****************/
const { Router } = require("express");
const { Order, Order_item, Product, Category } = require("../db");
const router = Router();
const { Op } = require("sequelize");


router.get("/", function (req, res, next) {
  try {
    const { user_id } = req.query;
    const condition = {};
    const where = {};
    if (user_id) where.user_id = user_id;
    if (where) condition.where = where;
    condition.include = { model: Order_item, include: { model: Product } };
    Order.findAll(condition).then((resp) => {
      resp.length
        ? res.send(resp)
        : res.send({ message: "No pude acceder a Orders" });
    });
  } catch (error) {
    next(error);
  }
});

router.get("/estado", function (req, res, next) {
  try {
    const { fdesde,fhasta } = req.query;
    console.log('fhasta: ', fhasta);
    console.log('fdesde: ', fdesde);
//const { user_id } = req.query;
    const condition = {};
    const where = {};
    condition.where = {
      [Op.and]: [
          { fecha: {
            [Op.gte]: `${fdesde}`,
            [Op.lte]: `${fhasta}`},
          }
      ]
    };    
    condition.include = {model:Order_item , 
      include:{
        model:Product, include:{model:Category}
      }
    }
    Order.findAll(condition).then((resp) => {
      resp.length
        ? res.send(resp)
        : res.send({ message: "No pude acceder a Orders" });
    });
  } catch (error) {
    next(error);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;
    Order.findAll({
      where: { id: id },
      include: [{ model: Order_item, include: [Product] }],
    }).then((resp) => {
      res.send(resp);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/estad", function (req, res, next) {
  try {
    const { fdesde,fhasta } = req.query;
    console.log('fhasta: ', fhasta);
    console.log('fdesde: ', fdesde);
//const { user_id } = req.query;
    const condition = {};
    const where = {};
    condition.where = {
      [Op.and]: [
          { fecha: {
            [Op.gte]: `${fdesde}`,
            [Op.lte]: `${fhasta}`},
          }
      ]
    };    
    condition.include = {model:Order_item , 
      include:{
        model:Product, include:{model:Category}
      }
    }
    Order.findAll(condition).then((resp) => {
      resp.length
        ? res.send(resp)
        : res.send({ message: "No pude acceder a Orders" });
    });
  } catch (error) {
    next(error);
  }
})

// Crear Order de Compra
router.post("/", async function (req, res, next) {
  const { user_id, total, products, id_payment, email } = req.body;
  console.log(products);
  if (!user_id) {
    return res.send("Falta información para poder darte de alta la Tabla");
  }
  try {
    const newOrder = await Order.create({
      user_id: user_id,
      estado: 'Ingreso',
      total: total,
      id_payment: id_payment,
      emailEnvio: email
    });
    let Resultado = products.map((product) => {
      return newOrder.createOrder_item(product);
    });
    // ver el tema de pasarle un arreglo y crear todoo junto
    await Promise.all(Resultado);
    res.status(200).send("Order Creada");
  } catch (error) {
    console.log("Error", req.body);
    next(error);
  }
});

router.put("/pagos", async (req, res) => {
  const { id_payment, user_id, estado } = req.body;
  console.log(req.body);
  try {
    const order = await Order.findOne({
      where: { [Op.and]: [{ id_payment: id_payment, user_id: user_id }] },
    });
    order.estado = estado;
    await order.save();
    res.json(order);
  } catch (error) {
    res.send(error);
  }
});

router.put("/", async (req, res) => {
  const { id, estado } = req.body;

  
  try {
    const order = await Order.findOne({
      where: { id },
    });
    order.estado = estado;
    await order.save();
    res.json(order);
  } catch (error) {
    res.send(error);
  }
});

router.put("/dir", async (req, res) => {
  const { id, direccion } = req.body;
  try {
    const order = await Order.findOne({
      where: { id },
    });
    order.direccion = direccion;
    await order.save();
    res.json(order);
  } catch (error) {
    res.send(error);
  }
});

router.put("/email", async (req, res) => {
  const { id, email } = req.body;
  try {
    const order = await Order.findOne({
      where: { id },
    });
    order.emailEnvio = email;
    await order.save();
    res.json(order);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/", (req, res, next) => {
  console.log(req.body);
  const { id, user_id } = req.body;
  if (!id) {
    res
      .status(400)
      .json({ message: "Falta id para eliminar la Orden de Compra" });
  }
  Order.destroy({ where: { [Op.and]: [{id: id,estado: 'Ingreso',user_id}] } })
    .then(response => {
      response ? res.status(200).json({ message: 'Orden de Compra Eliminado' })
        : res.status(404).json({ message: 'la id de dicho Orden de Compra no existe' });
    })
    .catch((e) => {
      next(e);
      res.status(404).json({
        message: "ocurrio un problema a la hora de eliminar la Orden de Compra",
      });
    });
});

module.exports = router;
