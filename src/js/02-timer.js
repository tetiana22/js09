import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

document.body.style.backgroundColor = '#C0C0C0';

const refs = {
  dateTime: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.disabled = true;

refs.startBtn.addEventListener('click', timerStart);

flatpickr(refs.dateTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose([selectedDates]) {
    if (selectedDates.getTime() < Date.now()) {
      Notiflix.Notify.warning("Please choose a date in the future");
    } else {
      refs.startBtn.disabled = false;
      selectedDate = selectedDates.getTime();
    }
  },
});

let selectedDate;
const TIMER_DELAY = 1000;
let intervalId;

function timerStart() {
  intervalId = setInterval(() => {
    const currentDate = Date.now();
    const diff = selectedDate - currentDate;
    if (diff <= 0) {
      refs.startBtn.disabled = true;
      refs.dateTime.disabled = false;
      clearInterval(intervalId);
      return;
    } else {
      refs.startBtn.disabled = true;
      refs.dateTime.disabled = true;
      convertMs(diff);
    }
  }, TIMER_DELAY);
}

function createMarkup({ days, hours, minutes, seconds }) {
  refs.days.textContent = addLeadingZero(days);
  refs.hours.textContent = addLeadingZero(hours);
  refs.minutes.textContent = addLeadingZero(minutes);
  refs.seconds.textContent = addLeadingZero(seconds);
}

function convertMs(time) {
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);
  createMarkup({ days, hours, minutes, seconds });
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}