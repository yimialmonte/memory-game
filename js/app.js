/*
 * Create a list that holds all of your cards
 */
let symbols = ["fa-diamond", "fa-paper-plane-o", "fa-anchor", "fa-bolt", "fa-cube", "fa-leaf", "fa-bicycle", "fa-bomb"];

let listOfCards = symbols.concat(symbols);

listOfCards =[...symbols, ...symbols];

// Variables to use

let cardsShuffle, closingCar, previousCar, currentCar, chance, point, totalMoves, timer, timerStart, 
interval, timeStart, startToRemove, deck, container, restart, starts;

const timeToRemoveStar = 10;
const pointToWin = 8;
const delay = ms => new Promise(res => setTimeout(res, ms));

function init() {
   
    cardsShuffle = shuffle(listOfCards);
    previousCar = null;
    openCarts = [];
    currentCar = null;
    chance = 0;
    point = 0;
    totalMoves = 0;
    timer = 0;
    timerStart = false;
    timeStart = 0;
    startToRemove = 1;
    deck = document.createElement('ul');
    restart = document.querySelector('.restart');
    paintBoard();
    closingCar = false;
    createStart();
}

function reset() {
    let carts = [...document.getElementsByClassName('card')];
    carts.forEach(element => {
        element.classList.remove('open');
        element.classList.remove('show');
    });
    
    cardsShuffle = shuffle(listOfCards);
    for(var i =0; i < listOfCards.length; i++){
        let element = document.getElementById('item-' + i);
        element.className = '';
        element.classList.add('fa');
        element.classList.add(cardsShuffle[i]);
    }
    previousCar = null;
    currentCar = null;
    chance = 0;
    point = 0;
    totalMoves = 0;
    timer = 0;
    timerStart = false;
    timeStart = 0;
    startToRemove = 1;
    stopInterval();
    document.querySelector('.moves').innerHTML = totalMoves;
    document.querySelector('.timer').innerHTML = `${timer} Seconds`;
    closingCar = false;
    removeStarts();
    createStart();
}

function paintBoard() {
    deck.classList.add('deck');
    for(var i =0; i < listOfCards.length; i++){
        let liElement = document.createElement('li');
        liElement.classList.add('card');
        let iElement = document.createElement('i');
        iElement.classList.add('fa');
        iElement.classList.add(cardsShuffle[i]);
        iElement.setAttribute("id", 'item-' + i);
        liElement.appendChild(iElement);
        deck.appendChild(liElement);
    }
    container = document.querySelector('.container');
    container.append(deck);
}

function removeStarts() {
    if(document.contains(document.querySelector('#start-1'))) {
        document.querySelector('#start-1').remove();
    }
    if(document.contains(document.querySelector('#start-2'))) {
        document.querySelector('#start-2').remove();
    }
    if(document.contains(document.querySelector('#start-3'))) {
        document.querySelector('#start-3').remove();
    }
}


function createStart() {
    starts = document.querySelector('.stars');
    for(var i =1; i <= 3; i++){ 
        let liElement = document.createElement('li');
        let iElement = document.createElement('i');
        iElement.classList.add('fa');
        iElement.classList.add('fa-star');
        iElement.setAttribute("id", 'start-' + i);
        liElement.appendChild(iElement);
        starts.appendChild(liElement);
    }
    
}

init();

function startTimer () {
    interval = setInterval(function() {
        document.querySelector('.timer').innerHTML = `${++timer} Seconds`;
    } , 1000);
}

function stopInterval(){
    clearInterval(interval);
}


restart.addEventListener('click', function(event) {
    reset();
});

function startAgain () {
    reset();
    document.getElementById("myDialog").close();
}

function getEventTarget(e) {
    e = e || window.event;
    return e.target || e.srcElement; 
}

  
deck.addEventListener('click',function(event) {
    if(getEventTarget(event).tagName === "UL" || closingCar) { return };

    currentCar = event.target.querySelector('.fa');
    if(currentCar == null) return;

    let currentParent = currentCar.parentNode || null;
    if(currentParent.classList.contains('open')) {
        return;
    }
    
    if(timerStart === false){
        startTimer();
        timerStart = true;
    }
    
    if(event.target.className === 'card open show'){
        return;
    }
    totalMoves++;
    removeStart(totalMoves);
    timeStart++;
    document.querySelector('.moves').innerHTML = totalMoves;
    currentCar2 = event.target;
    chance++;
    
    event.target.classList.toggle('open');
    event.target.classList.toggle('show');
    if(chance == 2) {
        if(currentCar.className !== previousCar.className) {
            closeCart(currentCar2, previousCar2);
        } else {
            point++;
        }
        chance = 0; 
    }
    previousCar = event.target.querySelector('.fa');
    previousCar2 = event.target;
    checkIsWin(point);
});

const closeCart = async (currentCar2, previousCar2) => {
    closingCar = true;
    await delay(150);
    currentCar2.classList.remove('open', 'show');
    previousCar2.classList.remove('open', 'show');
    closingCar = false;
}

function checkIsWin(point) {
    if(point >= pointToWin) {
        document.getElementById("myDialog").showModal();
        document.querySelector('.time-to-win').innerHTML = `Total Times: ${timer}`;
        let totalStarts = [...document.querySelectorAll('.fa-star')];
        document.querySelector('.total-starts').innerHTML = `Total Starts ${totalStarts.length}`;
        stopInterval();
    } 
}

function removeStart(totalMoves) {
    switch(totalMoves) {
        case 10: 
            document.querySelector('#start-1').remove();
            break;
        case 20:
            document.querySelector('#start-2').remove();
            break;
        default:
            break
    }
}


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

