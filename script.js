const categoryEl = document.getElementById('category-name');
let livesText = document.querySelector('.lives-text');
const clue = document.getElementById('clue');
const lettersbtns = document.querySelectorAll('.letter');
const guesses = document.getElementById('word');
// Buttons
const btnHint = document.getElementById('hint');
const btnReset = document.getElementById('reset');

//* Canvas
/** @type {HTMLCanvasElement} */

const canvas = document.getElementById('stickman');
const ctx = canvas.getContext('2d');
const width = canvas.width;
const height = canvas.height;
ctx.fillStyle = 'white';
ctx.strokeStyle = 'white';
ctx.lineWidth = 2;

function drawVector(x1, y1, x2, y2) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.stroke();
}
const act1 = () => ctx.fillRect(0, height, width / 2, -1);
const act2 = () => ctx.fillRect(10, 0, 2, height);
const act3 = () => ctx.fillRect(0, 0, width / 4, 2);
const act4 = () => ctx.fillRect(width / 4 - 10, 2, 2, 10);

const act5 = () => {
  ctx.beginPath();
  ctx.lineWidth = 3;
  ctx.arc(width / 4 - 10, 22, 10, 0, 2 * Math.PI);
  ctx.stroke();
  ctx.closePath();
};
ctx.lineWidth = 2;

const act6 = () => ctx.fillRect(width / 4 - 10, 32, 2, 40);
const act7 = () => drawVector(65, 46, 22, 54);
const act8 = () => drawVector(65, 46, 104, 54);
const act9 = () => drawVector(66, 71, 22, 100);
const act10 = () => drawVector(66, 71, 108, 100);

const reservedActions = [act1, act2, act3, act4, act5, act6, act7, act8, act9, act10];

// starting condition
const categoriesArr = ['football Premier league Teams', 'Films', 'Cities'];
const chosenCategoryArr = [
  ['everton', 'liverpool', 'swansea', 'chelsea', 'hull', 'manchester-city', 'newcastle-united'],
  ['alien', 'dirty-harry', 'gladiator', 'finding-nemo', 'jaws'],
  ['manchester', 'milan', 'madrid', 'amsterdam', 'prague'],
];
const hintsArr = [
  [
    'Based in Mersyside',
    'Based in Mersyside',
    'First Welsh team to reach the Premier Leauge',
    'Owned by A russian Billionaire',
    'Once managed by Phil Brown',
    '2013 FA Cup runners up',
    "Gazza's first club",
  ],
  ['Science-Fiction horror film', '1971 American action film', 'Historical drama', 'Anamated Fish', 'Giant great white shark'],
  ['Northern city in the UK', 'Home of AC and Inter', 'Spanish capital', 'Netherlands capital', 'Czech Republic capital'],
];
let randomCategoryNum, category, randomWordNum, word, counterLives, lives, guessesArr, actions;

function removeClasses() {
  for (let letter of lettersbtns) {
    letter.classList.remove('active');
  }
}

function computeRandomWord() {
  randomCategoryNum = Math.floor(Math.random() * 3);
  category = categoriesArr[randomCategoryNum];
  categoryEl.textContent = category;
  randomWordNum = Math.floor(Math.random() * chosenCategoryArr[randomCategoryNum].length);
  word = chosenCategoryArr[randomCategoryNum][randomWordNum];
  console.log(word);
}
function addUnderScores() {
  //* add undersocres to hide word
  for (let i = 0; i < word.length; i++) {
    const letterHTML = `<li data-key='${word[i]}' class="guess">${word[i] === '-' ? '-' : '_'}</li>`;
    guesses.insertAdjacentHTML('beforeend', letterHTML);
  }
}

function init() {
  ctx.clearRect(0, 0, width, height);
  actions = [...reservedActions];
  counterLives = 10;
  livesText.innerHTML = '';
  livesText.outerHTML = `<p class="lives-text">You Have <span id="lives"> 10 </span> lives</p>`;
  clue.textContent = '';
  guesses.innerHTML = '';
  removeClasses();
  computeRandomWord();
  addUnderScores();
  livesText = document.querySelector('.lives-text');
  lives = document.getElementById('lives');
  guessesArr = Object.values(guesses.children);
}

init();

//* Event listeners
for (let letter of lettersbtns) {
  letter.addEventListener('click', function () {
    if (!letter.classList.contains('active') && livesText.textContent !== 'You Win!' && livesText.textContent !== 'Game Over') {
      // add class
      letter.classList.add('active');

      // if letter btn in word
      if (word.includes(letter.textContent)) {
        guessesArr.map(el => (el.getAttribute('data-key') === letter.textContent ? (el.textContent = letter.textContent) : ''));
        // if guess the word
        if (guessesArr.every(el => el.textContent !== '_')) {
          livesText.textContent = 'You Win!';
        }
      }
      // letter wrong
      else {
        // action[0]() -> actions.shift()();
        actions.shift()();
        counterLives--;
        lives.textContent = counterLives > 0 ? counterLives : (livesText.textContent = 'Game Over');
      }
    }
  });
}
btnHint.addEventListener('click', function () {
  const hint = hintsArr[randomCategoryNum][randomWordNum];
  clue.textContent = hint;
});
btnReset.addEventListener('click', init);
