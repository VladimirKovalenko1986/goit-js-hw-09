import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  inputDate: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  spanDays: document.querySelector('span[data-days]'),
  spanHours: document.querySelector('span[data-hours]'),
  spanMinutes: document.querySelector('span[data-minutes]'),
  spanSeconds: document.querySelector('span[data-seconds]'),
};

let timerId = null;
let isTimerStopped = false;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const selectedDate = selectedDates[0];

    if (selectedDate < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', '');
    } else {
      options.defaultDate = selectedDate;
      refs.startBtn.removeAttribute('disabled', '');
    }
  },
};

flatpickr(refs.inputDate, options);

refs.startBtn.setAttribute('disabled', '');

refs.startBtn.addEventListener('click', onClickTimer);

function onClickTimer() {
  timerId = setInterval(() => {
    const selectedDate = refs.inputDate.value;
    const ms = new Date(selectedDate) - Date.now();

    if (ms < 0) {
      stopInterval();
      clearTimerPanel();
      return;
    }

    const convertDate = convertMs(ms);

    refs.spanDays.textContent = convertDate.days;
    refs.spanHours.textContent = convertDate.hours;
    refs.spanMinutes.textContent = convertDate.minutes;
    refs.spanSeconds.textContent = convertDate.seconds;
  }, 1000);
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function stopInterval() {
  if (!isTimerStopped) {
    clearInterval(timerId);
    isTimerStopped = true;
    Notiflix.Notify.success('The timer has been stopped!');
  }
}

function clearTimerPanel() {
  refs.spanDays.textContent = '00';
  refs.spanHours.textContent = '00';
  refs.spanMinutes.textContent = '00';
  refs.spanSeconds.textContent = '00';
}
