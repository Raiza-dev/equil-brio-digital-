
// ==============================
// INICIALIZAÇÃO DO FRONT
// ==============================

document.addEventListener("DOMContentLoaded", () => {
    console.log("Front carregado com sucesso!");

    inicializarBotoes();
    inicializarFormularios();
});


// ==============================
// ATIVAÇÃO DOS BOTÕES
// ==============================

function inicializarBotoes() {
    const botoes = document.querySelectorAll("[data-btn]");
    
    botoes.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("Botão clicado:", btn.dataset.btn);

            // Exemplo de ação específica por botão
            if (btn.dataset.btn === "whatsapp") {
                window.open("https://wa.me/5585991234567", "_blank");
            }

            if (btn.dataset.btn === "agendar") {
                document.querySelector("#formSection").scrollIntoView({ behavior: "smooth" });
            }
        });
    });

    console.log("Botões ativados:", botoes.length);
}


// ==============================
// FORMULÁRIOS
// ==============================

function inicializarFormularios() {
    const forms = document.querySelectorAll("form");

    forms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault();

            const dados = Object.fromEntries(new FormData(form));

            console.log("Enviando dados:", dados);

            try {
                const resposta = await enviarParaBackend(dados);

                if (resposta.ok) {
                    alert("Dados enviados com sucesso!");
                    form.reset();
                } else {
                    const erro = await resposta.json().catch(() => ({}));
                    console.error("Erro do servidor:", erro);
                    alert("Erro ao enviar os dados.");
                }

            } catch (err) {
                console.error("Erro de conexão:", err);
                alert("Não foi possível conectar ao servidor.");
            }
        });
    });

    console.log("Formulários ativados:", forms.length);
}


// ==============================
// INTEGRAÇÃO BACKEND
// ==============================

async function enviarParaBackend(dados) {
    return fetch("https://equil-brio-digital.onrender.com/api/contato", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
}
