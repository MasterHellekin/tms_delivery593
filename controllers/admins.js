const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Admin = require("../models/Admin");

exports.postRegisterAdmin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { nombre, email, password } = req.body;
  const rol = "admin";

  try {
    let admin = await Admin.findOne({ where: { email } });

    if (admin) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Administrador existente" }] });
    }

    const salt = await bcrypt.genSalt(10);

    password = await bcrypt.hash(password, salt);

    await Admin.create({ nombre, email, password, rol });

    //let user = await Admin.findOne({ where: { email } });

    res.json({ msg: "Admin creado" });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
