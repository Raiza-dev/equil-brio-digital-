require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: ["https://raiza-dev.github.io"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

// Conexão MongoDB Atlas
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB conectado"))
  .catch((err) => console.error("❌ Erro MongoDB:", err));

// ===========================
// ROTAS PÚBLICAS
// ===========================

// Modelo simples para ler qualquer documento
const TestSchema = new mongoose.Schema({}, { strict: false });
const TestModel = mongoose.model("public_tests", TestSchema);

// Rota pública que seu professor consegue abrir
app.get("/public", async (req, res) => {
  try {
    const data = await TestModel.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send("Erro ao buscar dados");
  }
});

// ===========================
// ROTAS NORMAIS DA SUA API
// ===========================
app.get("/", (req, res) => {
  res.send("API Equilíbrio Digital funcionando!");
});

app.use("/api/contact", require("./routes/contact"));
app.use("/api/events", require("./routes/events"));
app.use("/api/forum", require("./routes/forum"));

// Porta Render
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log("🚀 Servidor rodando na porta " + PORT));
