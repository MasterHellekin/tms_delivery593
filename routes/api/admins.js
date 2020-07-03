const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const adminsController = require("../../controllers/admins");

router.post(
  "/register-admin",
  [
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("email", "Incluya un email válido").isEmail(),
    check(
      "password",
      "Ingrese una constraseña con más de 6 caractéres"
    ).isLength({ min: 6 }),
  ],
  adminsController.postRegisterAdmin
);
module.exports = router;
