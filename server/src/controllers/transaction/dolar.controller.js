const axios = require("axios");
const createHttpError = require("http-errors");
const accountModel = require("../../models/account");
const userModel = require("../../models/user");

const OPEN_EXCHANGE_API = "https://openexchangerates.org/api/latest.json";
const APP_ID = process.env.OPEN_EXCHANGE_APP_ID;
const limit = 500; // Límite diario solo para cuentas tipo "user"

module.exports.buyDollars = async (req, res, next) => {
  const { amount } = req.body;
  const { Account } = req.params;

  try {
    console.log(req.body);
    if (!amount || amount <= 0) {
      throw createHttpError(400, "El monto debe ser mayor a 0.");
    }

    // Buscar cuenta en la base de datos
    const account = await accountModel.findOne({ account: Account });
    if (!account) {
      throw createHttpError(404, "Cuenta no encontrada.");
    }

    // Search user
    const user = await userModel.findOne({ Account: account._id });

    // Apply daily limit only if user is of type "user"
    if (user?.rol === "user" && (account.dollarsBought || 0) + amount > limit) {
      throw createHttpError(
        400,
        "Límite diario de compra de dólares excedido."
      );
    }

    // get exchange rate from OpenExchangeRates
    const response = await axios.get(`${OPEN_EXCHANGE_API}?app_id=${APP_ID}`);
    const exchangeRate = response.data?.rates?.ARS; // Tasa de cambio de USD a ARS

    if (!exchangeRate) {
      throw createHttpError(500, "No se pudo obtener el tipo de cambio.");
    }

    // Calculate dollars bought
    const dollars = amount * exchangeRate;

    if (account.balancePeso < dollars) {
      throw createHttpError(400, "Saldo insuficiente.");
    }

    console.log(account.balancePeso, account.balanceDolar);

    // Update account balances
    account.balancePeso -= dollars;
    account.balanceDolar += amount;
    account.dollarsBought = (account.dollarsBought || 0) + amount;

    await account.save();

    res.status(200).json({
      message: "Compra de dólares exitosa",
      exchangeRate,
      dollarsBought: account.dollarsBought,
      dollarsPurchased: amount,
      pesosWasted: dollars,
      newBalancePeso: account.balancePeso,
      newBalanceDolar: account.balanceDolar,
    });
  } catch (error) {
    next(error);
  }
};
