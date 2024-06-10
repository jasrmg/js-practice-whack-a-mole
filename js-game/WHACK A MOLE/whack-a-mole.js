let currentMoleTile;
let currentPlantTile;
let score = 0;
let gameOver = false;
let highScore = 0;

window.onload = function () {
  setGame();
}

function setGame() {
  //set up grid
  for (let i = 0; i < 9;i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener('click', selectTile);
    document.getElementById("board").appendChild(tile);
  }

  setInterval(setMole, 1000);
  setInterval(setPlant, 2000);
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {

  if (gameOver) {
    return;
  }
  //clear previous mole
  if (currentMoleTile) {
    currentMoleTile.innerHTML = '';
    currentMoleTile.clicked = false
  }

  let mole = document.createElement("img");
  mole.src = "monty-mole.png";

  let num = getRandomTile();

  if (currentPlantTile && currentPlantTile.id == num) {
    return;
  }
  currentMoleTile = document.getElementById(num);
  currentMoleTile.appendChild(mole);
  currentMoleTile.clicked = false;
}

function setPlant() {

  if (gameOver) {
    return;
  }

  if (currentPlantTile) {
    currentPlantTile.innerHTML = '';
  }

  let plant = document.createElement("img");
  plant.src = "piranha-plant.png";

  let num = getRandomTile();
  if (currentMoleTile && currentMoleTile.id == num) {
    return;
  }
  currentPlantTile = document.getElementById(num);
  currentPlantTile.appendChild(plant);
}

function selectTile() {
  if (gameOver) {
    return;
  }

  if (this == currentMoleTile && !this.clicked) {
    score += 10;
    document.getElementById('score').innerText = "Current Score: " + score.toString();
    this.clicked = true;
    
  } else if (this == currentPlantTile) {
    document.getElementById('score').innerText = "Current Score: " + score.toString();
    gameOver = true;
    if (highScore < score) {
      highScore = score;
      document.getElementById('highest_score').innerText = "Highest Score: " + highScore.toString();
    }
    playAgain();
    console.log("inside: "+gameOver);
  }
}
/*play again button*/

// function playAgain() {
//   score = 0;
//   document.getElementById('score').innerText = "";
//   return gameOver = false;
// }
// const btn = document.getElementById('playA');
// btn.addEventListener('click', playAgain);
console.log("outside: "+gameOver);

function playAgain() {
  if (gameOver) {
   let playAgain =  confirm("GAME OVER!\n Score: "+score+"\n Do you want to play again?");
   if(playAgain) {
    score = 0;
    gameOver = false;
    document.getElementById('highest_score').innerText = "Highest Score: " + highScore.toString();
    document.getElementById('score').innerText = '0';
   }
  }
}

playAgain();