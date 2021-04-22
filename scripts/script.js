let controleValidacaoInfos = true; // quando tem o valor de true, as informações são válidas
let controleValidacaoPerguntas = true;
let arrayRespostas = [];
let arrayPerguntas = [];
let contadorPerguntasSelecionadas = 0;
let qtdPerguntas = 0;

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
   // validarURL(inputImagem);
   // validarTitulo()
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
                <div onclick="clicarPergunta(this, ${i+1})"class="pergunta">
                    Pergunta ${i+1} 
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            `
            qtdPerguntas = i+1;
        }
    }   

}

function validarURL(valor){
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    var regexp = new RegExp(expression);
    if(regexp.test(valor) === false){
        controleValidacaoInfos = false;
    }
}

function clicarPergunta(perguntaSelecionada, numeroPergunta){
    if(contadorPerguntasSelecionadas!==0){
        
        let objRespostaCorreta = {text: document.querySelector('.ultima-pergunta-selecionada .texto-resposta-correta').value, image: document.querySelector('.ultima-pergunta-selecionada .cor-pergunta').value, isCorrectAnswer: true};
        let objRespostaIncorreta1 = {text: document.querySelector('.ultima-pergunta-selecionada .texto-resposta-incorreta-1').value, image: document.querySelector('.ultima-pergunta-selecionada .imagem-resposta-incorreta-1').value, isCorrectAnswer: false};
        let objRespostaIncorreta2 = {text: document.querySelector('.ultima-pergunta-selecionada .texto-resposta-incorreta-2').value, image: document.querySelector('.ultima-pergunta-selecionada .imagem-resposta-incorreta-2').value, isCorrectAnswer: false};
        let objRespostaIncorreta3 = {text: document.querySelector('.ultima-pergunta-selecionada .texto-resposta-incorreta-3').value, image: document.querySelector('.ultima-pergunta-selecionada .imagem-resposta-incorreta-3').value, isCorrectAnswer: false};
        let objPergunta = {title: document.querySelector('.ultima-pergunta-selecionada .texto-pergunta').value, color: document.querySelector('.ultima-pergunta-selecionada .cor-pergunta').value, answers: []};

        arrayRespostas.push(objRespostaCorreta, objRespostaIncorreta1, objRespostaIncorreta2, objRespostaIncorreta3);
        objPergunta.answers = arrayRespostas;
        arrayPerguntas.push(objPergunta);
        // a array respostas vai entrar na propriedade answers do objetoPergunta 
        selecionarPergunta(perguntaSelecionada, numeroPergunta);

        const ultimaPerguntaSelecionada = document.querySelector('.ultima-pergunta-selecionada')
        ultimaPerguntaSelecionada.classList.remove('ultima-pergunta-selecionada');

        perguntaSelecionada.classList.add('ultima-pergunta-selecionada');
    }
    else{
        perguntaSelecionada.classList.add('ultima-pergunta-selecionada');
        selecionarPergunta(perguntaSelecionada, numeroPergunta);
    }
}

function selecionarPergunta(perguntaSelecionada, numeroPergunta){
   perguntaSelecionada.classList.add('selecionada');
   contadorPerguntasSelecionadas ++;
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
    for(let i = 0; i < arrayPerguntas.length; i++){
        if(!validarUrlPergunta(arrayPerguntas[i].color)){
            alert("suas cores estao erradas");
            return;
        }
    }
    alert('suas cores estao corretas');
}

function validarUrlPergunta(valor){
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    var regexp = new RegExp(expression);
    if(regexp.test(valor) === false){
        return false;
    }else{
        return true;
    }
}

function validarTextoPergunta(){
    // a ser feita
}

function validarTextoRespostaCorreta(){
    // a ser feita 
}

function validarCorPergunta(valor){
    if(valor.length === 7){
        var expression = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/igm
        var regexp = new RegExp(expression);
        if(regexp.test(valor) === false){
            return false;
        }else{
            return true;
        }
    }
}

function criarNiveis(){
    if(qtdPerguntas === contadorPerguntasSelecionadas){
        let objRespostaCorreta = {text: document.querySelector('.ultima-pergunta-selecionada .texto-resposta-correta').value, image: document.querySelector('.ultima-pergunta-selecionada .cor-pergunta').value, isCorrectAnswer: true};
        let objRespostaIncorreta1 = {text: document.querySelector('.ultima-pergunta-selecionada .texto-resposta-incorreta-1').value, image: document.querySelector('.ultima-pergunta-selecionada .imagem-resposta-incorreta-1').value, isCorrectAnswer: false};
        let objRespostaIncorreta2 = {text: document.querySelector('.ultima-pergunta-selecionada .texto-resposta-incorreta-2').value, image: document.querySelector('.ultima-pergunta-selecionada .imagem-resposta-incorreta-2').value, isCorrectAnswer: false};
        let objRespostaIncorreta3 = {text: document.querySelector('.ultima-pergunta-selecionada .texto-resposta-incorreta-3').value, image: document.querySelector('.ultima-pergunta-selecionada .imagem-resposta-incorreta-3').value, isCorrectAnswer: false};
        let objPergunta = {title: document.querySelector('.ultima-pergunta-selecionada .texto-pergunta').value, color: document.querySelector('.ultima-pergunta-selecionada .cor-pergunta').value, answers: []};

        arrayRespostas.push(objRespostaCorreta, objRespostaIncorreta1, objRespostaIncorreta2, objRespostaIncorreta3);
        objPergunta.answers = arrayRespostas;
        arrayPerguntas.push(objPergunta);
    }else{
        alert("Por favor, preencha todas as perguntas.")
    }

    validarPergunta()
    
}






/////////////////////////////////////////////////////////////////////////////////////////
let arrayQuiz;
let arrayClicada;
let perguntasArrayClicada;
let respostasArrayClicada;
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
    perguntasArrayClicada.sort(comparador);

    function comparador() { 
        return Math.random() - 0.5; 
    }

    const corpoPagina = document.querySelector(".page");
    corpoPagina.innerHTML = "";
    corpoPagina.innerHTML =`
    <div class="div-img-topo-quiz">
        <img src="${arrayClicada.image}"/>
        <span>${arrayClicada.title}</span>
    </div>
    `
    for(let i=0; i<arrayClicada.questions.length; i++){
        corpoPagina.innerHTML+=`
        <div class="quiz-elements">
            <div class="opcoes">
                <div class="titulo-opcao" style="background-color: ${arrayClicada.questions[i].color}">
                    <p>${arrayClicada.questions[i].title}</p>
                </div>
                <div class="dimensionar-respostas" id="caixa${i}">
                </div>
            </div>     
        </div>
        `
        for(let j=0; j<perguntasArrayClicada.length-1; j++){ 
            const alocarRespostas = document.getElementById(`caixa${i}`);
            alocarRespostas.innerHTML += `
             <div class="resposta-opcao" onclick="verificarSeCorreto(this.id)" id=${perguntasArrayClicada[i].answers[j].isCorrectAnswer}>
                <img class="img-resposta" src="${perguntasArrayClicada[i].answers[j].image}"/>
                <p>${perguntasArrayClicada[i].answers[j].text}</p>
            </div>
            `
        }
    }
}

function verificarSeCorreto(idCorreto){
    if(idCorreto === "true"){
        alert("Resposta certa!");
    }
    else  if(idCorreto === "false"){
        alert("Resposta errada!");
    }
}