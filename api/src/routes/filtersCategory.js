//****************/
// FiltersCategory
//****************/
const { Router } = require("express");
const { Category, Product, Productor } = require("../db");
const router = Router();
const { Op } = require("sequelize");

router.get("/", async function (req, res, next) {
  try {
    var obj = {};
    const bodega = await Productor.findAll({
      order: ["description"],
      attributes: ["description"],
      group: ["description"],
    });
    bodega.map((data) => {
      var arreglo = obj.Productor
        ? [...obj.Productor, data.description]
        : [data.description];
      obj = {
        ...obj,
        Productor: arreglo,
      };
    });
    const categorias = await Category.findAll({
      attributes: ["type", "variety"],
      group: ["type", "variety"],
    });
    const degreeSugar = await Category.findAll({
      attributes: ["degreeSugar"],
      group: ["degreeSugar"],
    });
    degreeSugar.map((data) => {
      var arreglo = obj.DegreeSugar
        ? [...obj.DegreeSugar, data.degreeSugar]
        : [data.degreeSugar];
      obj = {
        ...obj,
        DegreeSugar: arreglo,
      };
    });
    categorias.map((categoria) => {
      var arreglo = obj[categoria.type]
        ? [...obj[categoria.type], categoria.variety]
        : [categoria.variety];
      obj = {
        ...obj,
        [categoria.type]: arreglo,
      };
    });
    Object.entries(obj).length > 0
      ? res.status(200).send(obj)
      : res.status(404).json({ message: "Error para mostrar las categorias" });
  } catch (error) {
    next(error);
  }
});

router.post("/product", function (req, res, next) {
  const arrayWhere = [];
  const { tinto , blanco , rosado , degreeSugar, productor } = req.body;
  if (tinto) arrayWhere.push({ variety: tinto},{type: 'Tinto'});
  if (blanco) arrayWhere.push({ variety: blanco},{type: 'Blanco'});
  if (rosado) arrayWhere.push({ variety: rosado},{type: 'Rosado'});
  if (degreeSugar) arrayWhere.push({ degreeSugar: degreeSugar });
  console.log('Arreglo',arrayWhere)
  console.log(req.body);
  Product.findAll({
    where: {
      status: 1,
      stock: { [Op.gt]: 0 }
    },
    attributes: { exclude: ["id_prod", "id_place", "id_categ", "id_state"] },
    include: [
      {
        model: Category,
        where: {
          [Op.and]: arrayWhere,
        },
      },
      {
        model: Productor,
        where: productor ? { description: productor } : "",
      },
    ],
  })
  .then((resp) => {
    console.log('resp',resp)
    resp.length > 0 ? res.status(200).json(resp) : res.status(404).json({message: "Vino no encontrado"})
  })
  .catch((e) => {
    next(e);
  });
});

module.exports = router;
