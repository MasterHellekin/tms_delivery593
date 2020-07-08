const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const Driver = require("../models/Driver");
const User = require("../models/User");

exports.postRegisterDriver = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { nombre, email, password } = req.body;
  const rol = "driver";

  try {
    let driver = await Driver.findOne({ where: { email } });
    let user = await User.findOne({ where: req.user.id });

    if (driver) {
      return res
        .status(400)
        .json({ errors: [{ msg: "El conductor ya existe" }] });
    }

    const usuarioId = user.id;

    const salt = await bcrypt.genSalt(10);

    password = await bcrypt.hash(password, salt);

    driver = await Driver.create({
      nombre,
      email,
      password,
      rol,
      usuarioId,
    });

    res.json(driver);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
