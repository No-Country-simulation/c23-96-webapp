const axios = require("axios");
const createHttpError = require("http-errors");
const accountModel = require("../../models/account");

const OPEN_EXCHANGE_API = "https://openexchangerates.org/api/latest.json";
const APP_ID = process.env.OPEN_EXCHANGE_APP_ID;

module.exports.buyPesos = async (req, res, next) => {
  const { amount } = req.body;
  const { Account } = req.params;

  try {
    if (!amount || amount <= 0) {
      throw createHttpError(400, "El monto debe ser mayor a 0.");
    }

    const account = await accountModel.findOne({ account: Account });

    if (!account) {
      throw createHttpError(404, "Cuenta no encontrada.");
    }

    if (account.balanceDolar < amount) {
      throw createHttpError(400, "Saldo insuficiente en dólares.");
    }

    // getting exchange rate
    const response = await axios.get(`${OPEN_EXCHANGE_API}?app_id=${APP_ID}`);
    const exchangeRate = response.data?.rates?.ARS; // Tasa de cambio de USD a ARS

    if (!exchangeRate) {
      throw createHttpError(500, "No se pudo obtener el tipo de cambio.");
    }

    const pesos = amount / exchangeRate;

    console.log(exchangeRate, pesos);
    account.balanceDolar -= pesos;
    account.balancePeso += amount;

    await account.save();

    res.status(200).json({
      message: "Compra de pesos exitosa",
      exchangeRate,
      dollarsWasted: pesos,
      pesosPurchased: amount, // Amount of pesos purchased in this transaction
      newBalanceDolar: account.balanceDolar,
      newBalancePeso: account.balancePeso,
    });
  } catch (error) {
    next(error);
  }
};
