const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const providersController = require("../../controllers/providers");

router.post(
  "/register-provider",
  [
    auth,
    [
      check("nombre", "El nombre es requerido").not().isEmpty(),
      check("email", "Incluya un email válido").isEmail(),
      check(
        "password",
        "Ingrese una constraseña con más de 6 caractéres"
      ).isLength({ min: 6 }),
    ],
  ],
  providersController.postRegisterProvider
);

module.exports = router;
