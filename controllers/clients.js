const { validationResult } = require("express-validator");

const Client = require("../models/Client");

exports.postRegisterClient = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let {
    cedula,
    nomCli,
    provincia,
    ciudad,
    calle,
    telf1,
    telf2,
    email,
  } = req.body;
  const usuarioId = req.user.id;

  try {
    let client = await Client.findOne({ where: { email } });

    if (client) {
      return res.status(400).json({ errors: [{ msg: "Proveedor existente" }] });
    }

    client = await Client.create({
      cedula,
      nomCli,
      provincia,
      ciudad,
      calle,
      telf1,
      telf2,
      email,
      usuarioId,
    });

    res.json(client);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

exports.getClientByUser = async (req, res, next) => {
  try {
    const vehicle = await Client.findAll({
      where: { usuarioId: req.user.id },
    });
    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
