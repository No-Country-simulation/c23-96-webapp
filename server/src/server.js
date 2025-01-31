const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const indexRoute = require("./routes/index.route");
const connect = require("./config/db");
const morgan = require("morgan")

//Llamo a la variables de entorno
dotenv.config();
//Conexión a Basde de Datos
connect();

const server = express();

server.use(express.json());

const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

//Security Config
server.use(helmet());
server.use(cors(corsOptions));

server.use(morgan())

server.use((req, res, next) => {
  res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');
  res.set('Pragma', 'no-cache');
  res.set('Expires', '0');
  next();
});


//Routes in Server
server.use("/api", indexRoute);

//Alwais api Redirect
server.get("/", (req, res) => {
  res.redirect("/api");
});

const PORT = process.env.PORT || 4000;

server.listen(PORT, () => {
  console.log(`Server listen in http://localhost:${PORT}`);
});
