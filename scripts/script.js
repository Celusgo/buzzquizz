let objetoQuiz = {title: "", image: "", questions: [], levels: []}
let arrayPerguntas = [];
let arrayNiveis = [];
let qtdPerguntas = 0;
let qtdNiveis = 0;
let objetoTitulo = "";
let objetoImagem = "";




function enviarInfosQuiz(){
    const containerPage = document.querySelector(".page");
    const containerNovoQuiz = document.querySelector(".container-novo-quiz");
    containerPage.classList.add('escondido');
    containerNovoQuiz.classList.remove('escondido');
}

function validarInfos(){
    const inputTitulo = document.querySelector(".input-titulo").value;
    const inputImagem = document.querySelector(".input-imagem").value;
    const inputQtdPerguntas = document.querySelector(".input-qtd-perguntas").value;
    const inputQtdNiveis = document.querySelector(".input-qtd-niveis").value;

     qtdPerguntas = inputQtdPerguntas;
     qtdNiveis = inputQtdNiveis;
     objetoTitulo = inputTitulo;
     objetoImagem = inputImagem;    
    
    if(inputTitulo == "" || inputTitulo.length < 20){
        alert("Dados inválidos. Por favor, insira novamente");
    }else if(inputQtdPerguntas == "" || inputQtdPerguntas <3){
        alert("Dados inválidos. Por favor, insira novamente");
    }else if(inputQtdNiveis == "" || inputQtdNiveis <2){
        alert("Dados inválidos. Por favor, insira novamente");
    }else if(inputImagem == "" || checkImgOnline(inputImagem) === false){
        alert("Dados inválidos. Por favor, insira novamente");
    }
    else {
        qtdPerguntas = inputQtdPerguntas;
        qtdNiveis = inputQtdNiveis;
        objetoTitulo = inputTitulo;
        objetoImagem = inputImagem;   
        criarPerguntas (inputQtdPerguntas); 
    }
}
function checkImgOnline(valor){
    var img = new Image();        
    try {
        img.src = valor;
        return true;
    } catch(err) {
        return false;
    }   
}

function criarPerguntas (numeroPerguntas){
        const containerNovoQuiz = document.querySelector(".container-novo-quiz");
        containerNovoQuiz.classList.add('escondido');
    
        const containerCriarPerguntas = document.querySelector('.container-criar-perguntas');
        containerCriarPerguntas.classList.remove('escondido');
        
        const containerPerguntas = document.querySelector('.container-perguntas');
        for(let i = 0; i < Number(numeroPerguntas); i++){
            containerPerguntas.innerHTML += `
                <div onclick="selecionarPergunta(this, ${i+1})"class="nivel">
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
             <h2> Respostas Incorretas</h2>
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

    let temSegundaRespostaIncorreta = false;
    let temTerceiraRespostaIncorreta = false;


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
    
    if(validarCor(corPergunta) == false || checkImgOnline(imagemRespostaCorreta) == false || checkImgOnline(imagemRespostaErrada1) == false || respostaCorreta == "" || textoPergunta == "" || textoPergunta.length < 20 ||  RespostaErrada1 == ""){
        validadorPerguntas = false;
    }
    
    if(RespostaErrada2 !== ""){
        temSegundaRespostaIncorreta = true;
    }
    if(temSegundaRespostaIncorreta == true){
        if((checkImgOnline(imagemRespostaErrada2)[i+1]) == false){
            validadorPerguntas = false;
        }
    }
    if(RespostaErrada3 !== ""){
        temTerceiraRespostaIncorreta = true
    }
    
    if(temTerceiraRespostaIncorreta == true){
        if((checkImgOnline(imagemRespostaErrada3)[i+1]) == false){
            validadorPerguntas = false;
        }
    }
    objetoQuiz.questions.push({title: textoPergunta, color: corPergunta, answers: 
        [{text: respostaCorreta, 
            image: imagemRespostaCorreta, 
            isCorrectAnswer: true
            },
            {text: RespostaErrada1, 
                image: imagemRespostaErrada1, 
                isCorrectAnswer: false
            }
        ]
    })
    if(temSegundaRespostaIncorreta == true){
        objetoQuiz.questions[i].answers.push({
            text: RespostaErrada2,
            image: imagemRespostaErrada2,
            isCorrectAnswer: false
        })
         temSegundaRespostaIncorreta = false 
    }
    if(temTerceiraRespostaIncorreta == true){
        objetoQuiz.questions[i].answers.push({
            text: RespostaErrada3,
            image: imagemRespostaErrada3,
            isCorrectAnswer: false})
        temTerceiraRespostaIncorreta = false
    }
    
}
    if(validadorPerguntas){
        objetoQuiz.title = objetoTitulo;   
        objetoQuiz.image = objetoImagem;
        criarNiveis();
    }else{
        alert('As informaçoes são inválidas. Tente novamente');
        objetoQuiz.questions = [];
        temSegundaRespostaIncorreta = false;
        temTerceiraRespostaIncorreta = false;
    }
    
}


function criarNiveis (){
    const containerCriarPerguntas = document.querySelector('.container-criar-perguntas');
    containerCriarPerguntas.classList.add('escondido');

    const containerCriarNiveis = document.querySelector('.container-criar-niveis');
    containerCriarNiveis.classList.remove('escondido');

    const containerNiveis = document.querySelector('.container-niveis');

    for(let i = 0; i < qtdNiveis; i++){
        containerNiveis.innerHTML += `
            <div onclick="selecionarNivel(this, ${i+1})"class="pergunta">
                Nível ${i+1} 
                <ion-icon name="create-outline"></ion-icon>
            </div>
        `
    }
}
function selecionarNivel(nivelSelecionado, numeroNivel){
    nivelSelecionado.classList.add('selecionada');
    nivelSelecionado.removeAttribute('onclick');
    nivelSelecionado.innerHTML = `
         <div class = "dados-nivel nivel${numeroNivel}">    
             <h2> Nivel ${numeroNivel}</h2>
             <input value="" class=" titulo-nivel${numeroNivel}" type="text" placeholder="Título do nível">
             <input value="" class=" pct-nivel${numeroNivel}" type="text" placeholder="% de acerto mínima">
             <input value="" class=" imagem-nivel${numeroNivel}"type="text" placeholder="URL da imagem do nível">
             <input value="" class=" descricao-nivel${numeroNivel}" type="text" placeholder="Descrição do nível">
        </div> 
     `
 }

 function validarNiveis(){
    let validadorNiveis = true;
    let arrayPctNivel = [];
    
    for(let i = 0; i < qtdNiveis; i++){
        const tituloNivel = document.querySelector(`.nivel${i+1} .titulo-nivel${i+1}`).value;
        const pctNivel = document.querySelector(`.nivel${i+1} .pct-nivel${i+1}`).value;
        const imagemNivel = document.querySelector(`.nivel${i+1} .imagem-nivel${i+1}`).value;
        const descricaoNivel = document.querySelector(`.nivel${i+1} .descricao-nivel${i+1}`).value;
    
        if( tituloNivel == "" || tituloNivel.length < 10 || pctNivel<0||pctNivel>100 || descricaoNivel.length<30 || checkImgOnline(imagemNivel) == false){
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
            console.log('objeto nao enviado');
        })
        criarPaginaFinal();
    }else{
        alert('Informacoes Inválidas. Por favor, preencha novamente' );
        arrayNiveis = [];    
        temSegundaRespostaIncorreta = false;
        temTerceiraRespostaIncorreta = false;
    }
}

function criarPaginaFinal(){
    
    const imagem = document.querySelector('.container-imagem img');
    imagem.setAttribute('src', `${objetoQuiz.image}`);

    const titulo = document.querySelector('.container-imagem p');
    titulo.innerHTML(`${objetoQuiz.image}`);
    
    const containerCriarNiveis = document.querySelector('.container-criar-niveis');
    containerCriarNiveis.classList.add('escondido');

    const paginaFinal = document.querySelector('.container-ultima-pagina');
    paginaFinal.classList.remove('escondido');

}
function voltarHome(){
    const containerPage = document.querySelector('.page');
    containerPage.classList.remove('escondido');


    const paginaFinal = document.querySelector('.container-ultima-pagina');
    paginaFinal.classList.add('escondido');
    

    topo.scrollIntoView();
    
}

/////////////////////////////////////////////////////////////////////////////////////////

//Variáveis Globais
let arrayQuiz;
let arrayClicada;
let perguntasArrayClicada;
let respostasArrayClicada;
let contadorCorretas = 0;
let contadorTotais = 0;
let respostasAleatorias = [];
let idDoQuizzSelecionado;
let rolar = 1;
//

//Requisição do servidor
const obterQuiz = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes');
obterQuiz.then(quizzRecebido);
//

//Renderizar quizes na tela
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
//

//Renderizar quiz escolhido na tela
function responderQuiz(id_clicado){
    idDoQuizzSelecionado = id_clicado;
    arrayClicada = arrayQuiz[id_clicado-1];
    perguntasArrayClicada = arrayClicada.questions;
    
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
        respostasAleatorias = perguntasArrayClicada[i].answers;
        respostasAleatorias.sort(comparador);
        corpoPagina.innerHTML+=`
        <div class="quiz-elements">
            <div class="opcoes">
                <div class="titulo-opcao" id=titulo${i} style="background-color: ${arrayClicada.questions[i].color}">
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
             <div class="resposta-opcao" onclick=" verificarPai(this); setTimeout(rolarAutomatico, 2000); verificarSeCorreto(this.id);" id=${respostasAleatorias[j].isCorrectAnswer}>
                <img class="img-resposta" src="${respostasAleatorias[j].image}"/>
                <p>${respostasAleatorias[j].text}</p>
            </div>
            `
        }
    }
}
//

//Alterar o estilo das respostas ao serem clicadas
let arrFilhos = [];

function verificarPai(clicado){
    const pai = clicado.parentNode;
    arrFilhos = pai.children;
    for(let i=0; i<arrFilhos.length;i++){
        arrFilhos[i].setAttribute("onclick", "");
        if(arrFilhos[i].id === "true"){
            arrFilhos[i].classList.add("cor-verde");
            arrFilhos[i].classList.add("opaco");
        }else if(arrFilhos[i].id === "false"){
            arrFilhos[i].classList.add("cor-vermelha");
            arrFilhos[i].classList.add("opaco");
        }
    }
    clicado.classList.remove("opaco");
}
//

//Verificar se a resposta selecionada está correta
function verificarSeCorreto(idCorreto){
    if(idCorreto === "true"){
        contadorCorretas++;
        contadorTotais++;
        if(contadorTotais === arrayClicada.questions.length){
            telaPontos();
        } 
    }
    else  if(idCorreto === "false"){
        contadorTotais++;
        if(contadorTotais === arrayClicada.questions.length){
            telaPontos();
        } 
    }
}
//

//Rolagem automática para próxima questão
function rolarAutomatico(){
    const rolagemAutomatica = document.getElementById(`titulo${rolar}`);
    rolagemAutomatica.scrollIntoView();
    rolar++;
}    
//
 
//Tela de pontuação final
function telaPontos(){
    const pontuacaoFinal = (contadorCorretas/contadorTotais)*100;
    const telaPontos = document.querySelector(".page");
    for(let i = arrayClicada.levels.length-1; i>=0; i--){
        if (pontuacaoFinal >= arrayClicada.levels[i].minValue){
            telaPontos.innerHTML+=`
            <div class="quiz-elements">
                <div class="opcoes">
                    <div class="titulo-opcao" id=titulo${arrayClicada.questions.length} style="background-color: #EC362D">
                        <p>${Math.round(pontuacaoFinal)}% de acerto: ${arrayClicada.levels[i].title}</p>
                    </div>
                    <div class="informacoes-pontuacao">
                            <img class="imagem-pontuacao" src="${arrayClicada.levels[i].image}"/>
                            <p class="texto-pontuacao">${arrayClicada.levels[i].text}</p>
                    </div>
                </div>     
            </div>
            <button class="reiniciar-quiz" onclick="reiniciarQuiz(); rolarTopo();">Reiniciar Quizz</button>
            <button class="retornar-home" onclick="retornarHome()"> Voltar pra home</button>
            `
            break;
        }
    }
}
//
 
//Botão reiniciar quiz
function reiniciarQuiz(){
        rolar = 1;
        contadorCorretas = 0;
        contadorTotais = 0;
        arrayClicada = arrayQuiz[idDoQuizzSelecionado-1];
        perguntasArrayClicada = arrayClicada.questions;
        
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
            respostasAleatorias = perguntasArrayClicada[i].answers;
            respostasAleatorias.sort(comparador);
            corpoPagina.innerHTML+=`
            <div class="quiz-elements">
                <div class="opcoes">
                    <div class="titulo-opcao" id=titulo${i} style="background-color: ${arrayClicada.questions[i].color}">
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
                 <div class="resposta-opcao" onclick=" verificarPai(this); setTimeout(rolarAutomatico, 2000); verificarSeCorreto(this.id);" id=${respostasAleatorias[j].isCorrectAnswer}>
                    <img class="img-resposta" src="${respostasAleatorias[j].image}"/>
                    <p>${respostasAleatorias[j].text}</p>
                </div>
                `
            }
        }
    }
//

//Rolagem automática para o topo
function rolarTopo(){
    const rolagemAutomatica = document.querySelector(".div-img-topo-quiz");
    rolagemAutomatica.scrollIntoView();
}    
//

//Botão retornar para a home
function retornarHome(){
    rolar = 1;
    contadorCorretas = 0;
    contadorTotais = 0;
    const resetar = document.querySelector(".page");
    resetar.innerHTML="";
    resetar.innerHTML=`
    <div class="container-criar-quiz">
        <div class="texto-quiz">Você não criou nenhum quizz ainda :(</div>
        <button onclick='enviarInfosQuiz()'>Criar Quizz</button>
    </div>


    <div class="tittle-holder"><p>Todos os Quizzes</p>
        <div class="holder">

        </div>
    </div>
    `
    const resetQuiz = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes');
    resetQuiz.then(quizzRecebido);
}
//