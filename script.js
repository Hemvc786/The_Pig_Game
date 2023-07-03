'use strict';
/*
Math.random()---> will generate the no. between 0-0.9999999999

*/

// Selecting the elements and storing them in variables.
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playing;
//starting condition
const init = function () {
  scores = [0, 0]; //we have stored total score of player 1 and 2 in an array.
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  //below we are dynamically( i.e through JS) adding the hidden class to dice element.
  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

//function to switchPlayer made to maintain DRY principle
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  //above line is written to make current score of player which is active before dicing one, to 0 and we need to do that before we do the active player switch.
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0; //this is not bound  to any player

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    //1.generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //2. display dice
    diceEl.classList.remove('hidden');
    //below we are displaying the image according to the rolled dice number using the image src attribute.
    diceEl.src = `dice-${dice}.png`;
    console.log(dice);

    //3.check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;

      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    //1.Add the current score to the score of the active player
    //eg. scores[1]=scores[1]+currentScore
    scores[activePlayer] += currentScore; //storing currentscore in scores array

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer]; //display it in DOM ie webpage

    //2.check score is >= 100
    if (scores[activePlayer] >= 20) {
      //Finish the game
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner'); //added player winner class
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active'); //remove player active class
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});
btnNew.addEventListener('click', init);
