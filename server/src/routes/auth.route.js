const express = require("express");
const { register } = require("../controllers/auth/register.controller");
const { login } = require("../controllers/auth/login.controller");

const authRouter = express.Router();

authRouter.post("/signup", register)   // api/auth/signup
authRouter.post("/login", login) // api/auth/login

module.exports = authRouter;
