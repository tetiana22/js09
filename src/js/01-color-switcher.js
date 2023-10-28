const refs ={
    startBtn: document.querySelector('button[data-start]'),
    stopBtn: document.querySelector('button[data-stop]'),
}

let intervalId = null;

refs.startBtn.addEventListener('click', () => {
    intervalId = setInterval(() => {
      document.body.style.background = getRandomHexColor();
    }, 1000);
    refs.startBtn.disabled = true;
  });
  
  refs.stopBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    refs.startBtn.disabled = false;
  });

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
  }
