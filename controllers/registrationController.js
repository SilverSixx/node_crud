const express = require("express");

const router = express.Router();

const { register, enableUser } = require("../services/registrationService");

router.post("/", register);
router.get("/", enableUser);

module.exports = router;

