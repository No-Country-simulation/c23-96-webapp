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
} = require("../controllers/admin/offer/deleteOffers.controller");
const adminRouter = express.Router();

adminRouter.get("/", verifyToken, listUsers);
adminRouter.get("/history", history);
adminRouter.post("/offer", newOffer);
adminRouter.get("/offer", getOffers);
adminRouter.delete("/offer/:id", deleteOffer);
adminRouter.put("/offer/:id", updateOffer);

module.exports = adminRouter;
