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

const transactionRouter = express.Router();

transactionRouter.post("/transfer", makeTransfer);
transactionRouter.post("/transfer/cvu", verifyToken, cvuTransfer);
transactionRouter.post("/transfer/username", usernameTransfer);
transactionRouter.post("/buyDollars", verifyToken, buyDollars);

transactionRouter.get("/history", history);

module.exports = transactionRouter;
