// CONSEGNA
// L'utente clicca su un bottone che genererà una griglia di gioco quadrata.
// Ogni cella ha un numero progressivo, da 1 a 100.
// Ci saranno quindi 10 caselle per ognuna delle 10 righe.
// Quando l'utente clicca su ogni cella, la cella cliccata si colora di azzurro ed emetto 
// un messaggio in console con il numero della cella cliccata.

// RAGIONAMENTO HTML
/*
# Creare una griglia per vedere le celle con i numeri da 1 a 100.
# 100 / 10
# <div id="boxes" class="d-flex justify-content-center align-content-center">
    <div class="box"></div>
</div> 
*/

// VARIABILI
const levelEl = document.getElementById("level");
console.log(levelEl);

let elBtn = document.querySelector('.btn.btn-outline-dark');
console.log(elBtn);

levelEl.addEventListener("change", game);
let score = 0;
const NUM_BOMBS = 16;
let gameOver = false;

// FUNZIONE DEL GIOCO

elBtn.addEventListener('click', function () {

 const playgroundEl = document.getElementById('playground');
 playgroundEl.innerHTML = '';
 const messageEl = document.getElementById('result');
 messageEl.innerHTML = '';
 score = 0;
 gameOver = false;

 let cellsPerRow;
 let cellsNumber = setLevel();
 let bombList = generateBombs(cellsNumber);
 
 console.log(bombList);
 cellsPerRow  = Math.sqrt(cellsNumber);

 const max_attempt = cellsNumber - NUM_BOMBS;
 
 for(let i = 1; i <= cellsNumber; i++){
   const square = drawSquare(cellsPerRow, i, bombList, max_attempt);
   playgroundEl.appendChild(square);
 }

})

// SELEZIONE LIVELLO

function setLevel(){
    const level = levelEl.value;    
    let cellsNumber;
    switch (level) {
        case "easy":
        // default:
          cellsNumber = 100;
          break;
        case "medium":
            cellsNumber = 81;
            break;
        case "crazy":
            cellsNumber = 49;
            break;
      }
      return cellsNumber;
}

// FUNZIONE PER CREARE I QUADRATINI

function drawSquare(dim, content, bombs, maxscore){
    const newSquare = document.createElement('div');
    newSquare.classList.add('box');
    newSquare.style.setProperty('--ms-box-dim', `calc(500px / ${dim} )`);
    newSquare.innerHTML = `
    <span class="invisible">${content}</span>
    `;
    newSquare.addEventListener('click', function(){

        if(gameOver) return;

        if(bombs.includes(content)){
          newSquare.classList.add('unsafe'); 
          newSquare.innerHTML = `<i class="fa-solid fa-bomb"></i>`;
          endGame(true, maxscore, bombs);
          
        } else {
          newSquare.classList.add('clicked');
          endGame(false, maxscore, bombs);         
        } 
      //}
      
    },{ once: true });
    return newSquare;
}

// FUNZIONE PER CREARE LE BOMBE

function generateBombs(numCells){
    let bomsArray = [];
    let counter = 0;
    while(bomsArray.length < NUM_BOMBS && counter < 100){
      let bomb = getRndInteger(1, numCells);
      if(!bomsArray.includes(bomb)) {
        bomsArray.push(bomb);
      }
      counter++;
    }  
    return bomsArray;
  }

  function endGame(end, maxscore,bombs){
    const messageEl = document.getElementById('result');
    let message = '';
    if(end) {
      gameOver = true;
      message += `
      <div class="px-3 fs-1 pt-3 text-danger">
      Hai perso !!!
      </div>
      `;
    } else {
      score++;
      if (score === maxscore){
        message += `
        <div class="px-3 fs-1 pt-3 text-success">
        Hai vinto !!!
        </div>
        `;
        gameOver = true;
      }
    }
    if(gameOver){
      const boxes = document.querySelectorAll('.box');
      for(let i = 0; i < boxes.length; i++){
        if(bombs.includes(i + 1)){
          boxes[i].classList.add('unsafe'); 
          boxes[i].innerHTML = `<i class="fa-solid fa-bomb fs-2 d-flex justify-content-center"></i>`;
          console.log(boxes.value);
        }
      }
    }
    message += `<h2 class="pt-3 px-3 ">Il tuo punteggio è: ${score} </h2>`;
    messageEl.innerHTML = message;
  }
