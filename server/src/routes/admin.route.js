const express = require("express");
const { listUsers } = require("../controllers/admin/listUsers.controller");
const { history } = require("../controllers/admin/adminHistory.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");
const { newOffer } = require("../controllers/admin/offer/newOffer.controller");
const {
  getOffers,
} = require("../controllers/admin/offer/getOffers.controller");
const {
  updateOffer,
} = require("../controllers/admin/offer/updateOffer.controller");
const {
  deleteOffer,
} = require("../controllers/admin/offer/deleteOffer.controller");

const adminRouter = express.Router();

adminRouter.get("/", verifyToken, listUsers);
adminRouter.get("/history", history);

adminRouter.post("/newOffer", newOffer);
adminRouter.get("/offers", getOffers);
adminRouter.put("/offers/:id", updateOffer);
adminRouter.delete("/offers/:id", deleteOffer);

module.exports = adminRouter;
