const express = require("express");
const router = express.Router();

const locationsController = require("../../controllers/locations");

router.get("/:id", locationsController.getLocationByPia);

module.exports = router;
