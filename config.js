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
   BLOQUEAR DATA PASSADA
================================= */

const campoData = document.getElementById("data");

if (campoData) {
    const hoje = new Date().toISOString().split("T")[0];
    campoData.setAttribute("min", hoje);
}

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
    const data = document.getElementById("data").value;
    const horario = document.getElementById("horario").value;

    /* BLOQUEAR CAMPOS VAZIOS */
    if (marca === "" || modelo === "" || placa === "" || estado === "" || data === "" || horario === "") {
        alert("Preencha todos os campos para continuar.");
        return;
    }

    /* VALIDAR DATA */
    const hojeDate = new Date();
    const dataSelecionada = new Date(data);

    hojeDate.setHours(0,0,0,0);
    dataSelecionada.setHours(0,0,0,0);

    if (dataSelecionada < hojeDate) {
        alert("Você não pode escolher uma data anterior a hoje.");
        return;
    }

    const servico = servicoEscolhido.innerText.replace("Serviço escolhido: ", "");

    const numero = "5554996815700";

    const mensagem =
    "⚠️AGENDAMENTO IBIZA" + "%0A%0A" + 
    "⚠️Serviço: " + servico + "%0A" +
    "⚠️Marca: " + marca + "%0A" +
    "⚠️Modelo: " + modelo + "%0A" +
    "⚠️Placa: " + placa + "%0A%0A" +
    "⚠️Estado: " + estado + "%0A" +
    "⚠️Data: " + data + "%0A" +
    "⚠️Horário: " + horario + "%0A%0A" +
    ""+
    "⚠️ Gostaria de confirmar se há disponibilidade para este horário.";

    window.open("https://wa.me/" + numero + "?text=" + mensagem, "_blank");
});

/* ===============================
   ORÇAMENTO PERSONALIZADO
================================= */

document.getElementById("enviar").addEventListener("click", function () {

    const nome = document.getElementById("nome").value.trim();
    const pedido = document.getElementById("pedido").value.trim();

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
   AUTO PLAY VIDEOS
================================= */

const videos = document.querySelectorAll(".video-card");

const observerVideo = new IntersectionObserver((entries) => {
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
    observerVideo.observe(video);
});

/* ===============================
   MENU HAMBURGUER
================================= */

const hamburguer = document.getElementById("hamburguer");
const menuLinks = document.getElementById("menuLinks");
const fecharMenu = document.getElementById("fecharMenu");

hamburguer.addEventListener("click", function () {
    menuLinks.classList.add("ativo");
});

fecharMenu.addEventListener("click", function () {
    menuLinks.classList.remove("ativo");
});

/* ===============================
   EFEITO MENU AO ROLAR
================================= */

const menu = document.querySelector(".menu");

window.addEventListener("scroll", function () {
    if (window.scrollY > 40) {
        menu.classList.add("scroll");
    } else {
        menu.classList.remove("scroll");
    }
});

/* ===============================
   ANIMAÇÃO AO SCROLL
================================= */

const elementosAnimar = document.querySelectorAll(`
.card-servico,
.video-card,
.carro-item,
.escrita,
.personalizado,
#sobre,
iframe,
.footer-col,
.susp,
.servicos h2,
.subtitulo
`);

elementosAnimar.forEach(el => {
    el.classList.add("sumir-scroll");
});

const observerScroll = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("aparecer-scroll");
        }
    });
}, {
    threshold: 0.15
});

elementosAnimar.forEach(el => {
    observerScroll.observe(el);
});