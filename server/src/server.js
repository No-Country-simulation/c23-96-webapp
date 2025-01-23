const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const indexRoute = require("./routes/index.route");
const connect = require("./config/db");

//Llamo a la variables de entorno
dotenv.config();
//Conexión a Basde de Datos
connect();

const server = express();

server.use(express.json());

const PORT = 4000;

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

//Security Config
server.use(helmet());
server.use(cors(corsOptions));

//Routes in Server
server.use("/api", indexRoute);

//Alwais api Redirect
server.get("/", (req, res) => {
  res.redirect("/api");
});

server.listen(PORT, () => {
  console.log(`Server listen in http://localhost:${PORT}`);
});
