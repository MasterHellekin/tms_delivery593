const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

const Provider = require("../models/Provider");
const Admin = require("../models/Admin");

exports.postRegisterProvider = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { nombre, email, password } = req.body;

  try {
    let provider = await Provider.findOne({ where: { email } });
    let admin = await Admin.findOne({ where: req.user.id });

    if (provider) {
      return res.status(400).json({ errors: [{ msg: "Proveedor existente" }] });
    }

    if (admin.rol !== "admin") {
      return res.status(403).json({
        errors: [
          { msg: "Sus credenciales no le permiten realizar esta acción" },
        ],
      });
    }

    const administradoreId = admin.id;

    const salt = await bcrypt.genSalt(10);

    password = await bcrypt.hash(password, salt);

    provider = await Provider.create({
      nombre,
      email,
      password,
      administradoreId,
    });

    res.json(provider);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
