const cron = require("node-cron");
const accountModel = require("../models/account");

// Tarea que se ejecuta todos los días a medianoche (00:00)
cron.schedule("0 0 * * *", async () => {
  try {
    await accountModel.updateMany(
      {},
      { transferredPeso: 0, transferredDolar: 0, dollarsBought: 0 }
    );
    console.log("Daily Limit has been reset.");
  } catch (error) {
    console.error("Error reseting daily Limit:", error);
  }
});

module.exports = cron;
