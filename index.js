const express = require("express");
const morgan = require("morgan");
require("dotenv").config();

const register = require("./controllers/registrationController");

const app = express();

app.use(morgan("tiny"));
// parse to json
app.use(express.json());
// parse the form data
app.use(express.urlencoded({ extended: false }));
// use the controller of endpoints
app.use("/api/v1/register", register);

let server = app.listen(process.env.PORT || 3000, function () {
    console.log(`Server listening on port ${server.address().port}`);
});
