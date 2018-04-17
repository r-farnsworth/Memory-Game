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

/* small function which only opens and displays the card.
The click event handler comes later on */
function showCard(card) {
  card.classList.add('open', 'show')
}

/* this function is the opposite of showCard();
it removes the classes and is invoked by the wrongMove() function. */
function hideCard(card) {
  card.classList.remove('open', 'show')
}


function wrongMove() {
  // a while loop to remove the cards from openCards using the pop() method
  while (openedCards.length !== 0) {
    hideCard(openedCards.pop())
  }
}



// set up event listener for showing the cards on click
function cardClicked(event) {
  let selectedCard = event.target

  if (!openedCards.includes(selectedCard)) {
    showCard(selectedCard)
    // adds the cards to the openedCards array using push()
    openedCards.push(selectedCard)
  }

  if (openedCards.length === 2) {
    if (openedCards[0].innerHTML === openedCards[1].innerHTML) {
      openedCards[0].classList.add('match')
      openedCards[1].classList.add('match')
      while (openedCards.length !== 0) {
        completedPairs.push(openedCards)
        openedCards.pop()
      }

    } else {
      // will invove wrongMove function after 1.5 seconds
      setTimeout(wrongMove, 1500)
    }
  }

  console.log(`cards in array: ${openedCards.length}`)
}

deck.addEventListener("click", cardClicked)



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

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
