/* array containing all my cards.
Note that there are 8 pairs or 16 individual cards in total.
*/
const cardPics = [
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-music",
  "fa-diamond",
  "fa-paper-plane-o",
  "fa-anchor",
  "fa-bolt",
  "fa-cube",
  "fa-leaf",
  "fa-bicycle",
  "fa-music"
]

//these arrays are empty for now - will be filled later as the game progresses.
let openedCards = []
let completedPairs = []

const deck = document.querySelector(".deck")
let moves = document.querySelector('.moves')
const stars = document.querySelectorAll(".fa-star");
const restartButton = document.querySelector(".restart")
const allCards = document.querySelectorAll(".card")

let second = 0,
  minute = 0;
let timer = document.querySelector(".timer");
// Using a falsy value here so that the startTimer function will only run once the cardClicked event fires, and will not re-run when another card is clicked
let interval = null;

function startTimer() {
  if (interval) {
    return
  }
  interval = setInterval(function() {
    timer.innerHTML = `${minute} minutes ${second} seconds`
    second++;
    if (second == 60) {
      minute++;
      second = 0;
    }
    if (minute == 60) {
      hour++;
      minute = 0;
    }
  }, 1000);
}

/* small functions which are either invoked by each other
or later by the event handlers. This stops me writing more code than I need to, or having very large and bloated functions. */

function showCard(card) {
  card.classList.add('open', 'show')
}

function hideCard(card) {
  card.classList.remove('open', 'show')
}

function addMoves() {
  // increments the innerHTML of the moves variable by 1.
  moves.innerHTML++
  checkStarRating()
}

function checkStarRating() {
  if (moves.innerHTML > 9 && moves.innerHTML < 14) {
      for(i=0; i < 3; i++) {
        if (i > 1) {
          stars[i].style.visibility = "collapse"
        }
      }
  } else if (moves.innerHTML > 18){
    for(i=0; i < 3; i++) {
      if (i > 0) {
          stars[i].style.visibility = "collapse"
      }
    }
  }
}

function resetStars() {
  for(i=0; i < 3; i++) {
    stars[i].style.visibility = "visible"
  }
}

function resetCards() {
  for (i=0; i < 16; i++) {
    allCards[i].classList.remove("match", "open", "show") 
  }
}

function wrongMove() {
  // a while loop to remove the cards from openCards using the pop() method, then re-enables the deck for play
  while (openedCards.length !== 0) {
    hideCard(openedCards.pop())
    enableDeck()
  }
}

function emptyOpenedCards() {
  completedPairs.push(openedCards)
  openedCards.pop()
  enableDeck()
}

function disableDeck() {
  // removes the pointer events on the deck so the user cannot open more than two cards
  deck.classList.add("disabled")
}

function enableDeck() {
  deck.classList.remove("disabled")
}

function turnMatchGreen() {
  openedCards[0].classList.add("match")
  openedCards[1].classList.add("match")
}

function congratulations() {
  /* TODO: this needs to be a modal containing
  1 congratulations message
  2 time taken to complete game
  3 star rating
  4 option to reset board
  */
  window.alert("all the pairs are belong to you!")
  clearInterval(interval)
}

// this will be run when a card is clicked
function cardClicked(event) {
  startTimer()
  let selectedCard = event.target

  /* adds the cards to the openedCards array
  if they aren't already there
  */
  if (!openedCards.includes(selectedCard)) {
    showCard(selectedCard)
    openedCards.push(selectedCard)
  }

  // central logic for checking the cards
  if (openedCards.length === 2) {
    // prevents further clicking so user cannot quickly open
    // more than two cards
    disableDeck()
    // increment moves by 1
    addMoves()
    if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
      turnMatchGreen()
      // empty openCardsArray
      while (openedCards.length !== 0) {
        emptyOpenedCards()
        if (completedPairs.length === 16) {
          setTimeout(congratulations, 250)
        }
      }
    } else {
      // will invove wrongMove function after 0.5 seconds
      setTimeout(wrongMove, 500)
    }
  }
}

function deckClicked(event) {
  // if the click was on a card, pass it on to the card clicked event

  if (event.target.className === "card") {
    cardClicked(event)
  } else {
    console.log("you clicked the deck. Oops!")
  }
}


function newGame() {
  moves.innerHTML = 0
  resetStars()
  resetCards()
  second = 0
  minute = 0
  clearInterval(interval)
  emptyOpenedCards()
  completedPairs = []
}

deck.addEventListener("click", deckClicked)
restartButton.addEventListener("click", newGame)
newGame()



/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}
