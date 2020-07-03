const { QueryTypes } = require("sequelize");

const Location = require("../models/Location");

exports.getLocationByPia = async (req, res, next) => {
  try {
    const piaId = req.params.id;
    const pia = await Location.sequelize.query(
      `SELECT id FROM pia WHERE pedido_pia=${piaId}`,
      { type: QueryTypes.SELECT }
    );
    pia_id = pia[0].id;
    const location = await Location.findOne({ where: { piaId: pia_id } });
    res.json(location);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: "Error del servidor" });
  }
};
