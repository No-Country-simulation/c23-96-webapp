const axios = require("axios");
const createHttpError = require("http-errors");
const accountModel = require("../../models/account");

const OPEN_EXCHANGE_API = "https://openexchangerates.org/api/latest.json";
const APP_ID = process.env.OPEN_EXCHANGE_APP_ID;

module.exports.buyDollars = async (req, res, next) => {
  const { amount } = req.body;
  const userId = req.body.user._id;

  try {
    if (!amount || amount <= 0) {
      throw createHttpError(400, "El monto debe ser mayor a 0.");
    }

    const account = await accountModel.findOne({ user: userId });
    if (!account) {
      throw createHttpError(404, "Cuenta no encontrada.");
    }

    if (account.balancePeso < amount) {
      throw createHttpError(400, "Saldo insuficiente.");
    }

    // Get exchange rate from OpenExchangeRates
    const response = await axios.get(`${OPEN_EXCHANGE_API}?app_id=${APP_ID}`);
    const exchangeRate = response.data?.rates?.ARS; // Exchange rate USD to ARS

    if (!exchangeRate) {
      throw createHttpError(500, "No se pudo obtener el tipo de cambio.");
    }

    // Calculate dollars bought
    const dollarsBought = amount / exchangeRate;

    // Update balance in account
    account.balancePeso -= amount;
    account.balanceDolar += dollarsBought;
    await account.save();

    res.status(200).json({
      message: "Compra de dólares exitosa",
      exchangeRate,
      dollarsBought,
      newBalancePeso: account.balancePeso,
      newBalanceDolar: account.balanceDolar,
    });
  } catch (error) {
    next(error);
  }
};
