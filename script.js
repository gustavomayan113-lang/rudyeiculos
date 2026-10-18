// Número do WhatsApp da loja (55 + DDD + número)
const WHATSAPP = "5571991455776";

const carros = [
  { nome: "Toyota Corolla XEi", tipo: "Sedan", ano: 2019, km: "58.000 km", cambio: "Automático", preco: 98900, img: "img/carro1.jpg" },
  { nome: "Toyota Yaris XL", tipo: "Hatch", ano: 2020, km: "42.000 km", cambio: "Automático", preco: 74900, img: "img/carro2.jpg" },
  { nome: "Hyundai Creta Limited", tipo: "SUV", ano: 2022, km: "31.000 km", cambio: "Automático", preco: 119900, img: "img/carro3.jpg" },
  { nome: "Toyota Corolla GLi", tipo: "Sedan", ano: 2018, km: "71.000 km", cambio: "Automático", preco: 86500, img: "img/carro1.jpg" },
  { nome: "Toyota Yaris XS", tipo: "Hatch", ano: 2019, km: "55.000 km", cambio: "Manual", preco: 66900, img: "img/carro2.jpg" },
  { nome: "Hyundai Creta Action", tipo: "SUV", ano: 2021, km: "48.000 km", cambio: "Automático", preco: 104900, img: "img/carro3.jpg" }
];

const moeda = v => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const linkZap = msg => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(msg)}`;

function renderizar(tipo) {
  const grade = document.getElementById("grade");
  const lista = tipo === "todos" ? carros : carros.filter(c => c.tipo === tipo);
  grade.innerHTML = lista.map(c => `
    <article class="card">
      <img src="${c.img}" alt="${c.nome}" loading="lazy">
      <div class="card-info">
        <small>${c.tipo}</small>
        <h3>${c.nome}</h3>
        <div class="specs"><span>📅 ${c.ano}</span><span>🛣️ ${c.km}</span><span>⚙️ ${c.cambio}</span></div>
        <div class="preco">${moeda(c.preco)}</div>
        <a class="btn-zap" target="_blank" rel="noopener"
           href="${linkZap(`Olá! Tenho interesse no ${c.nome} ${c.ano} (${moeda(c.preco)}) que vi no site da Rudy Veículos.`)}">
           Tenho interesse
        </a>
      </div>
    </article>`).join("");
}

document.querySelectorAll("#filtros button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.querySelector("#filtros .ativo").classList.remove("ativo");
    btn.classList.add("ativo");
    renderizar(btn.dataset.tipo);
  });
});

document.querySelectorAll(".zap-geral").forEach(a => {
  a.href = linkZap("Olá! Vim pelo site da Rudy Veículos e gostaria de mais informações.");
  a.target = "_blank";
  a.rel = "noopener";
});

const menu = document.getElementById("menu");
document.getElementById("menuBtn").addEventListener("click", () => menu.classList.toggle("aberto"));
menu.querySelectorAll("a").forEach(a => a.addEventListener("click", () => menu.classList.remove("aberto")));

document.getElementById("ano").textContent = new Date().getFullYear();
renderizar("todos");
