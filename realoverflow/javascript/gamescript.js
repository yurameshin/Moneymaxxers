const questions= [
    {
        question: "When asked to go gambling, what is the correct response?",
        answers: [
           {text: "YES", correct: true},
           {text: "BET", correct: true},
           {text: "SURE", correct: true},
           {text: "Nah", correct: false},
        ]

        
    },
    {
        question: "What do you do when you only have a High Card in Poker?",
        answers: [
           {text: "Raise", correct: true},
           {text: "Call", correct: false },
           {text: "Fold", correct: false},
           {text: "ALL IN", correct: true},
        ]

        
    },
    {
        question: "What is the main reason for having a savings account?",
        answers: [
           {text: "To blow it all on slots", correct: true},
           {text: "To prepare for rainy days (i need an umbrella)", correct: true},
           {text: "Saving? Whats that?", correct: true},
           {text: "Nah", correct: false},
        ]

        
    },
    {
        question: "If you have already spent 900 of your 1000 dollars in the casino, do you:",
        answers: [
           {text: "quit", correct: false},
           {text: "spend 50 more", correct: false},
           {text: "spend all", correct: true},
           {text: "never gamble again", correct: false},
        ]

        
    }
]
const questionElement = document.getElementById("questions");
const answerButtons = document.getElementById("answerbuttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score  = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score  = 0
    nextButton.innerHTML = 'Next';
    showQuestion();

}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex+ 1;
    questionElement.innerHTML = questionNo + '. ' + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;

        }
        button.addEventListener('click',selectAnswer)

    });
}

function resetState(){
    nextButton.style.display= "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if (isCorrect){
        selectedBtn.classList.add('correct');
        score ++ ;
    }else {
        selectedBtn.classList.add('incorrect');
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;

    });
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display='block';
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();

    }else{
        startQuiz();
    }
});
startQuiz();