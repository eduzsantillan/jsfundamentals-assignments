"use strict";

const MIN_PLAYERS = 2;

const game = {
  title: "Assignment 1",
  isRunning: false,
  players: [],
  activePlayer: null,
  isNewGame: true,
  playersList: document.getElementById("playersList"),
  gameBoard: document.getElementById("gameBoard"),

  addPlayer(player) {
    this.players.push(player);
    const playerDiv = document.createElement("div");
    playerDiv.classList.add("player");
    playerDiv.id = `player-${player.name}`;
    playerDiv.innerHTML = `<span class="name">${player.name}</span> <span class="score">${player.score}</span>`;
    this.playersList.appendChild(playerDiv);
    this.updateGameControls();
  },

  updateScore(player) {
    const playerDiv = document.getElementById(`player-${player.name}`);
    const scoreSpan = playerDiv.querySelector(".score");
    scoreSpan.textContent = player.score;
  },

  toggleGame() {
    if(this.isRunning){
        this.isRunning = false;
        const switchPlayer = document.getElementById("switchPlayer");
        switchPlayer.disabled = true;
        const scorePoints = document.getElementById("scorePoints");
        scorePoints.disabled = true;
        document.getElementById("startGame").innerText = "Resume Game";
        gameBoard.classList.remove("game-board-active");
    }else{
        if(this.isNewGame){
            this.isNewGame = false;
            this.activePlayer = this.players[0];
            this.activatePlayer();
        }
        this.isRunning = true;
        const inputDiv = document.getElementById("inputPlayer");
        inputDiv.hidden = true;
        const switchPlayer = document.getElementById("switchPlayer");
        switchPlayer.disabled = false;
        const scorePoints = document.getElementById("scorePoints");
        scorePoints.disabled = false;
        document.getElementById("startGame").innerText = "Pause Game"; 
        gameBoard.classList.add("game-board-active");
    }
  },

  scorePoints() {
    if (this.isRunning && this.activePlayer) {
      const points = Math.floor(Math.random() * 6) + 1;
      this.activePlayer.addPoints(points);
    }
  },

  switchPlayer() {
    if (this.isRunning) {
       const currentIndex = this.players.indexOf(this.activePlayer);
       this.deactivatePlayer();
       if (currentIndex + 1 == this.players.length){
            this.activePlayer = this.players[0];
            this.activatePlayer();
       }else{
           this.activePlayer = this.players[currentIndex + 1];
           this.activatePlayer();
       }
    }
  },

  updateGameControls() {
    const hasPlayers = this.players.length >= MIN_PLAYERS;
    document.getElementById("startGame").disabled = !hasPlayers;
  },

  activatePlayer() {
    const playerDiv = document.getElementById(`player-${this.activePlayer.name}`);
    playerDiv.classList.replace("player","player-active");
  },
  
  deactivatePlayer() {
    const playerDiv = document.getElementById(`player-${this.activePlayer.name}`);
    playerDiv.classList.replace("player-active","player");
}

};

class Player {
    constructor(name) {
      this.name = name;
      this.score = 0;
      game.addPlayer(this);
    }
  
    addPoints(points) {
      this.score += points;
      game.updateScore(this);
    }
  }

document.getElementById("addPlayer").addEventListener("click", () => {
  const playerNameInput = document.getElementById("playerName");
  const name = playerNameInput.value.trim();
  if (name) {
    new Player(name);
    playerNameInput.value = "";
  }
});

document.getElementById("startGame").addEventListener("click", () => {
    game.toggleGame();
});

document.getElementById("scorePoints").addEventListener("click", () => {
    game.scorePoints();
});

document.getElementById("switchPlayer").addEventListener("click", () => {
    game.switchPlayer();
});
