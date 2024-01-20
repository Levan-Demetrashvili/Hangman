const categoryEl = document.getElementById('category-name');
let livesText = document.querySelector('.lives-text');
const clue = document.getElementById('clue');
const lettersbtns = document.querySelectorAll('.letter');
const guesses = document.getElementById('word');
// Buttons
const btnHint = document.getElementById('hint');
const btnReset = document.getElementById('reset');

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
let randomCategoryNum, category, randomWordNum, word, counterLives, lives, guessesArr;

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
        counterLives--;
        console.log(counterLives);
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
