/* variáveis globais */
const parrots = [
  {nome: "bobrossparrot", urlImg: "../images/bobrossparrot.gif"},
  {nome: "explodyparrot", urlImg: "../images/explodyparrot.gif"},
  {nome: "fiestaparrot", urlImg: "../images/fiestaparrot.gif"},
  {nome: "metalparrot", urlImg: "../images/metalparrot.gif"},
  {nome: "revertitparrot", urlImg: "../images/revertitparrot.gif"},
  {nome: "tripletsparrot", urlImg: "../images/tripletsparrot.gif"},
  {nome: "unicornparrot", urlImg: "../images/unicornparrot.gif"},
];

let numCartas = 0;

//variável que pega a div onde os cards estão dispostos
const cartas = document.querySelector(".cards");

//Função para adicionar os cards no html
function adicionaCartas() {
  for (let i = 0; i < numCartas; i++) {
    cartas.innerHTML += `
    <div class="card" onclick="viraCarta(this)">
      <img class="frente" src=${parrots[2].urlImg} alt="parrot-card">
      <img class="verso" src="../images/front.png" alt="parrot-card">
    </div>
    `; 
  }
}

//to-do: Remover os console.log
//pergunta ao usuário com quantas cartas ele quer jogar
do {
  numCartas = Number(prompt("Com quantas cartas você quer jogar?"));
  if (numCartas >= 4 && numCartas <= 14 && numCartas % 2 === 0) {
    adicionaCartas();
  }
} while (numCartas % 2 !== 0 || numCartas < 4 || numCartas > 14);

function viraCarta(carta) {
  carta.classList.add("flip")
}