import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.6.min.css';

const refs = {
  inputDelayEl: document.querySelector('input[name="delay"]'),
  inputStepEl: document.querySelector('input[name="step"]'),
  inputAmountEl: document.querySelector('input[name="amount"]'),
  btnCreatePromise: document.querySelector('button'),
};

refs.btnCreatePromise.addEventListener('click', onClickBtn);

function onClickBtn(e) {
  e.preventDefault();
  let deleyValue = +refs.inputDelayEl.value;
  let stepValue = +refs.inputStepEl.value;
  let amountValue = +refs.inputAmountEl.value;

  for (let position = 1; position <= amountValue; position += 1) {
    createPromise(position, deleyValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    deleyValue += stepValue;
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
  });
}
