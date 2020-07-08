const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const authController = require("../../controllers/auth");

router.post(
  "/admin/login",
  [
    check("email", "Ingrese un correo electrónico válido").isEmail(),
    check("password", "Ingrese una contraseña").exists(),
  ],
  authController.postLoginUser
);

router.post(
  "/driver/login",
  [
    check("email", "Ingrese un correo electrónico válido").isEmail(),
    check("password", "Ingrese una contraseña").exists(),
  ],
  authController.postLoginDriver
);

module.exports = router;
