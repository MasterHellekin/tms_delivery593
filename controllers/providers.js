const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Provider = require("../models/Provider");

exports.postRegisterProvider = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { nombre, email } = req.body;
  const usuarioId = req.user.id;

  try {
    let provider = await Provider.findOne({ where: { email } });

    if (provider) {
      return res.status(400).json({ errors: [{ msg: "Proveedor existente" }] });
    }

    provider = await Provider.create({
      nombre,
      email,
      usuarioId,
    });

    res.json(provider);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
