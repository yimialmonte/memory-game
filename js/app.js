/*
 * Create a list that holds all of your cards
 */
var listOfCards = [
    'fa-diamond',
    'fa-paper-plane-o',
    'fa-anchor',
    'fa-bolt',
    'fa-cube',
    'fa-anchor',
    'fa-leaf',
    'fa-bicycle',
    'fa-diamond',
    'fa-bomb',
    'fa-leaf',
    'fa-bomb',
    'fa-bolt',
    'fa-bicycle',
    'fa-paper-plane-o',
    'fa-cube'
];

var cardsShuffle = shuffle(listOfCards);
var previousCar = null;
var currentCar = null;
var chance = 0;

var deck = document.createElement('ul');
deck.classList.add('deck');

for(var i =0; i < listOfCards.length; i++){
    var liElement = document.createElement('li');
    liElement.classList.add('card');
    var iElement = document.createElement('i');
    iElement.classList.add('fa');
    iElement.classList.add(cardsShuffle[i]);
    liElement.appendChild(iElement);
    deck.appendChild(liElement);
}

var container = document.querySelector('.container');

container.append(deck);

deck.addEventListener('click', function(event) {
    currentCar = event.target.querySelector('.fa');
    currentCar2 = event.target;
    chance++;
    event.target.classList.toggle('open');
    event.target.classList.toggle('show');
    if(chance == 2) {
        if(currentCar.className !== previousCar.className) {
            setTimeout(function() {
                currentCar2.classList.remove('open');
                currentCar2.classList.remove('show');

                previousCar2.classList.remove('open');
                previousCar2.classList.remove('show');
            }, 2000);
        } 
        chance = 0; 
    } 
    previousCar = event.target.querySelector('.fa');
    previousCar2 = event.target;
    console.log(previousCar);
});


/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */




// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

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