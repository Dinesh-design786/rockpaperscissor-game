let userScore = 0;
let computerScore = 0;
let gameMode = 'solo'; // default game mode

// DOM elements
const userScore_span = document.getElementById("user-score");
const computerScore_span = document.getElementById("computer-score");
const scoreBoard_div = document.querySelector(".score-board");
const result_p = document.querySelector(".result > p");
const rock_div = document.getElementById("rock");
const paper_div = document.getElementById("paper");
const scissors_div = document.getElementById("scissors");

// Landing page elements
const landingPage = document.getElementById("landing-page");
const gameArea = document.getElementById("game-area");
const startBtn = document.getElementById("start-btn");
const backBtn = document.getElementById("back-btn");
const soloBtn = document.getElementById("solo-btn");
const multiplayerBtn = document.getElementById("multiplayer-btn");

// Game mode selection
soloBtn.addEventListener('click', () => {
    soloBtn.classList.add('active');
    multiplayerBtn.classList.remove('active');
    gameMode = 'solo';
    document.getElementById("computer-label").textContent = 'comp';
});

multiplayerBtn.addEventListener('click', () => {
    multiplayerBtn.classList.add('active');
    soloBtn.classList.remove('active');
    gameMode = 'multiplayer';
    document.getElementById("computer-label").textContent = 'p2';
});

// Start game button
startBtn.addEventListener('click', () => {
    landingPage.style.display = 'none';
    gameArea.style.display = 'block';
    resetGame();
});

// Back button
backBtn.addEventListener('click', () => {
    gameArea.style.display = 'none';
    landingPage.style.display = 'flex';
});

// Reset scores and message when game starts
function resetGame() {
    userScore = 0;
    computerScore = 0;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    result_p.innerHTML = "Choose your move — Rock, Paper, or Scissors — and see if you can outsmart your opponent.";
}

function getComputerChoice() {
    const choices = ['rock', 'paper', 'scissors'];
    const randomNumber = Math.floor(Math.random() * 3);
    return choices[randomNumber];
}

function convertToWord(letter) {
    if (letter === "rock") return "Rock";
    if (letter === "paper") return "Paper";
    return "Scissors";
}

function win(userChoice, computerChoice) {
    userScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const userChoice_div = document.getElementById(userChoice);
    
    let resultMessage = "";
    if (userChoice === "rock" && computerChoice === "scissors") {
        resultMessage = "Rock crushes Scissors";
    } else if (userChoice === "paper" && computerChoice === "rock") {
        resultMessage = "Paper covers Rock";
    } else if (userChoice === "scissors" && computerChoice === "paper") {
        resultMessage = "Scissors cuts Paper";
    }
    
    const opponent = (gameMode === 'solo') ? 'computer' : 'Player 2';
    result_p.innerHTML = `${resultMessage}. You win! 🔥`;
    userChoice_div.classList.add('green-glow');
    setTimeout(() => userChoice_div.classList.remove('green-glow'), 300);
}

function lose(userChoice, computerChoice) {
    computerScore++;
    userScore_span.innerHTML = userScore;
    computerScore_span.innerHTML = computerScore;
    const userChoice_div = document.getElementById(userChoice);
    
    let resultMessage = "";
    if (computerChoice === "rock" && userChoice === "scissors") {
        resultMessage = "Rock crushes Scissors";
    } else if (computerChoice === "paper" && userChoice === "rock") {
        resultMessage = "Paper covers Rock";
    } else if (computerChoice === "scissors" && userChoice === "paper") {
        resultMessage = "Scissors cuts Paper";
    }
    
    const opponent = (gameMode === 'solo') ? 'Computer' : 'Player 2';
    result_p.innerHTML = `${resultMessage}. ${opponent} wins! 💩`;
    userChoice_div.classList.add('red-glow');
    setTimeout(() => userChoice_div.classList.remove('red-glow'), 300);
}

function draw(userChoice, computerChoice) {
    const userChoice_div = document.getElementById(userChoice);
    result_p.innerHTML = `Both chose ${convertToWord(userChoice)}. It's a draw! 😐`;
    userChoice_div.classList.add('gray-glow');
    setTimeout(() => userChoice_div.classList.remove('gray-glow'), 300);
}

function game(userChoice) {
    let computerChoice;
    
    if (gameMode === 'solo') {
        // Computer makes a random choice
        computerChoice = getComputerChoice();
    } else {
        // In multiplayer mode, we would handle player 2's choice
        // For now, we'll simulate with a random choice
        computerChoice = getComputerChoice();
        // In a real implementation, you would wait for player 2's input
    }
    
    switch (userChoice + computerChoice) {
        case "rockscissors":
        case "paperrock":
        case "scissorspaper":
            win(userChoice, computerChoice);
            break;
        case "rockpaper":
        case "paperscissors":
        case "scissorsrock":
            lose(userChoice, computerChoice);
            break;
        case "rockrock":
        case "paperpaper":
        case "scissorsscissors":
            draw(userChoice, computerChoice);
            break;
    }
}

function main() {
    // Set solo mode as default active
    soloBtn.classList.add('active');
    
    // Game choices event listeners
    rock_div.addEventListener('click', () => game("rock"));
    paper_div.addEventListener('click', () => game("paper"));
    scissors_div.addEventListener('click', () => game("scissors"));
}

main(); 