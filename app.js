const gameContainer = document.getElementById("game");
let card1 = null;
let card2 = null;
let cardsFlipped = 0;
let noClicking = false;

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "teal",
  "black",
  "pink",
  "teal",
  "black",
  "pink",
];


function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    const newDiv = document.createElement("div");
    newDiv.classList.add(color);
    newDiv.addEventListener("click", handleCardClick);
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  console.log("you just clicked", event.target);

  if(noClicking) return;
  if(event.target.classList.contains('flipped')) return;

  let currentCard = event.target;
  currentCard.style.backgroundColor = currentCard.classList[0];

  if(!card1 || !card2) {
    currentCard.classList.add('flipped');
    card1 = card1 || currentCard;
    card2 = currentCard === card1 ? null : currentCard;
  }

  if(card1 && card2){
    noClicking = true;
    let gif1 = card1.className;
    let gif2 = card2.className;

    if(gif1 === gif2){
      cardsFlipped += 2;
      card1.removeEventListener('click', handleCardClick);
      card2.removeEventListener('click', handleCardClick);
      card1 = null;
      card2 = null;
      noClicking = false;
    } else {
      setTimeout(function(){
        card1.style.backgroundColor = '';
        card2.style.backgroundColor = '';
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        card1 = null;
        card2 = null;
        noClicking = false;
      }, 500);
      }
    }
    if(cardsFlipped === COLORS.length) alert ('YOU WIN!');
  }


// when the DOM loads
createDivsForColors(shuffledColors);
