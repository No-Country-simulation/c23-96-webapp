const express = require("express");
const {
  makeTransfer,
} = require("../controllers/transaction/makeTransfer.controller");
const { history } = require("../controllers/transaction/history.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const transactionRouter = express.Router();

transactionRouter.post("/transfer", makeTransfer);

transactionRouter.get("/history", history);

module.exports = transactionRouter;
