const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { QueryTypes } = require("sequelize");

const Pia = require("../models/Pia");

exports.getPiaByOrderPia = async (req, res, next) => {
  try {
    const orderPia = req.params.orderId;
    const pia = await Pia.sequelize.query(
      `SELECT p.id, p.pedidoPia, p.pedidoCliente, p.descripcion, p.fecSalida, p.fecLlegada, p.dirLlegada, p.latLlegada, p.lonLlegada, p.estado, u.nombre, v.placa, d.nomCon, c.nomCli
    FROM pia p, usuarios u, vehiculos v, conductores d, clientes c
    WHERE p.pedidoPia=${orderPia}
    AND p.usuarioId=u.id
    AND p.vehiculoId=v.id
    AND p.conductoreId=d.id
    AND p.clienteId=c.id`,
      { type: QueryTypes.SELECT }
    );

    res.json(pia);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

exports.getPiaByDriver = async (req, res, next) => {
  try {
    const driverId = req.user.id;
    const pia = await Pia.findAll({ where: { conductoreId: driverId } });

    res.json(pia);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

exports.getPiaByUser = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const pia = await Pia.sequelize.query(
      `SELECT p.id, p.pedidoPia, p.pedidoCliente, p.descripcion, p.fecSalida, p.fecLlegada, p.dirLlegada, p.latLlegada, p.lonLlegada, p.estado, v.placa, d.nomCon, c.nomCli
      FROM pia p, vehiculos v, conductores d, clientes c
      WHERE p.usuarioId=${userId}
      AND p.vehiculoId=v.id
      AND p.conductoreId=d.id
      AND p.clienteId=c.id`,
      { type: QueryTypes.SELECT }
    );

    res.json(pia);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

exports.postAddPia = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  let {
    pedidoPia,
    pedidoCliente,
    descripcion,
    fecSalida,
    fecLlegada,
    dirLlegada,
    latLlegada,
    lonLlegada,
    estado,
    vehiculoId,
    conductoreId,
    clienteId,
  } = req.body;
  const usuarioId = req.user.id;

  try {
    let pia = await Pia.findOne({ where: { pedidoPia } });

    if (pia) {
      return res.status(400).json({ errors: [{ msg: "Pia ya existente" }] });
    }

    pia = await Pia.create({
      pedidoPia,
      pedidoCliente,
      descripcion,
      fecSalida,
      fecLlegada,
      dirLlegada,
      latLlegada,
      lonLlegada,
      estado,
      usuarioId,
      vehiculoId,
      conductoreId,
      clienteId,
    });

    res.json(pia);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};

exports.putStatusPia = async (req, res, next) => {
  let { estado } = req.body;
  let piaId = req.params.id;
  try {
    const pia = await Pia.update({ estado }, { where: { id: piaId } });
    res.json(pia);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
