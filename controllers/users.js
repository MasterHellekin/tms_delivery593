const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const config = require("config");

const User = require("../models/User");
const Option = require("../models/Option");

exports.postRegisterUser = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { nombre, email, password } = req.body;
  const rol = "admin";

  try {
    let option = await Option.findByPk(1);
    let user = await User.findOne({ where: { email } });

    if (option.canRegister >= 1) {
      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: "El usuario ya existe" }] });
      }

      const salt = await bcrypt.genSalt(10);

      password = await bcrypt.hash(password, salt);

      await User.create({ nombre, email, password, rol });

      user = await User.findOne({ where: { email } });

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
          res.json({ msg: "Usuario creado", token });
        }
      );
    } else {
      return res
        .status(400)
        .json({ errors: [{ msg: "No se puede registrar nuevos usuarios" }] });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
