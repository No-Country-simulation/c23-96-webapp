const express = require("express")
const userRouter = require("./users.route");


//instance of Server
const indexRoute = express()

//instance of router
const rootRouter = express.Router();


indexRoute.use("/", userRouter)


module.exports = indexRoute;



