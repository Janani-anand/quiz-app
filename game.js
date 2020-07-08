const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoretext = document.getElementById("score");
const progressbarfull = document.getElementById("progressbarfull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");


// data-set adds custom property 
let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];
scoretext.innerText = score;

let questions = [];

fetch("https://opentdb.com/api.php?amount=10&category=9&difficulty=easy&type=multiple")
.then(response => {
	return response.json();
})
.then(loadedquestions => {
	questions = loadedquestions.results.map(loadedquestions => {
		const formattedQuestion = {
			question: loadedquestions.question
		};


	const answerchoices = [...loadedquestions.incorrect_answers];
	formattedQuestion.answer = Math.floor(Math.random()*4)+1;

	answerchoices.splice(formattedQuestion.answer-1, 0, loadedquestions.correct_answer);

	answerchoices.forEach((choice, index)=>{
		formattedQuestion["choice"+(index+1)]=choice;
	});

	return formattedQuestion;
});
	startGame();
})
.catch(err => {
	console.error(err)
});


const CORRECT_BONUS= 10;
const MAX_questions = 3;

function startGame(){
	questionCounter=0;
	score = 0;
	availableQuestions = [...questions];
	getNewQuestion();
	loader.classList.add('hidden');
	game.classList.remove('hidden');

}

function getNewQuestion(){
	if(availableQuestions.length === 0 || questionCounter >= MAX_questions){
		localStorage.setItem('mostRecentScore', score);
		// store the item in local storage to show the score later
		return window.location.assign("end.html");
	}
	questionCounter++;
	progressText.innerText = `Question ${questionCounter}/${MAX_questions}`;

	progressbarfull.style.width=`${(questionCounter/MAX_questions)*100}%`;

	const questionIndex = Math.floor(Math.random() * availableQuestions.length);
	currentQuestion=availableQuestions[questionIndex];
	question.innerText= currentQuestion.question;

	choices.forEach(choice => {
		const number = choice.dataset["number"];
		choice.innerText= currentQuestion["choice"+number];
	});

	availableQuestions.splice(questionIndex, 1);
	acceptingAnswers= true;
}

choices.forEach(choice => {
	choice.addEventListener("click",function(e){
		if(!acceptingAnswers)
			return;
		acceptingAnswers = false;
		const selectedChoice = e.target;
		const selectedAnswer = selectedChoice.dataset["number"];
		const classToApply = selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";
		
		if (classToApply === "correct") {
      		incrementScore(CORRECT_BONUS);
    	}

		selectedChoice.parentElement.classList.add(classToApply);

		setTimeout(function() {
		selectedChoice.parentElement.classList.remove(classToApply);
		getNewQuestion();
		},1000);
	});
});
function incrementScore(num){
	score+=num;
	scoretext.innerText = score;
}

