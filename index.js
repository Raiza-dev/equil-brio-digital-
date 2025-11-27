import express from "express";
import mongoose from "mongoose";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Conexão com MongoDB
mongoose
  .connect("mongodb+srv://raiza_user:SUA_SENHA@cluster0.b535ncg.mongodb.net/?appName=Cluster0")
  .then(() => console.log("Mongo conectado"))
  .catch((err) => console.error(err));

// Modelo (coleção que você quer mostrar)
const Item = mongoose.model("Item", new mongoose.Schema({}, { strict: false }));

// Rota pública
app.get("/api/public", async (req, res) => {
  const data = await Item.find(); // mostra tudo da coleção
  res.json(data);
});

app.listen(3000, () => console.log("API rodando na porta 3000"));
 
