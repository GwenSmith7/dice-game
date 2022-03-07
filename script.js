'use strict';

// variables first

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score1El = document.querySelector('#score--0');
const score2El = document.querySelector('#score--1');
let current0El = document.querySelector('#current--0');
let current1El = document.querySelector('#current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Functions here
const switchPlayer = function () {
  // make score 0 of current active player before switching
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  // Toggle CSS class for background
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// starting conditions
score1El.textContent = 0;
score2El.textContent = 0;
diceEl.classList.add('hidden');

let playing = true;

// store player scores in an array
let scores = [0, 0];

// store the score in a variable outside of the function so it is not reset
let currentScore = 0;

// store active player
let activePlayer = 0;

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice
    diceEl.classList.remove('hidden');
    // 3. Display the dice
    diceEl.src = `dice-${dice}.png`;
    // Check for rolled 1: If true, switch player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;

      // Get active player dynamically
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // use switchPlayer function above
      switchPlayer();
    }
  }
});

// When a player presses the Hold btn
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    // ^ This is the same as scores[1] = scores[1] + currentScores
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. Check if players score is = 10
    if (scores[activePlayer] === 10) {
      // Finish the game
      playing = false;

      // hide dice
      diceEl.classList.add('hidden');
      // add the winner background
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // Display YOU WIN in BIG SCORE box
      document.getElementById(`score--${activePlayer}`).textContent =
        'YOU WIN!';

      // remove active player background
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else if (scores[activePlayer] > 10) {
      playing = false;

      // remove active player background
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      activePlayer = activePlayer === 0 ? 1 : 0;

      // add the winner background
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');

      // Display YOU WIN in BIG SCORE box
      document.getElementById(`score--${activePlayer}`).textContent =
        'YOU WIN!';

      // hide dice
      diceEl.classList.add('hidden');
    } else {
      // Switch to the new player
      switchPlayer();
    } // end if/else
  } // end if playing condition
}); // end btn hold function

// if a player presses New Game btn
btnNew.addEventListener('click', function () {
  // remove the winner background
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  // add active player background
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');

  // set big scores back to 0
  score1El.textContent = 0;
  score2El.textContent = 0;
  // hide dice at first
  diceEl.classList.add('hidden');
  // reset saved scores to 0
  scores = [0, 0];

  current0El.textContent = 0;
  current1El.textContent = 0;

  // set currentScore back to 0 so it is not saved from previous game
  currentScore = 0;

  // Get active player dynamically
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  playing = true;
}); // end New Game function
