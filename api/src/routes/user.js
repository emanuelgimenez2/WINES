//****************/
// Users
//****************/
const { Router } = require("express");
const { Sequelize, Op } = require("sequelize");
const { User } = require("../db");
const router = Router();

router.get("/", function (req, res, next) {
  try {
    const { id } = req.query;
 
    if (id) {
      User.findByPk(id)
      .then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Usuarios" });
      });
    } else {
      User.findAll().then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a User" });
      });
    }
  } catch (error) {
    next(error);
  }
});

router.get("/:id", function (req, res, next) {
  try {
    const { id } = req.params;

    User.findByPk(id).then((response) => {
      res.json(response);
    });
  } catch (error) {
    next(error);
  }
});

router.get("/perfil", function (req, res, next) {
  try {
    const { role } = req.query;

    if (role) {
      User.findAll({
        where: {
          role: role,
        },
      }).then((resp) => {
        resp.length
          ? res.send(resp)
          : res.send({ message: "No pude acceder a Usuarios" });
      });
    }
  } catch (error) {
    next(error);
  }
});

router.post("/", async function (req, res, next) {
  const { email, full_name, id, role } = req.body;

  if (!email || !full_name || !id) {
    return res.send("Falta información para poder darte de alta el Usuario");
  }
  const user = await User.findOne({
    where: { id: id },
  });

  if (!user) {
    try {
      const newUser = await User.create({
        full_name,
        email,
        id,
        role,
      });
      res.status(200).send("User Created");
    } catch (error) {
      res.status(200).send("Usario ya creado");
      //      next(error)
    }
  }
  //  else {
  //     user.full_name = full_name;
  //     user.email = email;
  //     user.role = role;
  //     if (id) await user.save();
  //     res.json(user);
  // }
});

router.put("/", async (req, res) => {
  const { id, email, full_name, role } = req.body;
  try {
    const user = await User.findOne({
      where: { id },
    });
    user.full_name = full_name;
    user.email = email;
    user.role = role;
    if (id) await user.save();
    res.json(user);
  } catch (error) {
    res.send(error);
  }
});

router.put("/perfil", async (req, res) => {
  const { id, role } = req.query;

  try {
    const user = await User.findOne({
      where: { id },
    });
    user.role = role;
    if (id) await user.save();
    res.json(user);
  } catch (error) {
    res.send(error);
  }
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;
  try {
    let eliminados = await User.destroy({
      where: { id },
    });
    res.send(`Deleted  ${eliminados} registro`);
  } catch (error) {
    res.send(error);
  }
});

module.exports = router;
