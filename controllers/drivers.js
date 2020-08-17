const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Driver = require("../models/Driver");
const User = require("../models/User");

exports.postRegisterDriver = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { nomCon, email, password } = req.body;
  const rol = "driver";
  const ultLatitud = 0;
  const ultLongitud = 0;

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
      nomCon,
      email,
      password,
      rol,
      ultLatitud,
      ultLongitud,
      usuarioId,
    });

    res.json(driver);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

exports.getDriversByUser = async (req, res, next) => {
  try {
    const driver = await Driver.findAll({ where: { usuarioId: req.user.id } });
    res.json(driver);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

exports.putDriverLocation = async (req, res, next) => {
  let { ultLatitud, ultLongitud } = req.body;
  let id = req.params.id;
  try {
    const driver = await Driver.update(
      { ultLatitud, ultLongitud },
      { where: { id } }
    );
    res.json(driver);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
