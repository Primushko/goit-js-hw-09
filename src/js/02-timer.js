import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
        } else {
            startButton.removeAttribute(`disabled`);
        }    
    },
});
startButton.setAttribute('disabled', true);

