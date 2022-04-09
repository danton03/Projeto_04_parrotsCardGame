/* variáveis globais */
const parrots = [
  { nome: "bobrossparrot", urlImg: "../images/bobrossparrot.gif" },
  { nome: "explodyparrot", urlImg: "../images/explodyparrot.gif" },
  { nome: "fiestaparrot", urlImg: "../images/fiestaparrot.gif" },
  { nome: "metalparrot", urlImg: "../images/metalparrot.gif" },
  { nome: "revertitparrot", urlImg: "../images/revertitparrot.gif" },
  { nome: "tripletsparrot", urlImg: "../images/tripletsparrot.gif" },
  { nome: "unicornparrot", urlImg: "../images/unicornparrot.gif" },
];

let numCartas = 0;
let numJogadas = 0;
let numClicadas = 0;
let acertos = 0;
let cliquesSeguidos = 0;

//variável que pega a div onde os cards estão dispostos
const cartas = document.querySelector(".cards");


/* Início da Lógica */

/*                    Preparação das cartas do Jogo                   */

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
    for (let k = 0; k < numCartas / 2; k++) {
      gifsSelecionados.push(parrots[k]);
    }
    gifsSelecionados.sort(embaralhar);
  }

  //4-Pegar esse array construído e retornar ele para distribuir na função adicionaCartas
  return gifsSelecionados;
}

/*                    Montando as cartas do na tela                   */

//Função para adicionar os cards no html
function adicionaCartas() {
  const listaGifs = preparaGifs();

  //Distribui as cartas na tela
  for (let i = 0; i < listaGifs.length; i++) {
    cartas.innerHTML += `
    <div class="card" name=${listaGifs[i].nome} onclick="viraCarta(this)">
      <img class="frente" src=${listaGifs[i].urlImg} alt="parrot-card">
      <img class="verso" src="../images/front.png"" alt="parrot-card">
    </div>
    `;
  }
}

//Função que inicia o jogo
function iniciarJogo(){
  //Repete a pergunta enquanto não figitar um número válido
  do {
    //pergunta ao usuário com quantas cartas ele quer jogar
    numCartas = Number(prompt("Com quantas cartas você quer jogar?"));
    if (numCartas >= 4 && numCartas <= 14 && numCartas % 2 === 0) {
      adicionaCartas();
    }
  } while (numCartas % 2 !== 0 || numCartas < 4 || numCartas > 14);
}

iniciarJogo(); //Iniciando o jogo pela primeira vez

/*                    Comparando as cartas clicadas                    */

function verifica(cartaClicada) {
  //Verifica se o usuário já encontrou o par dessa carta
  const cartaIsDisabled = cartaClicada.classList.contains("desabilitada");
  console.log("Desabilitada: " + cartaIsDisabled); //Remover depois

  //Só irá comparar se o usuário ainda não encontrou o par dessa carta
  if (cartaIsDisabled === false) {
    numClicadas++; //numero de cartas que o usuário clicou para comparar

    //Se for a primeira carta clicada
    if (numClicadas === 1) {
      cartaClicada.classList.add("carta1");
    }

    //Se for a segunda carta clicada faz a comparação
    if (numClicadas === 2) {
      cartaClicada.classList.add("carta2");

      //Variáveis necessárias na comparação
      const carta1 = document.querySelector(".carta1");
      const carta2 = document.querySelector(".carta2");

      //Pega o nome das cartas para comparar

      /* Repare que esse nome é um dos atributos definidos 
      na lista de objetos chamada parrots e é repassado como
      atributo name no elemento HTML criado na função adiciona cartas */
      const nomeCarta1 = carta1.getAttribute("name");
      const nomeCarta2 = carta2.getAttribute("name");

      /* Deixa as cartas viradas por 1s antes de chamar a função 
      que compara as cartas. Isso permite que o usuário veja as cartas */
      setTimeout(comparaCartas, 1000);

      //Função que compara as cartas
      function comparaCartas() {
        numJogadas += numClicadas; //contabiliza quantidade de jogadas
        //Caso as cartas sejam iguais
        if (nomeCarta1 === nomeCarta2) {
          //Adiciona a classe "desabilitada" para impedir que sejam comparadas novamente
          carta1.classList.add("desabilitada");
          carta2.classList.add("desabilitada");
          acertos++;
          
          /* verifica se o jogo acabou */
          if (acertos === numCartas/2) {
            alert(`Você ganhou em ${numJogadas} jogadas!"`); //informa ao usuário
            jogarNovamente();
          }
        }
        //Se forem diferentes
        else {
          //Desvira as cartas
          carta1.classList.remove("flip");
          carta2.classList.remove("flip");
        }

        //Remove a classe que indica as cartas a serem comparadas
        carta1.classList.remove("carta1");
        carta2.classList.remove("carta2");

        //Reseta as variáveis utilizadas para entrar nos condicionais
        numClicadas = 0;
        cliquesSeguidos = 0;
      }
    }
  }
}

/*                        Virando as cartas                     */
function viraCarta(carta) {
  //Evitando que o usuário clique em mais de 2 cartas seguidas e o jogo dê bug
  cliquesSeguidos++;
  if (cliquesSeguidos <= 2) {
    carta.classList.add("flip"); //vira a carta
    //chama a função de verificar as cartas passando o elemento HTML recebido
    verifica(carta);
  }
}

function jogarNovamente() {
  let resposta;
  do {
    resposta = prompt("Deseja jogar novamente? (sim ou não)").toLowerCase();
    console.log("resposta: "+resposta);
    console.log("resposta: "+(resposta=="não"));
  } while (resposta !== "sim" && resposta!== "não")

  //Caso queira jogar novamente
  if(resposta === "sim"){
    //reseta as variáveis
    numCartas = 0;
    numJogadas = 0;
    numClicadas = 0;
    acertos = 0;
    cliquesSeguidos = 0;
    cartas.innerHTML = "";
    iniciarJogo(); //chama a função que inicia o jogo
  }
  //Caso não queira jogar novamente
  else if (resposta === "não"){
    alert("Tudo bem, você já pode fechar a página do jogo.\nEspero que tenha se divertido! :)");
  }
}

