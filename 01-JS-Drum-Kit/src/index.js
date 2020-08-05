const keyCodes = {
  'A': 65,
  'S': 83,
  'D': 68,
  'F': 70,
  'G': 71,
  'H': 72,
  'J': 74,
  'K': 75,
  'L': 76,
};

function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSound(e) {
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

function playSoundOnTouch(e) {
  // console.log(e);
  const audio = document.querySelector(`audio[data-key="${keyCodes[e.path[0].innerText]}"]`);
  const key = document.querySelector(`div[data-key="${keyCodes[e.path[0].innerText]}"]`);
  if (!audio) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach((key) => {
  key.addEventListener('transitionend', removeTransition);
  key.addEventListener('touchstart', playSoundOnTouch, false);
});
window.addEventListener('keydown', playSound);
