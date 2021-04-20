let arrayQuiz;
const obterQuiz = axios.get('https://mock-api.bootcamp.respondeai.com.br/api/v2/buzzquizz/quizzes');
obterQuiz.then(quizzRecebido);

function quizzRecebido(retorno){
    arrayQuiz = retorno.data;
    const quizzPadraoSup = document.querySelector(".upperholder");
    for(let i=0; i<3; i++){
        quizzPadraoSup.innerHTML += `
                <div class="quiz">
                    <img class="quiz-image" src="${arrayQuiz[0].image}"/>
                </div>  
        `
    }

    const quizzPadraoInf = document.querySelector(".bottomholder");
    for(let i=0; i<3; i++){
        quizzPadraoInf.innerHTML += `
                <div class="quiz">
                    <img class="quiz-image" src="${arrayQuiz[0].image}"/>
                </div>  
        `
    }
}


