// js/app.js

// URL do backend (já configurada)
const BACKEND_URL = "https://equil-brio-digital.onrender.com/api/contato";

// Espera DOM
document.addEventListener("DOMContentLoaded", () => {
  // Ano no footer
  document.getElementById("ano").textContent = new Date().getFullYear();

  // Menu mobile
  const btnMenu = document.getElementById("btnMenu");
  const mobileMenu = document.getElementById("mobileMenu");
  if (btnMenu) {
    btnMenu.addEventListener("click", () => {
      mobileMenu.classList.toggle("hidden");
    });
  }

  // Smooth scroll para âncoras
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener("click", function (e) {
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        // fecha menu mobile se estiver aberto
        if (!mobileMenu.classList.contains("hidden")) mobileMenu.classList.add("hidden");
      }
    });
  });

  // Inicializa botões com data-btn
  document.querySelectorAll("[data-btn]").forEach(btn => {
    btn.addEventListener("click", () => {
      const action = btn.dataset.btn;
      if (action === "whatsapp") {
        // Ajuste o número abaixo para o seu
        window.open("https://wa.me/5585991234567", "_blank");
      } else if (action === "agendar") {
        const target = document.querySelector("#contato");
        if (target) target.scrollIntoView({ behavior: "smooth" });
      } else if (action === "inscrever") {
        // você pode tratar a inscrição aqui
        alert("Obrigado! Em breve entraremos em contato para finalizar a inscrição.");
      } else {
        console.log("Botão:", action);
      }
    });
  });

  // Eventos: abrir modal
  document.querySelectorAll("[data-event-open]").forEach(btn => {
    btn.addEventListener("click", () => {
      try {
        const payload = JSON.parse(btn.getAttribute("data-event-open"));
        abrirModalEvento(payload);
      } catch (err) {
        console.error("Erro ao abrir evento:", err);
      }
    });
  });

  // Lógica do modal
  const modal = document.getElementById("modalEvent");
  const modalClose = document.getElementById("modalClose");
  const modalInscrever = document.getElementById("modalInscrever");
  if (modalClose) modalClose.addEventListener("click", fecharModal);
  if (modal) modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModal();
  });

  if (modalInscrever) modalInscrever.addEventListener("click", () => {
    alert("Inscrição registrada. Entraremos em contato!");
    fecharModal();
  });

  // Formulário contato
  const form = document.getElementById("formContato");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const statusEl = document.getElementById("formStatus");
      statusEl.textContent = "Enviando...";
      const dados = Object.fromEntries(new FormData(form));

      try {
        const res = await fetch(BACKEND_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(dados),
        });

        if (res.ok) {
          statusEl.textContent = "Enviado com sucesso!";
          form.reset();
        } else {
          const json = await res.json().catch(() => ({}));
          console.error("Erro no envio:", json);
          statusEl.textContent = "Erro ao enviar. Tente novamente.";
        }
      } catch (err) {
        console.error("Erro de conexão:", err);
        statusEl.textContent = "Erro de conexão. Tente novamente.";
      }

      setTimeout(() => { statusEl.textContent = ""; }, 4000);
    });
  }
});

// Funções auxiliares
function abrirModalEvento(payload) {
  const modal = document.getElementById("modalEvent");
  if (!modal) return;
  document.getElementById("modalTitle").textContent = payload.title || "";
  document.getElementById("modalDesc").textContent = payload.desc || "";
  document.getElementById("modalImg").src = payload.img || "";
  document.getElementById("modalDate").textContent = payload.date || "";
  modal.classList.remove("hidden");
  modal.style.display = "flex";
}

function fecharModal() {
  const modal = document.getElementById("modalEvent");
  if (!modal) return;
  modal.classList.add("hidden");
  modal.style.display = "none";
}
