const express = require("express");
const { listUsers } = require("../controllers/admin/listUsers.controller");
const { history } = require("../controllers/admin/adminHistory.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const adminRouter = express.Router();

adminRouter.get("/", verifyToken, listUsers);
adminRouter.get("/history", history);

module.exports = adminRouter;
