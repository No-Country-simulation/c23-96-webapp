const express = require("express");
const {
  makeTransfer,
} = require("../controllers/transaction/makeTransfer.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const transactionRouter = express.Router();

transactionRouter.post("/transfer", makeTransfer);

module.exports = transactionRouter;
