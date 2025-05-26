

const express = require("express");
const { SignUp, SignIn, resetPasword, SendMailAPi } = require("../controllers/Auth.controller");

const routes = express.Router();



routes.post("/signup", SignUp);
routes.post("/signin", SignIn);
routes.post("/reset-password", resetPasword);
routes.post("/sendmail", SendMailAPi);



module.exports = routes;