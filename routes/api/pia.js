const express = require("express");
const router = express.Router();

const auth = require("../../middleware/auth");
const piaController = require("../../controllers/pia");

router.get("/driver/me", auth, piaController.getPiaByDriver);

router.get("/user/me", auth, piaController.getPiaByUser);

router.get("/:orderId", piaController.getPiaByOrderPia);

router.post("/add", auth, piaController.postAddPia);

router.put("/:id", auth, piaController.putStatusPia);

module.exports = router;
