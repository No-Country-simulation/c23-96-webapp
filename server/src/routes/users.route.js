const express = require("express");
const userRouter = express.Router();
const { getCurrentUser } = require("../controllers/user/searchUser.controller");

userRouter.route("/").get((req, res) => {
  res.json({ message: "Hola que tal desde users" });
});

userRouter.route("/inicio", getCurrentUser);

module.exports = userRouter;
