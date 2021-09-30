function getRandomInteger(min, max) {
  if (min < 0 || max < 0){
    const errorRange = 'Некорректное значение диапазона';
    return errorRange;
  }
  if (min === max) {
    return max;
  }
  if (max < min) {
    const change = max;
    max = min;
    min = change;
  }
  return Math.floor(Math.random() * (max - min + 1) + min);
}

getRandomInteger();

function getRandomFloat(min, max, numberOfDecimalPlace) {
  if (min < 0 || max < 0){
    const errorRange = 'Некорректное значение диапазона';
    return errorRange;
  }
  if (min === max) {
    return max;
  }
  if (max < min) {
    const change = max;
    max = min;
    min = change;
  }
  const number = (Math.random() * (max - min) + min);
  return number.toFixed(numberOfDecimalPlace);
}

getRandomFloat();
