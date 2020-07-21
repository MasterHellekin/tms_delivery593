const express = require("express");
const router = express.Router();
const { check } = require("express-validator");

const auth = require("../../middleware/auth");
const providersController = require("../../controllers/providers");

router.post(
  "/register",
  [
    auth,
    [
      check("nomPro", "El nombre es requerido").not().isEmpty(),
      check("email", "Incluya un email válido").isEmail(),
    ],
  ],
  providersController.postRegisterProvider
);

router.get("/providers", auth, providersController.getProvidersByUser);

module.exports = router;
