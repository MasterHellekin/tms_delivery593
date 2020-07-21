const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const vehiclesController = require("../../controllers/vehicles");

router.post(
  "/register",
  [auth, [check("placa", "La placa es requerida").not().isEmpty()]],
  vehiclesController.postRegisterVehicle
);

router.get("/vehicles", auth, vehiclesController.getVehiclesByUser);

module.exports = router;
