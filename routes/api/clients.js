const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const clientsController = require("../../controllers/clients");

router.post(
  "/register",
  [
    auth,
    [
      check("nomCli", "El nombre es requerido").not().isEmpty(),
      check("email", "Incluya un email válido").isEmail(),
    ],
  ],
  clientsController.postRegisterClient
);

router.get("/clients", auth, clientsController.getClientByUser);

module.exports = router;
