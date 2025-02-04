const express = require("express");
const { listUsers } = require("../controllers/admin/listUsers.controller");
const { history } = require("../controllers/admin/adminHistory.controller");
const { verifyToken } = require("../middlewares/verifyToken.middleware");

const adminRouter = express.Router();

adminRouter.get("/", verifyToken, listUsers);
adminRouter.get("/history", history);

// adminRouter.post("/newOffer", newOffer);
// adminRouter.get("/offers", getOffers);
// adminRouter.put("/offers/:id", updateOffer);
// adminRouter.delete("/offers/:id", deleteOffer);

module.exports = adminRouter;
