const mongoose = require("mongoose");
dotenv = require("dotenv");
dotenv.config();

module.exports = () => {
  console.log("Conectando a la DB");
  const connect = () => {
    mongoose
      .connect(process.env.MONGO_CONNECTION)
      .then((db) => {
        console.log(
          `DB is conected on: 
                    Name:${db.connections[0].name}
                    Port:${db.connections[0].port}`
        );
      })
      .catch((er) => {
        console.error(`Error al conectarme a la db`);
        console.error(er);
      });
  };

  connect();
};
