require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const sequelize = require("./config/sequelize");
const session = require("express-session");
const passport = require("passport");

const loginWithGG = require("./controllers/loginWithGGController");
const register = require("./controllers/registrationController");
const logout = require("./controllers/logoutController");

const app = express();

// Middleware
app.use(
    session({
        secret: process.env.SECRET_KEY,
        resave: false,
        saveUninitialized: true,
    })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/auth/google", loginWithGG);
app.use("/api/v1/register", register);
app.use("/logout", logout);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
});

// Database synchronization
sequelize
    .sync()
    .then(() => {
        console.log("Tables created successfully.");
    })
    .catch((error) => {
        console.error("Error creating tables:", error);
    });

// Start the server
const server = app.listen(process.env.PORT || 3000, function () {
    console.log(`Server listening on port ${server.address().port}`);
});
