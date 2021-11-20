import {getData} from './api.js';
import {resetMap} from './map.js';
import {removeAvatarFoto} from './avatar.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAP_CENTER_LAT = 35.68390;
const MAP_CENTER_LNG = 139.75323;

const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = mapFilter.querySelectorAll('.map__filter');
const titleInput = adForm.querySelector('#title');
const roomNumberElement = adForm.querySelector('#room_number');
const capacityElement = adForm.querySelector('#capacity');
const typeElement = document.querySelector('#type');
const priceElement = document.querySelector('#price');
const timeinElement = document.querySelector('#timein');
const timeoutElement = document.querySelector('#timeout');
const resetButton = adForm.querySelector('.ad-form__reset');

document.querySelector('#address').value = `${MAP_CENTER_LAT}, ${MAP_CENTER_LNG}`;

const makesPageInactive = () => {
  adFormElements.forEach((element) => {
    element.setAttribute('disabled', '');
  });
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  mapFilterElements.forEach((element) => {
    element.setAttribute('disabled', '');
  });
};

const makesPageActive = () => {
  adFormElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

const activateFilterForm = () => {
  mapFilter.classList.remove('ad-form--disabled');
};

const onTitleInput = () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} символов`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
};

const onCapacityChange = () => {
  const choosenValue = (roomNumberElement.value === '100') ? '0' : roomNumberElement.value;
  for (let i = 0; i < capacityElement.length; i++) {
    capacityElement[i].disabled = true;
    if (capacityElement[i].value === choosenValue) {
      capacityElement[i].disabled = false;
    }
    if (capacityElement[i].value <= choosenValue && capacityElement[i].value > 0) {
      capacityElement[i].disabled = false;
    }
  }
  capacityElement.value = capacityElement.querySelector('option:not([disabled])').value;

  capacityElement.reportValidity();
};

const onPriceInput = () => {
  if (Number(priceElement.value) < priceElement.min) {
    priceElement.setCustomValidity(`Минимальная цена ${priceElement.min}`);
  }
  else {
    priceElement.setCustomValidity('');
  }
  priceElement.reportValidity();
};

const onTypeChange = () => {
  const setMinPrice = (minPrice) => {
    priceElement.min = minPrice;
    priceElement.placeholder = minPrice;
  };
  let minValidatorValue;
  switch(typeElement.value) {
    case 'bungalow':
      minValidatorValue = 0;
      break;
    case 'flat':
      minValidatorValue = 1000;
      break;
    case 'hotel':
      minValidatorValue = 3000;
      break;
    case 'house':
      minValidatorValue = 5000;
      break;
    case 'palace':
      minValidatorValue = 10000;
      break;
  }
  setMinPrice(minValidatorValue);
};

const onTimeinChange = () => {
  timeoutElement.value =  timeinElement.value;
};

const onTimeoutChange = () => {
  timeinElement.value = timeoutElement.value;
};

const resetForm = () => {
  adForm.reset();
  document.querySelector('.map__filters').reset();
  document.querySelector('#address').value = `${MAP_CENTER_LAT}, ${MAP_CENTER_LNG}`;
  onTypeChange(true);
  onCapacityChange();
  resetMap();
  getData();
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
  resetMap();
  removeAvatarFoto();
});

roomNumberElement.addEventListener('change', onCapacityChange);
priceElement.addEventListener('input', onPriceInput);
typeElement.addEventListener('change', onTypeChange);
titleInput.addEventListener('input', onTitleInput);
timeinElement.addEventListener('change', onTimeinChange);
timeoutElement.addEventListener('change', onTimeoutChange);

export {makesPageInactive,makesPageActive,activateFilterForm,resetForm,adForm};
