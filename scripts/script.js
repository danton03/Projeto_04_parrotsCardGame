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


/* Início da Lógica */

//função de distribuir os gifs
function preparaGifs() {
  //1-Dar uma embaralhada no array de gifs
  parrots.sort(embaralhar); // Após esta linha, a minhaArray estará embaralhada
  function embaralhar() { 
    return Math.random() - 0.5; 
  }
  
  const gifsSelecionados = [];
  
  //2-Pegar alguns gifs desse array (quantidade = numCartas/2)
  //3-copiar esses gifs para outro array duplicando eles (para ter pares de cartas)
  for (let j = 0; j < 2; j++) {
    for (let k = 0; k < numCartas/2; k++) {
      gifsSelecionados.push(parrots[k]);
    }
    gifsSelecionados.sort(embaralhar);
  }

  //4-Pegar esse array construído e retornar ele para distribuir na função adicionaCartas
  return gifsSelecionados;
}

//Função para adicionar os cards no html
function adicionaCartas() {
  const listaGifs = preparaGifs();

  //Distribui as cartas na tela
  for (let i = 0; i < listaGifs.length; i++) {
    cartas.innerHTML += `
    <div class="card" onclick="viraCarta(this)">
      <img class="frente" src=${listaGifs[i].urlImg} alt="parrot-card">
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

//Função que permite o virar as cartas
function viraCarta(carta) {
  carta.classList.add("flip")
}

