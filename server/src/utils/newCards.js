const CardModel = require("../models/cardSchema");

function generateRandomNumber(length) {
  let result = "";
  for (let i = 0; i < length; i++) {
    result += Math.floor(Math.random() * 10);
  }
  return result;
}

async function createDebitCards(accountId, userName) {
  try {
    // Datos comunes
    const expirationDate = "12/" + (new Date().getFullYear() + 5).toString().slice(-2); // Fecha de expiración lógica: 5 años desde hoy

    // Crear tarjeta en pesos
    const pesoCard = await CardModel.create({
      name: userName.toUpperCase(),
      cardNumber: generateRandomNumber(16),
      expirationDate,
      cvv: generateRandomNumber(3),
      type: "peso",
      account: accountId,
    });

    // Crear tarjeta en dólares
    const dolarCard = await CardModel.create({
      name: userName.toUpperCase(),
      cardNumber: generateRandomNumber(16),
      expirationDate,
      cvv: generateRandomNumber(3),
      type: "dolar",
      account: accountId,
    });

    console.log("Tarjetas creadas exitosamente", { pesoCard, dolarCard });
    return { pesoCard, dolarCard };
  } catch (error) {
    console.error("Error creando las tarjetas:", error.message);
    throw error;
  }
}

module.exports = { createDebitCards };
