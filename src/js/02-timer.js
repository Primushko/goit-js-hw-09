import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = document.querySelector(`#datetime-picker`);
const startButton = document.querySelector(`[data-start]`);
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let countdownIntervalId;

flatpickr('#datetime-picker', {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        const now = new Date();
        if (selectedDate < now) {
            window.alert(`Please choose a date in the future`);
            startButton.setAttribute('disabled', true);
        } else {
            startButton.removeAttribute(`disabled`);
        }    
    },
});

function startCountdown(endDate) {
    countdownIntervalId = setInterval(() => {
        const currentDate = new Date();
        const remainingTime = endDate - currentDate;
        
        if (remainingTime <= 0) {
            clearInterval(countdownIntervalId);
            updateUI(0, 0, 0, 0);
            return;
        }
        const { days, hours, minutes, seconds } = convertMs(remainingTime);
        updateUI(days, hours, minutes, seconds);
    }, 1000);
}

function stopCountdown() {
    clearInterval(countdownIntervalId);
}

function updateUI(days, hours, minutes, seconds) {
    daysEl.textContent = padNumber(days);
    hoursEl.textContent = padNumber(hours);
    minutesEl.textContent = padNumber(minutes);
    secondsEl.textContent = padNumber(seconds);
}

function padNumber(number) {
    return number.toString().padStart(2, '0');
}

startButton.addEventListener('click', () => {
    const endDate = new Date(datetimePicker.value);
    startCountdown(endDate);
});

datetimePicker.addEventListener('change', () => {
    stopCountdown();
});

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}



