let controleValidacaoInfos = true; // quando tem o valor de true, as informações são válidas
let controleValidacaoPerguntas = true;
// let objPergunta = {title: '', color: '', answers: []};
// let objResposta = {text: "", image: "", isCorrectAnswer: Boolean};

function enviarInfosQuiz(){
    document.querySelector('body').innerHTML = `
    <div class="topo">
        <h1>BuzzQuizz</h1>
    </div>
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
    const inputImagem = document.querySelector('.input-imagem').value;
    validarURL(inputImagem);
    validarTitulo()
    validarQtdPerguntas();
    validarQtdNiveis();
    validarInfos(controleValidacaoInfos);
}

function validarURL(valor){
    
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    var regexp = new RegExp(expression);
    if(regexp.test(valor) === false){
        controleValidacaoInfos = false;
    }
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
        const inputQtdPerguntas = document.querySelector('.input-qtd-perguntas').value;

        document.querySelector('body').innerHTML = `
        <div class="topo">
            <h1>BuzzQuizz</h1>
        </div>
        <div class="container-criar-perguntas">
            <h2 class="instrucoes-criando-perguntas">Crie suas perguntas</h2>
            <div class="container-perguntas"></div>
            <button onclick="criarNiveis()">Prosseguir para criar níveis</button> <!-- criar niveis -->
        </div>
        `
        const containerPerguntas = document.querySelector('.container-perguntas');
        for(let i = 0; i < Number(inputQtdPerguntas); i++){
            containerPerguntas.innerHTML += `
                <div onclick="selecionarPergunta(this, ${i+1})"class="pergunta">
                    Pergunta ${i+1} 
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            `
        }
    }
}

function selecionarPergunta(perguntaSelecionada, numeroPergunta){
   perguntaSelecionada.classList.toggle('selecionada');
   perguntaSelecionada.removeAttribute('onclick');
   perguntaSelecionada.innerHTML = `
        <div class = "dados-pergunta">    
            <h2> Pergunta ${numeroPergunta}</h2>
            <input class="texto-pergunta" type="text" placeholder="Texto da pergunta">
            <input class="cor-pergunta" type="text" placeholder="Cor de fundo da pergunta">
            <h2> Resposta Correta</h2>
            <input class="texto-resposta-correta type="text" placeholder="Resposta correta">
            <input class="imagem-resposta-correta" type="text" placeholder="URL da imagem">
            <h2> Resposta Incorretas</h2>
            <div class = "container-respostas-incorretas">
                <div>
                    <input class="texto-resposta-incorreta-1" type="text" placeholder="Resposta incorreta 1">
                    <input class="imagem-resposta-incorreta-1" type="text" placeholder="URL da imagem 1">
                </div>
                
                <div>
                    <input class="texto-resposta-incorreta-2" type="text" placeholder="Resposta incorreta 2">
                    <input class="imagem-resposta-incorreta-2" type="text" placeholder="URL da imagem 2">
                </div>
                
                <div>    
                    <input class="texto-resposta-incorreta-3" type="text" placeholder="Resposta incorreta 3">
                    <input class="imagem-resposta-incorreta-3" type="text" placeholder="URL da imagem 3">   
                </div> 
            </div>
       </div> 
    `
    
}

function validarPergunta(){
    const corPergunta = document.querySelector('.cor-pergunta').value;
    arrayQuestions[0] = document.querySelector('.cor-pergunta').value;
    console.log(arrayQuestions);
}

function validarTextoPergunta(){
    // a ser feita
}

function validarCorPergunta(valor){
    if(valor.length === 7){
        var expression = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/igm
        var regexp = new RegExp(expression);
        if(regexp.test(valor) === false){
            controleValidacaoPerguntas = false;
        }else{
            controleValidacaoPerguntas = true;
        }
    }else{
        controleValidacaoPerguntas = false;
    }
}

function validarTextoRespostaCorreta(){

   /* if(textoResposta === "" || textoResposta === null){
        controleValidacaoInfos = false;
    }           */
}

function criarNiveis(){
    // a ser feita
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