const express = require("express");
const { listUsers } = require("../controllers/admin/listUsers.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const adminRouter = express.Router();

adminRouter.get("/", listUsers);

module.exports = adminRouter;
