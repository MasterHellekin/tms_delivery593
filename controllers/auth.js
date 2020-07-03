const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const Admin = require("../models/Admin");

exports.postLoginAdmin = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await Admin.findOne({ where: { email } });

    if (!user) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Usuario y/o contraseña inválidas" }] });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res
        .status(400)
        .json({ errors: [{ msg: "Usuario y/o contraseña inválidas" }] });
    }

    const payload = {
      user: {
        id: user.id,
        rol: user.rol,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      {
        expiresIn: 3600,
      },
      (err, token) => {
        if (err) throw err;
        res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
