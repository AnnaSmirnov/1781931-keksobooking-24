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

export {getRandomInteger, getRandomFloat, getRandomItemsArray};
