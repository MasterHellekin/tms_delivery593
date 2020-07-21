const { validationResult } = require("express-validator");

const Vehicle = require("../models/Vehicle");

exports.postRegisterVehicle = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let { placa, marca, tipo } = req.body;
  const usuarioId = req.user.id;

  try {
    let vehicle = await Vehicle.findOne({ where: { placa } });

    if (vehicle) {
      return res.status(400).json({ errors: [{ msg: "Vehiculo existente" }] });
    }

    vehicle = await Vehicle.create({
      placa,
      marca,
      tipo,
      usuarioId,
    });

    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

exports.getVehiclesByUser = async (req, res, next) => {
  try {
    const vehicle = await Vehicle.findAll({
      where: { usuarioId: req.user.id },
    });
    res.json(vehicle);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
