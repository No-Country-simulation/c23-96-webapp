const express = require("express");
const { listUsers } = require("../controllers/auth/listUsers.controller");
const { verifyToken } = require("../utils/verifyToken");

const adminRouter = express.Router();

adminRouter.get("/", verifyToken, listUsers);

module.exports = adminRouter;
