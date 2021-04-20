let controleValidacaoInfos = true; // quando tem o valor de true, as informações são válidas

function informarInfosQuiz(){
    const pagQuiz = document.querySelector('.pagina-criando-quiz');
    pagQuiz.classList.toggle('escondido');
    pagQuiz.innerHTML = `
    <div class="container-novo-quiz">
            <h2 class="instrucoes-criando-quiz">Comece pelo começo</h2>
            <div class="inputs-novos-quiz">
                <input class="input-titulo" type="text" placeholder="Titulo do seu quizz">
                <input class="input-imagem" type="text" placeholder="URL da imagem do seu quizz">
                <input class="input-qtd-perguntas" type="text" placeholder="Quantidade de perguntas do quizz">
                <input class="input-qtd-niveis" type="text" placeholder="Quantidade de níveis do quizz">
            </div>
            <button onclick="criarPerguntas()">Prosseguir para as perguntas</button>
        </div>
    `
}
function criarPerguntas(){
    //const inputImagem = document.querySelector('.input-imagem').value;
    //ainda nao implementei validaçao de URL
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
        informarInfosQuiz();
    }else{
        alert('dados válidos!')
    }
}



