const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const driversController = require("../../controllers/drivers");

router.post(
  "/register",
  [
    auth,
    [
      check("nombre", "El nombre es requerido").not().isEmpty(),
      check("email", "Incluya un email válido").isEmail(),
      check(
        "password",
        "Ingrese una contraseña de más de 6 caractéres"
      ).isLength({ min: 6 }),
    ],
  ],
  driversController.postRegisterDriver
);

module.exports = router;
