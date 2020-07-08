const username = document.getElementById("username");
const savescorebtn = document.getElementById("savescorebtn");
const finalscore= document.getElementById("finalscore");

const mostRecentScore = localStorage.getItem('mostRecentScore');
finalscore.innerText=mostRecentScore;
const highscores = JSON.parse(localStorage.getItem("highscores")) || [];

// it either returns the array if not created we can add an empty array
// to access that array we use json.parse
// in your web console you can check this in application->localstorage and also create your own key value pair
// things in local storage are stored in the form of strings
// disbale the button until there is an inpu
username.addEventListener("keyup", function(){
	savescorebtn.disabled = !username.value;
});

function saveHighScore(e){
	e.preventDefault();
	// so we dont want the form to do the usual action 

	const scores = {
	score:mostRecentScore,
	name:username.value
	};

	highscores.push(scores);
	highscores.sort((a,b)=> b.score - a.score);

	highscores.splice(5);

	localStorage.setItem("highscores",JSON.stringify(highscores));
	window.location.assign("index.html");
}