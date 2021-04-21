let controleValidacaoInfos = true; // quando tem o valor de true, as informações são válidas

function enviarInfosQuiz(){
    const pagQuiz = document.querySelector('.pagina-criando-quiz');
    pagQuiz.classList.remove('escondido');
    pagQuiz.innerHTML = `
    <div class="container-novo-quiz">
            <h2 class="instrucoes-criando-quiz">Comece pelo começo</h2>
            <div class="inputs-novos-quiz">
                <input value="" class="input-titulo" type="text" placeholder="Titulo do seu quizz">
                <input value="" class="input-imagem" type="text" placeholder="URL da imagem do seu quizz">
                <input value="" class="input-qtd-perguntas" type="text" placeholder="Quantidade de perguntas do quizz">
                <input value="" class="input-qtd-niveis" type="text" placeholder="Quantidade de níveis do quizz">
            </div>
            <button onclick="criarPerguntas()">Prosseguir para as perguntas</button>
        </div>
    `
}

function criarPerguntas(){
    //const inputImagem = document.querySelector('.input-imagem').value;
    //ainda nao implementei a validaçao da URL
    validarTitulo()
    validarQtdPerguntas();
    validarQtdNiveis();
    validarInfos(controleValidacaoInfos);
}

function validarTitulo(){
    const inputTitulo = document.querySelector('.input-titulo').value;
    if((typeof inputTitulo !=='string' || inputTitulo.length < 20 || inputTitulo.length > 60) === true ){
        controleValidacaoInfos = false;
    }
}

function validarQtdNiveis(){
    const inputQtdNiveis = document.querySelector('.input-qtd-niveis').value;
    if((isNaN(Number(inputQtdNiveis)) || inputQtdNiveis < 2) === true ){
        controleValidacaoInfos = false;
    }
}

function validarQtdPerguntas(){
    const inputQtdPerguntas = document.querySelector('.input-qtd-perguntas').value;
    if((isNaN(Number(inputQtdPerguntas)) || inputQtdPerguntas < 3) === true ){
        controleValidacaoInfos = false;
    }
}

function validarInfos(validacao){
    if(validacao === false){
        alert('Dados inválidos. Por favor, preencha novamente.')
        controleValidacaoInfos = true;
        enviarInfosQuiz();
    }else{
        const pagQuiz = document.querySelector('.pagina-criando-quiz');
        const inputQtdPerguntas = document.querySelector('.input-qtd-perguntas').value;

        pagQuiz.innerHTML = `
        <div class="container-criar-perguntas">
            <h2 class="instrucoes-criando-perguntas">Crie suas perguntas</h2>
            <div class="container-perguntas"></div>
            <button onclick="criarNiveis()">Prosseguir para criar níveis</button>
        </div>
        `
        const containerPerguntas = document.querySelector('.container-perguntas');
        for(let i = 0; i < Number(inputQtdPerguntas); i++){
            containerPerguntas.innerHTML += `
                <div onclick="selecionarPergunta(this)"class="pergunta">
                    Pergunta ${i+1} 
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            `
        }
    }
}

function selecionarPergunta(elemento){
   const perguntaClicada = elemento;
   perguntaClicada.classList.add();
   alert("faz alguma coisa");
}
/////////////////////////////////////////////////////////////////////////////////////////
let arrayQuiz;
let arrayClicada;
let perguntasArrayClicada;
const obterQuiz = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes');
obterQuiz.then(quizzRecebido);

function quizzRecebido(retorno){
    arrayQuiz = retorno.data;
    const quizzPadrao = document.querySelector(".holder");
    for(let i=0; i<arrayQuiz.length; i++){
        quizzPadrao.innerHTML += `
                <div class="quiz" id=${i+1} onclick="responderQuiz(this.id)">
                    <img class="quiz-image" src="${arrayQuiz[i].image}"/>
                    <span>${arrayQuiz[i].title}</span>
                </div>  
        `
    }
}

function responderQuiz(id_clicado){
    arrayClicada = arrayQuiz[id_clicado-1];
    perguntasArrayClicada = arrayClicada.questions;
    const corpoPagina = document.querySelector(".page");
    corpoPagina.innerHTML = "";
    corpoPagina.innerHTML =`
    <div class="div-img-topo-quiz">
        <img src="${arrayClicada.image}"/>
    </div>
    `
    for(let i=0; i<arrayClicada.questions["length"]; i++){
        corpoPagina.innerHTML+=`<div class="quiz-elements">
        <div class="opcoes" id="caixa${i}">
            <div class="titulo-opcao" style="background-color: ${arrayClicada.questions[i].color}">
                <p>${arrayClicada.questions[i].title}</p>
            </div>
        </div>     
    </div>`
        for(let j=0; j<perguntasArrayClicada["length" - 1]; j++){
            const alocarRespostas = document.querySelector(".opcoes");
            alocarRespostas.innerHTML += `
             <div class="resposta-opcao">
                ${perguntasArrayClicada[i].answers[j].text}
            </div>
            `
        }
    }
  
    alert(id_clicado);
}