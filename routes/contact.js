const express = require("express");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    console.log("Contato recebido:", req.body);

    res.status(201).json({
      message: "Contato recebido com sucesso!",
      data: req.body
    });
  } catch (err) {
    res.status(500).json({ message: "Erro ao enviar contato" });
  }
});

module.exports = router;
