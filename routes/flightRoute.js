const express = require("express");
const controller = require("../controllers/flightController");

const router = express.Router();

router.get("/", controller.getAllFlight).get("/:id", controller.getFlight);
router.post("/", controller.createFlight);
router.put("/:id", controller.updateFlight);
router.delete("/:id", controller.deleteFlight);

module.exports = router;
