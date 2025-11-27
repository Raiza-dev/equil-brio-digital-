
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

const MONGO_URL = process.env.MONGO_URL || "mongodb://localhost:27017/equilibrio";

mongoose.connect(MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("MongoDB conectado"))
  .catch(err => console.error("Erro MongoDB:", err));

// Rotas
app.get("/", (req, res) => res.send("API Equilíbrio Digital funcionando!"));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("Servidor rodando na porta", PORT));
