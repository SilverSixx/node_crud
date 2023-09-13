const express = require("express");
const passport = require("passport");
const { isLoggedIn } = require("../middleware/login");
const router = express.Router();

router.get(
    "/",
    passport.authenticate("google", { scope: ["email", "profile"] })
);
router.get(
    "/callback",
    passport.authenticate("google", {
        successRedirect: "/auth/google/protected",
        failureRedirect: "/auth/google/error",
    })
);
router.get("/protected", isLoggedIn, (req, res) => {
    res.status(200).json({
        msg: "You are authenticated",
    });
});
router.get("/error", (req, res) => {
    res.status(400).json({
        success: false,
        msg: "Error authenticated with Google",
    });
});

module.exports = router;
