import Notiflix from 'notiflix';

const form = document.querySelector(`.form`);
const delayInput = form.querySelector(`input[name="delay"]`);
const stepInput = form.querySelector(`input[name="step"]`);
const amountInput = form.querySelector(`input[name="amount"]`);

form.addEventListener(`submit`, handleSubmit);

function handleSubmit(event) {
  event.preventDefault();

  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  if (!delayInput.checkValidity() || !stepInput.checkValidity() || !amountInput.checkValidity()) {
    Notiflix.Notify.failure('Please fill in all fields correctly');
    return;
  }
  for (let i = 1; i <= amount; i++) {
    const position = i;
    const promiseDelay = delay + (i - 1) * step;
    const promise = createPromise(position, promiseDelay);
    promise.then(
      result =>
        Notiflix.Notify.success(
          `Promise ${result.position} resolved after ${result.delay} ms`
        ),
      error =>
        Notiflix.Notify.failure(
          `Promise ${error.position} rejected after ${error.delay} ms`
        )      
    );
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  })
}
