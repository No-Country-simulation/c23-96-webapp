const axios = require("axios");
const createHttpError = require("http-errors");
const accountModel = require("../../models/account");
const userModel = require("../../models/user");

const OPEN_EXCHANGE_API = "https://openexchangerates.org/api/latest.json";
const APP_ID = process.env.OPEN_EXCHANGE_APP_ID;
const limit = 10; // Límite diario de compra de dólares

module.exports.buyDollars = async (req, res, next) => {
  const { amount } = req.body;
  const { Account } = req.params;

  try {
    if (!amount || amount <= 0) {
      throw createHttpError(400, "El monto debe ser mayor a 0.");
    }

    // Buscar cuenta en la base de datos
    const account = await accountModel.findOne({ account: Account });
    const user = await userModel.findOne({ Account: account._id });

    if (!account) {
      throw createHttpError(404, "Cuenta no encontrada.");
    }

    if (user?.rol === "user") {
      if (account.dollarsBought + amount > limit) {
        throw createHttpError(
          400,
          "Límite diario de transferencias en pesos excedido."
        );
      }
    }

    if (account.balancePeso < amount) {
      throw createHttpError(400, "Saldo insuficiente.");
    }

    // Inicializar el límite diario si no existe
    account.dollarsBought = account.dollarsBought || 0;

    // Verificar si se excede el límite diario
    if (account.dollarsBought + amount > DAILY_DOLLAR_LIMIT) {
      throw createHttpError(
        400,
        "Límite diario de compra de dólares excedido."
      );
    }

    // Obtener la tasa de cambio desde OpenExchangeRates
    const response = await axios.get(`${OPEN_EXCHANGE_API}?app_id=${APP_ID}`);
    const exchangeRate = response.data?.rates?.ARS; // Tasa de cambio de USD a ARS

    if (!exchangeRate) {
      throw createHttpError(500, "No se pudo obtener el tipo de cambio.");
    }

    // Calcular la cantidad de dólares comprados
    const dollars = amount / exchangeRate;

    // Actualizar saldos en la cuenta
    account.balancePeso -= amount;
    account.balanceDolar += dollars;
    account.dollarsBought += amount;

    await account.save();

    res.status(200).json({
      message: "Compra de dólares exitosa",
      exchangeRate,
      dollarsBought: account.dollarsBought, // Mostrar la cantidad total comprada en el día
      dollarsPurchased: dollars, // Monto de dólares comprados en esta transacción
      newBalancePeso: account.balancePeso,
      newBalanceDolar: account.balanceDolar,
    });
  } catch (error) {
    next(error);
  }
};
