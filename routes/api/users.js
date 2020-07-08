const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const usersController = require("../../controllers/users");

router.post(
  "/register",
  [
    check("nombre", "El nombre es requerido").not().isEmpty(),
    check("email", "Incluya un email válido").isEmail(),
    check(
      "password",
      "Ingrese una constraseña con más de 6 caractéres"
    ).isLength({ min: 6 }),
  ],
  usersController.postRegisterUser
);
module.exports = router;
