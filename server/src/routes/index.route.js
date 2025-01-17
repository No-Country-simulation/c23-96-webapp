const express = require("express")
const userRouter = require("./users.route");
const authRouter = require("./auth.route");


//instance of Server
const indexRoute = express()

//instance of router
const rootRouter = express.Router();

//users Data
indexRoute.use("/", userRouter);

//Authentication Data
indexRoute.use("/auth", authRouter)



module.exports = indexRoute;



