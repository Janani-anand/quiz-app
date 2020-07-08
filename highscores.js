const highscoreslist = document.getElementById("highscoreslist");
const highScores = JSON.parse(localStorage.getItem("highscores")) || [];

highscoreslist.innerHTML = highScores
  .map(score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
  })
  .join("");