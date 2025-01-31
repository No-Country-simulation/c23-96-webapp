const express = require("express");
const {
  makeTransfer,
} = require("../controllers/transaction/makeTransfer.controller");
const {
  cvuTransfer,
} = require("../controllers/transaction/cvuTransfer.controller");
const {
  usernameTransfer,
} = require("../controllers/transaction/usernameTransfer.controller");
const { buyDollars } = require("../controllers/transaction/dolar.controller");
const { history } = require("../controllers/transaction/history.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");
const {
  getTransactionById,
} = require("../controllers/transaction/searchTransfer.controller");

const transactionRouter = express.Router();

transactionRouter.post("/transfer", verifyToken, makeTransfer);
transactionRouter.post("/transfer/cvu", verifyToken, cvuTransfer);
transactionRouter.post("/transfer/username", verifyToken, usernameTransfer);
transactionRouter.post("/buyDollars", verifyToken, buyDollars);

transactionRouter.get("/history", verifyToken, history);
transactionRouter.get("/:id", getTransactionById);

module.exports = transactionRouter;
