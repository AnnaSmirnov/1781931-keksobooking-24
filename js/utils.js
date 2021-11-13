const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const closeButton = errorTemplate.querySelector('.error__button');
const errorLoadServerTemplate = document.querySelector('#error-load-server').content.querySelector('.error-load-server');

const ALERT_SHOW_TIME = 5000;

// Функция создания рандомного целого числа

const getRandomInteger = (min, max) => {
  if (min < 0 || max < 0){
    const errorRange = 'Некорректное значение диапазона';
    return errorRange;
  }
  if (min === max) {
    return max;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
};

// Источник Кекс. Функция создания рандомного числа с плавающей точкой

const getRandomFloat = (min, max, numberOfDecimalPlace) => {
  if (min < 0 || max < 0){
    const errorRange = 'Некорректное значение диапазона';
    return errorRange;
  }
  if (min === max) {
    return max;
  }
  if (max < min) {
    [min, max] = [max, min];
  }
  const randomFloat = (Math.random() * (max - min) + min);
  return randomFloat.toFixed(numberOfDecimalPlace);
};

//получить случайный элемент массива
const getRandomArrayElement = (arr) => {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
};

// Создание массива случайной длины
const getRandomItemsArray = (array) => {
  const items = array.slice();
  const randomCount = getRandomInteger(1, array.length-1);
  const resultArray = [];
  for (let i = 0; i < randomCount; i++ ) {
    const randomId = getRandomInteger(0,items.length-1);
    resultArray.push(items[randomId]);
    items.splice(randomId, 1);
  }
  return resultArray;
};

// Сообщение об успешном создании объявления

const showMessageSuccess = () => {
  const successElement = successTemplate.cloneNode(true);
  document.body.append(successElement);
};


// Сообщение об ошибке создания объявления

const showMessageError = () => {
  const errorElement = errorTemplate.cloneNode(true);
  document.body.append(errorElement);
};

export const isEscapeKey = (evt) => evt.key === 'Escape';

const closeMessage = (modal) => {
  document.addEventListener('keydown', (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      modal.remove();
    }
  });

  window.addEventListener('click', () => {
    modal.remove();
  });
};

// Закрытие сообщения
closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeMessage();
});

// Неудачная загрузка данных с сервера
const createMessageError = () => {
  const messageContainer = errorLoadServerTemplate.cloneNode(true);
  document.body.append(messageContainer);

  setTimeout(() => {
    messageContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomInteger, getRandomFloat, getRandomItemsArray, getRandomArrayElement, showMessageSuccess, showMessageError, closeMessage, createMessageError};
