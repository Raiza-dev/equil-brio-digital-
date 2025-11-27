
document.addEventListener("DOMContentLoaded", () => {
    console.log("Front carregado com sucesso!");

    inicializarBotoes();
    inicializarFormularios();
});


// ==============================
// FUNÇÃO PARA BOTÕES CLICÁVEIS
// ==============================
function inicializarBotoes() {
    const botoes = document.querySelectorAll("[data-btn]");
    
    botoes.forEach(btn => {
        btn.addEventListener("click", () => {
            console.log("Botão clicado:", btn.dataset.btn);
        });
    });

    console.log("Botões ativados:", botoes.length);
}


// ==============================
// FORMULÁRIOS E ENVIOS
// ==============================
function inicializarFormularios() {
    const forms = document.querySelectorAll("form");

    forms.forEach(form => {
        form.addEventListener("submit", async (e) => {
            e.preventDefault(); // NÃO recarrega a página

            const dados = Object.fromEntries(new FormData(form));
            console.log("Enviando dados:", dados);

            try {
                const resposta = await enviarParaBackend(dados);

                if (resposta.ok) {
                    alert("Dados enviados com sucesso!");
                    form.reset();
                } else {
                    alert("Erro no servidor.");
                }

            } catch (err) {
                console.error("Erro ao enviar:", err);
                alert("Erro de conexão com o servidor.");
            }
        });
    });

    console.log("Formulários preparados:", forms.length);
}


// ==============================
// FUNÇÃO PRINCIPAL DE INTEGRAÇÃO
// ==============================
async function enviarParaBackend(dados) {
    return fetch("https://SUA-URL-DO-BACKEND.com/api", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(dados)
    });
}
