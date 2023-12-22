const refs = {
  bodyEl: document.querySelector('body'),
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
};

let colorInterval = '';
let isActive = false;

refs.startBtn.disabled = isActive;
refs.stopBtn.disabled = !isActive;

refs.startBtn.addEventListener('click', onStartMovinColor);
refs.stopBtn.addEventListener('click', onStopMovinColor);

function onStartMovinColor() {
  refs.stopBtn.disabled = isActive;
  refs.startBtn.disabled = !isActive;

  colorInterval = setInterval(onRandomColor, 1000);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function onRandomColor() {
  const color = getRandomHexColor();

  refs.bodyEl.style.backgroundColor = color;
}

function onStopMovinColor() {
  refs.startBtn.disabled = isActive;
  refs.stopBtn.disabled = !isActive;

  clearInterval(colorInterval);
}
