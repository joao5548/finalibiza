/* ===============================
   IBIZA - CONFIG.JS
================================= */

/* BLOQUEAR ZOOM CELULAR */
document.addEventListener("gesturestart", function (e) {
    e.preventDefault();
});

let ultimoToque = 0;

document.addEventListener("touchend", function (e) {
    let agora = new Date().getTime();

    if (agora - ultimoToque <= 300) {
        e.preventDefault();
    }

    ultimoToque = agora;
}, { passive: false });

/* ===============================
   MODAL AGENDAMENTO
================================= */

const modal = document.getElementById("modalAgendar");
const fecharModal = document.getElementById("fecharModal");
const servicoEscolhido = document.getElementById("servicoEscolhido");

const botoesServico = document.querySelectorAll(".btn-servico");

botoesServico.forEach(botao => {
    botao.addEventListener("click", function (e) {
        e.preventDefault();

        const servico = this.getAttribute("data-servico");

        servicoEscolhido.innerHTML = "Serviço escolhido: <strong>" + servico + "</strong>";

        modal.style.display = "flex";
    });
});

/* FECHAR MODAL */
fecharModal.addEventListener("click", function () {
    modal.style.display = "none";
});

window.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.style.display = "none";
    }
});

/* ===============================
   WHATSAPP AGENDAMENTO
================================= */

document.getElementById("confirmarAgendamento").addEventListener("click", function () {

    const marca = document.getElementById("marca").value.trim();
    const modelo = document.getElementById("modelo").value.trim();
    const placa = document.getElementById("placa").value.trim();
    const estado = document.getElementById("estado").value.trim();

    /* BLOQUEAR CAMPOS VAZIOS */
    if (marca === "" || modelo === "" || placa === "" || estado === "") {
        alert("Preencha todos os campos para continuar.");
        return;
    }

    const servico = servicoEscolhido.innerText.replace("Serviço escolhido: ", "");

    const numero = "5554996815700";

    const mensagem =
        "Olá, gostaria de agendar um serviço.%0A%0A" +
        "Serviço: " + servico + "%0A" +
        "Marca: " + marca + "%0A" +
        "Modelo: " + modelo + "%0A" +
        "Placa: " + placa + "%0A" +
        "Estado: " + estado;

    window.open("https://wa.me/" + numero + "?text=" + mensagem, "_blank");
});

/* ===============================
   ORÇAMENTO PERSONALIZADO
================================= */

document.getElementById("enviar").addEventListener("click", function () {

    const nome = document.getElementById("nome").value.trim();
    const pedido = document.getElementById("pedido").value.trim();

    /* BLOQUEAR CAMPOS VAZIOS */
    if (nome === "" || pedido === "") {
        alert("Preencha nome e pedido para enviar.");
        return;
    }

    const numero = "5554996815700";

    const mensagem =
        "Olá, gostaria de um orçamento personalizado.%0A%0A" +
        "Nome: " + nome + "%0A" +
        "Pedido: " + pedido;

    window.open("https://wa.me/" + numero + "?text=" + mensagem, "_blank");
});

/* ===============================
   AUTO PLAY VIDEOS AO APARECER
================================= */

const videos = document.querySelectorAll(".video-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.play();
        } else {
            entry.target.pause();
        }
    });
}, {
    threshold: 0.5
});

videos.forEach(video => {
    observer.observe(video);
});

/* MENU HAMBURGUER */

const hamburguer = document.getElementById("hamburguer");
const menuLinks = document.getElementById("menuLinks");
const fecharMenu = document.getElementById("fecharMenu");

hamburguer.addEventListener("click", function () {
    menuLinks.classList.add("ativo");
});

fecharMenu.addEventListener("click", function () {
    menuLinks.classList.remove("ativo");
});

/* COLOQUE NO FINAL DO JS */

const menu = document.querySelector(".menu");

window.addEventListener("scroll", function () {
    if (window.scrollY > 40) {
        menu.classList.add("scroll");
    } else {
        menu.classList.remove("scroll");
    }
});