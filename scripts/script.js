/* variáveis globais */
const listaDeCartas = [
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
  console.log("passou no adicionaCartas");
  console.log("No adiciona cartas:"+numCartas);
  for (let i = 0; i < numCartas; i++) {
    console.log("passou no for");
    cartas.innerHTML += `<div class="card">
    <img src="/images/front.png" alt="parrot-card">
    </div>`; 
  }
}

//to-do: Remover os console.log
//pergunta ao usuário com quantas cartas ele quer jogar
do {
  numCartas = Number(prompt("Com quantas cartas você quer jogar?"));
  console.log(numCartas)
  if (numCartas >= 4 && numCartas <= 14 && numCartas % 2 === 0) {
    adicionaCartas();
    console.log("passou no if");
  }
} while (numCartas % 2 !== 0);

