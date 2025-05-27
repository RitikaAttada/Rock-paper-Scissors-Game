const rock = document.getElementById('rock');
const paper = document.getElementById('paper');
const scissors = document.getElementById('scissors');
const res = document.getElementById('res');
const reset = document.getElementById('reset');
const scores = document.getElementById('scores'); // Added missing scores reference

let userChoice = "";
let computerChoice = "";
let computerNum;

const score = JSON.parse(localStorage.getItem('sco')) || { wins: 0, losses: 0, ties: 0 };

function updateScores() {
    scores.innerHTML = `Wins: ${score.wins} Losses: ${score.losses} Ties: ${score.ties}`;
}

function compMove() {
    computerNum = Math.random();
    if (computerNum < 0.34) {
        computerChoice = "rock";
    } else if (computerNum <= 0.67) {
        computerChoice = "paper";
    } else {
        computerChoice = "scissors";
    }
}

function playGame() {
    if (userChoice === computerChoice) {
        score.ties++;
        res.innerHTML = `
            <p class="js-moves">Tie.</p>
            <p class="js-moves">
            You
            <img src="${userChoice}-emoji.png" class="emoji" id="user-move">
            <img src="${computerChoice}-emoji.png" class="emoji" id="computer-move">
            Computer
        </p>`;
    } else {
        if ((userChoice === "rock" && computerChoice === "scissors") ||
            (userChoice === "paper" && computerChoice === "rock") ||
            (userChoice === "scissors" && computerChoice === "paper")) {
            score.wins++;
            res.innerHTML = `
            <p class="js-moves">You Win.</p>
            <p class="js-moves">
            You
            <img src="${userChoice}-emoji.png" class="emoji" id="user-move">
            <img src="${computerChoice}-emoji.png" class="emoji" id="computer-move">
            Computer
        </p>`;
        } else {
            score.losses++;
            res.innerHTML = `
            <p class="js-moves">You Lose.</p>
            <p class="js-moves">
            You
            <img src="${userChoice}-emoji.png" class="emoji" id="user-move">
            <img src="${computerChoice}-emoji.png" class="emoji" id="computer-move">
            Computer
        </p>`;
        }
    }
    localStorage.setItem('sco', JSON.stringify(score)); // Save score
    updateScores();
}

rock.addEventListener("click", () => {
    compMove();
    userChoice = "rock";
    playGame();
});

paper.addEventListener("click", () => {
    compMove();
    userChoice = "paper";
    playGame();
});

scissors.addEventListener("click", () => {
    compMove();
    userChoice = "scissors";
    playGame();
});

reset.addEventListener("click", () => {
    score.wins = 0;
    score.losses = 0;
    score.ties = 0;
    localStorage.setItem('sco', JSON.stringify(score)); // Reset score in localStorage
    res.innerHTML = "";
    updateScores();
});

updateScores();

      