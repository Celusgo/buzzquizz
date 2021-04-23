let objetoQuiz = {title: "", image: "", questions: [], levels: []}
let temSegundaRespostaIncorreta = false;
let temTerceiraRespostaIncorreta = false;
let arrayPerguntas = [];
let arrayNiveis = [];
let qtdPerguntas = 0;
let qtdNiveis = 0;
let tituloObjeto = "";
let imagemObjeto = "";

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
            <button onclick="validarInfos()">Prosseguir para as perguntas</button>
        </div>
    `
}

function validarTitulo(inputTitulo){
    if((typeof inputTitulo !=='string' || inputTitulo.length < 20 || inputTitulo.length > 60) === true ){
        return false;
    }else{
        return true;
    }
}

function validarQtdNiveis(inputQtdNiveis){
    if((isNaN(Number(inputQtdNiveis)) || inputQtdNiveis < 2) === true ){
        return false;
    }else{
        return true;
    }
}

function validarQtdPerguntas(inputQtdPerguntas){
    if((isNaN(Number(inputQtdPerguntas)) || inputQtdPerguntas < 3) === true ){
        return false;
    }else{
        return true;
    }
}

function validarURL(valor){
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi
    var regexp = new RegExp(expression);
    if(regexp.test(valor)){
        return true;
    }else{
        return false;
    }
}

function validarInfos(){
    const inputTitulo = document.querySelector('.input-titulo').value;
    const inputImagem = document.querySelector('.input-imagem').value;
    const inputQtdPerguntas = document.querySelector('.input-qtd-perguntas').value;
    const inputQtdNiveis = document.querySelector('.input-qtd-niveis').value;
    
    qtdNiveis = Number(inputQtdNiveis);
    qtdPerguntas = Number(inputQtdPerguntas);

    if((validarURL(inputImagem) || validarTitulo(inputTitulo) || validarQtdPerguntas(inputQtdNiveis) || validarQtdNiveis(inputQtdPerguntas)) === false){
        alert("Informações incorretas");
    }else{
        tituloObjeto = inputTitulo;   //  objetoQuiz.title = inputTitulo;   //  objetoQuiz.title = tituloObjeto;
        imagemObjeto = inputImagem;     // objetoQuiz.image = inputImagem;  // objetoQuiz.image = imagemObjeto;
        criarPerguntas (inputQtdPerguntas);         
    }
}

function criarPerguntas (numeroPerguntas){
        document.querySelector('body').innerHTML = `
        <div class="topo">
            <h1>BuzzQuizz</h1>
        </div>
        <div class="container-criar-perguntas">
            <h2 class="instrucoes-criando-perguntas">Crie suas perguntas</h2>
            <div class="container-perguntas"></div>
            <button onclick="validarPerguntas()">Prosseguir para criar níveis</button> 
        </div>
    `
        const containerPerguntas = document.querySelector('.container-perguntas');
        for(let i = 0; i < Number(numeroPerguntas); i++){
            containerPerguntas.innerHTML += `
                <div onclick="selecionarPergunta(this, ${i+1})"class="pergunta">
                    Pergunta ${i+1} 
                    <ion-icon name="create-outline"></ion-icon>
                </div>
            `
        }
}
function selecionarPergunta(perguntaSelecionada, numeroPergunta){
    perguntaSelecionada.classList.add('selecionada');
    perguntaSelecionada.removeAttribute('onclick');
    perguntaSelecionada.innerHTML = `
         <div class = "dados-pergunta pergunta${numeroPergunta}">    
             <h2> Pergunta ${numeroPergunta}</h2>
             <input value="" class="texto-pergunta texto-pergunta${numeroPergunta}" type="text" placeholder="Texto da pergunta">
             <input value="" class="cor-pergunta cor-pergunta${numeroPergunta}" type="text" placeholder="Cor de fundo da pergunta">
             <h2> Resposta Correta</h2>
             <input value="" class="texto-resposta-correta texto-resposta-correta${numeroPergunta}"type="text" placeholder="Resposta correta">
             <input value="" class="imagem-resposta-correta imagem-resposta-correta${numeroPergunta}" type="text" placeholder="URL da imagem">
             <h2> Resposta Incorretas</h2>
             <div class = "container-respostas-incorretas">
                 <div>
                     <input value="" class="texto-resposta-incorreta-1 texto-resposta-incorreta-1${numeroPergunta}" type="text" placeholder="Resposta incorreta 1">
                     <input value="" class="imagem-resposta-incorreta-1 imagem-resposta-incorreta-1${numeroPergunta}" type="text" placeholder="URL da imagem 1">
                 </div>
                 
                 <div>
                     <input value="" class="texto-resposta-incorreta-2 texto-resposta-incorreta-2${numeroPergunta}" type="text" placeholder="Resposta incorreta 2">
                     <input value="" class="imagem-resposta-incorreta-2 imagem-resposta-incorreta-2${numeroPergunta}" type="text" placeholder="URL da imagem 2">
                 </div>
                 
                 <div>    
                     <input value="" class="texto-resposta-incorreta-3 texto-resposta-incorreta-3${numeroPergunta}" type="text" placeholder="Resposta incorreta 3">
                     <input value="" class="imagem-resposta-incorreta-3 imagem-resposta-incorreta-3${numeroPergunta}" type="text" placeholder="URL da imagem 3">   
                 </div> 
             </div>
        </div> 
     `
 }
 function validarCor(valor){
    if(valor.length === 7){
        var expression = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/igm
        var regexp = new RegExp(expression);
        if(regexp.test(valor) === false){
            return false;
        }else{
            return true;
        }
    }else{
        return false;
    }
}

 function validarPerguntas(){
    
    let validadorPerguntas = true;


    for(let i = 0; i < qtdPerguntas; i++){
    const textoPergunta = document.querySelector(`.pergunta${i+1} .texto-pergunta${i+1}`).value;
    const corPergunta = document.querySelector(`.pergunta${i+1} .cor-pergunta${i+1}`).value;
    const respostaCorreta = document.querySelector(`.pergunta${i+1} .texto-resposta-correta${i+1}`).value;
    const imagemRespostaCorreta = document.querySelector(`.pergunta${i+1} .imagem-resposta-correta${i+1}`).value;
    const RespostaErrada1 = document.querySelector(`.pergunta${i+1} .texto-resposta-incorreta-1${i+1}`).value;
    const imagemRespostaErrada1 = document.querySelector(`.pergunta${i+1} .imagem-resposta-incorreta-1${i+1}`).value;
    const RespostaErrada2 = document.querySelector(`.pergunta${i+1} .texto-resposta-incorreta-2${i+1}`).value;
    const imagemRespostaErrada2 = document.querySelector(`.pergunta${i+1} .imagem-resposta-incorreta-2${i+1}`).value;
    const RespostaErrada3 = document.querySelector(`.pergunta${i+1} .texto-resposta-incorreta-3${i+1}`).value;
    const imagemRespostaErrada3 = document.querySelector(`.pergunta${i+1} .imagem-resposta-incorreta-3${i+1}`).value;
    
    if(validarCor(corPergunta) == false || validarURL(imagemRespostaCorreta) == false || validarURL(imagemRespostaErrada1) == false || respostaCorreta == "" || textoPergunta == "" || textoPergunta.length < 20 ||  RespostaErrada1 == ""){
        validadorPerguntas = false;
    }
    
    if(RespostaErrada2 !== ""){
        temSegundaRespostaIncorreta = true;
    }
    if(RespostaErrada3 !== ""){
        temTerceiraRespostaIncorreta = true
    }
    if(temSegundaRespostaIncorreta == true){
        if((validarURL(imagemRespostaErrada2)[i+1]) == false){
            validadorPerguntas = false;
        }
    }
    if(temTerceiraRespostaIncorreta == true){
        if((validarURL(imagemRespostaErrada3)[i+1]) == false){
            validadorPerguntas = false;
        }
    }
    objetoQuiz.questions.push({title: textoPergunta, color: corPergunta, answers: 
        [{text: respostaCorreta, image: imagemRespostaCorreta, isCorrectAnswer: true
            },
            {text: RespostaErrada1, image: imagemRespostaErrada1, isCorrectAnswer: false
            }
        ]
    })
    if(temSegundaRespostaIncorreta == true){
        objetoQuiz.questions[i].answers.push({text: RespostaErrada2,image: imagemRespostaErrada2,isCorrectAnswer: false
        })
         temSegundaRespostaIncorreta = false 
    }
    if(temTerceiraRespostaIncorreta == true){
        objetoQuiz.questions[i].answers.push({text: RespostaErrada3,image: imagemRespostaErrada3,isCorrectAnswer: false})
        temTerceiraRespostaIncorreta = false
    }
    
    
}

    if(validadorPerguntas){
        criarNiveis();
    }else{
        alert('As informaçoes são inválidas. Tente novamente');
        objetoQuiz.questions = [];
    }
}

function criarNiveis (){
    document.querySelector('body').innerHTML = `
    <div class="topo">
        <h1>BuzzQuizz</h1>
    </div>
    <div class="container-criar-perguntas">
        <h2 class="instrucoes-criando-perguntas">Agora, decida os níveis</h2>
        <div class="container-perguntas"></div>
        <button onclick="validarNiveis()">Finalizar Quiz</button> 
    </div>
`
    const containerPerguntas = document.querySelector('.container-perguntas');
    for(let i = 0; i < qtdNiveis; i++){
        containerPerguntas.innerHTML += `
            <div onclick="selecionarNivel(this, ${i+1})"class="pergunta">
                Nível ${i+1} 
                <ion-icon name="create-outline"></ion-icon>
            </div>
        `
    }
}
function selecionarNivel(perguntaSelecionada, numeroNivel){
    perguntaSelecionada.classList.add('selecionada');
    perguntaSelecionada.removeAttribute('onclick');
    perguntaSelecionada.innerHTML = `
         <div class = "dados-pergunta nivel${numeroNivel}">    
             <h2> Nivel ${numeroNivel}</h2>
             <input value="" class=" titulo-nivel${numeroNivel}" type="text" placeholder="Título do nível">
             <input value="" class=" pct-nivel${numeroNivel}" type="text" placeholder="% de acerto mínima">
             <input value="" class=" imagem-nivel${numeroNivel}"type="text" placeholder="URL da imagem do nível">
             <input value="" class=" descricao-nivel${numeroNivel}" type="text" placeholder="Descrição do nível">
        </div> 
     `
 }

function tratarSucesso(promise){
    console.log(promise.data);
}

function tratarFalha(){
    alert('objeto enviado sem sucesso');
}
 function validarNiveis(){
    let validadorNiveis = true;
    let arrayPctNivel = [];
    
    for(let i = 0; i < qtdNiveis; i++){
        const tituloNivel = document.querySelector(`.nivel${i+1} .titulo-nivel${i+1}`).value;
        const pctNivel = document.querySelector(`.nivel${i+1} .pct-nivel${i+1}`).value;
        const imagemNivel = document.querySelector(`.nivel${i+1} .imagem-nivel${i+1}`).value;
        const descricaoNivel = document.querySelector(`.nivel${i+1} .descricao-nivel${i+1}`).value;
    
        if( tituloNivel == "" || tituloNivel.length < 10 || pctNivel<0||pctNivel>100 || descricaoNivel.length<30 || validarURL(imagemNivel) == false){
            validadorNiveis=false;
        }

        arrayPctNivel.push(pctNivel);

        arrayNiveis.push({title: tituloNivel, image: imagemNivel, text: descricaoNivel, minValue: Number(pctNivel)});
    }
    
    const incluiZero = arrayPctNivel.includes("0");
    
    if(incluiZero === false){
        validadorNiveis=false;
    }
    
    if(validadorNiveis==true){
        objetoQuiz.image = imagemObjeto
        objetoQuiz.title = tituloObjeto;
        objetoQuiz.levels = arrayNiveis;
        console.log(objetoQuiz);
        axios
        .post('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes', objetoQuiz)
        .then(({ data }) => {
            console.log(data.id);
            idQuizz = data.id;
            console.log(idQuizz);
        })
        .catch((error) => {
            //alert(`error ${error.response.status}`);
        })
        criarPaginaFinal();
    }else{
        alert('Informacoes Inválidas. Por favor, preencha novamente' );
        arrayNiveis = [];    //testar depois
        temSegundaRespostaIncorreta = false;
        temTerceiraRespostaIncorreta = false;
    }
}

function criarPaginaFinal(){
    document.querySelector('body').innerHTML = `
    <div class="topo">
        <h1>BuzzQuizz</h1>
    </div>
    <div class="container-ultima-pagina">
        <h2>Seu quizz está pronto</h2>

        <div class="imagem-gradiente imagem-pagina-final">
            <img src="${objetoQuiz.image}" alt="">
            <p>${objetoQuiz.title}</p>
        </div>
        <div class="botoes">
            <button class="acessar">Acessar Quizz</button>
            <button onclick="voltarHome()"class="voltar">Voltar pra home</button>
        </div>
    </div>

`
}
function voltarHome(){
    const obterQuiz = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes');
    document.querySelector('body').innerHTML = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <link rel="stylesheet" href="css/reset.css" />
        <link rel="stylesheet" href="css/estilos.css" />
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" rel="stylesheet">
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>BuzzQuizz</title>
    </head>
    <body>
        <div class="topo">
            <h1>BuzzQuizz</h1>
        </div>
        <div class="page">
           
            <div class="container-criar-quiz">
                <div class="texto-quiz">Você não criou nenhum quizz ainda :(</div>
                <button onclick='enviarInfosQuiz()'>Criar Quizz</button>
            </div>
        
            
            <div class="tittle-holder"><p>Todos os Quizzes</p>
                <div class="holder">
            
                </div>
            </div>
            
        </div> 
        <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
        <script src="https://unpkg.com/ionicons@5.4.0/dist/ionicons.js"></script>
        <script src="scripts/script.js"></script> 
    </body>
    </html>    

`
    
    obterQuiz.then(quizzRecebido);
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
