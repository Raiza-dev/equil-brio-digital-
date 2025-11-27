
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

// URL do seu backend hospedado no Render
const API_BASE = "https://equil-brio-digital.onrender.com";

// Exemplo de GET: buscar eventos do banco
async function fetchEvents() {
  try {
    const res = await fetch(`${API_BASE}/events`);
    const events = await res.json();
    console.log("Eventos carregados do banco:", events);
    // aqui você vai exibir no HTML depois
  } catch (err) {
    console.error("Erro ao buscar eventos:", err);
  }
}

// Exemplo de POST: criar um evento
async function createEvent(data) {
  try {
    const res = await fetch(`${API_BASE}/events/create`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const result = await res.json();
    console.log("Evento criado:", result);
  } catch (err) {
    console.error("Erro ao criar evento:", err);
  }
}

// Executa automaticamente quando a página carrega
window.onload = () => {
  fetchEvents();
};
