const express = require("express");

const router = express.Router();

//item model
const Item = require("../../models/Item");

/**
 * @route GET api/items
 * @desc Get all items
 * @access Publi
 * La ruta será solamente / porque en server.js definimos que la ruta por defecto de Items será /api/items
 * Esto porque estamos en otro archivo y estamos usando router de express Router()
 * Si estuviesemos definiendo los end-points en server.js usaríamos /api/items
 */
router.get("/", (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then(items => res.json(items));
});

/**
 * @route POST api/items
 * @desc Crea un item
 * @access Publi
 * La ruta será solamente / porque en server.js definimos que la ruta por defecto de Items será /api/items
 * Esto porque estamos en otro archivo y estamos usando router de express Router()
 * Si estuviesemos definiendo los end-points en server.js usaríamos /api/items
 */
router.post("/", (req, res) => {
  const newItem = new Item({
    name: req.body.name // gracias a bodyparser
  });
  newItem.save().then(item => res.json(item));
});

/**
 * @route DELETE api/items
 * @desc Borra un item
 * @access Publi
 * La ruta será solamente / porque en server.js definimos que la ruta por defecto de Items será /api/items
 * Esto porque estamos en otro archivo y estamos usando router de express Router()
 * Si estuviesemos definiendo los end-points en server.js usaríamos /api/items
 */
router.delete("/:id", (req, res) => {
  Item.findById(req.params.id)
    .then(item => item.remove().then(() => res.json({ success: true })))
    .catch(error =>
      res
        .status(404)
        .json({ success: false, messaje: "El ID que indicas no existe" })
    );
});

module.exports = router;
