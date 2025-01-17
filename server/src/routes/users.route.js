const express = require("express");

const userRouter = express.Router();

userRouter.route("/").get((req, res) => {
  res.json({ message: "Hola que tal desde users" });
});

module.exports = userRouter;
