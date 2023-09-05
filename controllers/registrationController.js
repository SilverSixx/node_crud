const express = require("express");

const router = express.Router();

const { register, enableUser } = require("../services/registrationService");

router.post("/register", register);
router.get("/register", enableUser);

module.exports = router;
