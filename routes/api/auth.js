const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const authController = require("../../controllers/auth");

router.post(
  "/login-admin",
  [
    check("email", "Ingrese un correo electrónico válido").isEmail(),
    check("password", "Ingrese una contraseña").exists(),
  ],
  authController.postLoginAdmin
);

module.exports = router;
