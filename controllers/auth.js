const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");

const User = require("../models/User");
const Driver = require("../models/Driver");

exports.getUser = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.postLoginUser = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await User.findOne({ where: { email } });

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

exports.getDriver = async (req, res, next) => {
  try {
    const driver = await Driver.findByPk(req.user.id);
    res.json(driver);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

exports.postLoginDriver = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    let user = await Driver.findOne({ where: { email } });

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
