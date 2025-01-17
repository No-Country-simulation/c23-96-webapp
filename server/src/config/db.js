const mongoose = require("mongoose");

module.exports = () => {
  const connect = () => {
    mongoose
      .connect(env.MONGO_CONNECTION)
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
