import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from "notiflix";

document.body.style.backgroundColor = '#C0C0C0';

const TIMER_DELAY = 1000;
let intervalId = null;
let selectedDate = null;
let currentDate = null;

const refs = {
    dateTime: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]')
};
refs.startBtn.disabled = true;

flatpickr(refs.dateTime, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() < Date.now()) {
        Notiflix.Notify.warning("Please choose a date in the future");
    } else {
      refs.startBtn.disabled = false;
      const setTimer = () => {
        selectedDate = selectedDates[0].getTime();
        timer.start();
      };

      refs.startBtn.addEventListener('click', setTimer);
    }
  },
});

const timer = {
  counter: document.querySelector('.timer'),
  start() {
    intervalId = setInterval(() => {
      refs.startBtn.disabled = true;
     refs.dateTime.disabled = true;
      currentDate = Date.now();
      const diff = selectedDate - currentDate;
      if (diff <= 0) {
        this.stop();

        return;
      }
      const { days, hours, minutes, seconds } = this.convertMs(diff);
      this.counter.querySelector('[data-days]').textContent =
        this.addLeadingZero(days);
      this.counter.querySelector('[data-hours]').textContent =
        this.addLeadingZero(hours);
      this.counter.querySelector('[data-minutes]').textContent =
        this.addLeadingZero(minutes);
      this.counter.querySelector('[data-seconds]').textContent =
        this.addLeadingZero(seconds);
    }, TIMER_DELAY);
  },
  stop() {
    clearInterval(intervalId);
    this.intervalId = null;
    refs.startBtn.disabled = true;
    refs.dateTime.disabled = false;
  },

  convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = this.addLeadingZero(Math.floor(ms / day));
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    const minutes = this.addLeadingZero(
      Math.floor(((ms % day) % hour) / minute)
    );
    const seconds = this.addLeadingZero(
      Math.floor((((ms % day) % hour) % minute) / second)
    );

    return { days, hours, minutes, seconds };
  },


  addLeadingZero(value) {
    return String(value).padStart(2, 0);
  },
};

console