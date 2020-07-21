const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const authController = require("../../controllers/auth");

router.get("/user", auth, authController.getUser);

router.post(
  "/admin/login",
  [
    check("email", "Ingrese un correo electrónico válido").isEmail(),
    check("password", "Ingrese una contraseña").exists(),
  ],
  authController.postLoginUser
);

router.get("/driver", auth, authController.getDriver);

router.post(
  "/driver/login",
  [
    check("email", "Ingrese un correo electrónico válido").isEmail(),
    check("password", "Ingrese una contraseña").exists(),
  ],
  authController.postLoginDriver
);

module.exports = router;
