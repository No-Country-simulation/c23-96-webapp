const express = require("express");
const userRouter = require("./users.route");
const authRouter = require("./auth.route");
const adminRouter = require("./admin.route");

//instance of Server
const indexRoute = express();

//instance of router
const rootRouter = express.Router();

//users Data
indexRoute.use("/", userRouter);

//Authentication Da
indexRoute.use("/auth", authRouter);

//Admin Functions
indexRoute.use("/admin", adminRouter);

module.exports = indexRoute;
