const express = require("express");
const { logout } = require("../services/logoutService");
const router = express.Router();

router.get("/", logout);

module.exports = router;
