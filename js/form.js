import {sendData} from './api.js';
import {resetMap,MAP_CENTER_LAT,MAP_CENTER_LNG} from './map';
const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = mapFilter.querySelectorAll('.map__filter');

const titleInput = adForm.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

const roomNumberSelectElement = adForm.querySelector('#room_number');
const capacitySelectElement = adForm.querySelector('#capacity');

const typeSelectElement = document.querySelector('#type');
const priceInputElement = document.querySelector('#price');

const timeinSelectElement = document.querySelector('#timein');
const timeoutSelectElement = document.querySelector('#timeout');
const resetButton = adForm.querySelector('.ad-form__reset');

//активный и неактивный режим
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

//Валидация заголовка объявления
const titleValidate = () => {
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

//Валидация количества комнат
const roomSelectChange = () => {
  const choosenValue = (roomNumberSelectElement.value === '100') ? '0' : roomNumberSelectElement.value;
  for (let i = 0; i < capacitySelectElement.length; i++) {
    capacitySelectElement[i].disabled = true;
    if (capacitySelectElement[i].value === choosenValue) {
      capacitySelectElement[i].disabled = false;
    }
    if (capacitySelectElement[i].value <= choosenValue && capacitySelectElement[i].value > 0) {
      capacitySelectElement[i].disabled = false;
    }
  }

  switch(roomNumberSelectElement.value) {
    case '1':
      choosenValue(['1']);
      break;
    case '2':
      choosenValue(['1', '2']);
      break;
    case '3':
      choosenValue(['1', '2', '3']);
      break;
    case '100':
      choosenValue(['0']);
      break;
  }
  capacitySelectElement.reportValidity();
};

//тип жилья
const validatePrice = () => {
  if (Number(priceInputElement.value) < priceInputElement.min) {
    priceInputElement.setCustomValidity(`Минимальная цена ${priceInputElement.min}`);
  }
  else {
    priceInputElement.setCustomValidity('');
  }
  priceInputElement.reportValidity();
};
priceInputElement.addEventListener('input', () => {
  validatePrice();
});

const houseTypeSelectChange = () => {
  const setMinPrice = (minPrice) => {
    priceInputElement.min = minPrice;
    priceInputElement.placeholder = minPrice;
  };
  let minValidatorValue;
  switch(typeSelectElement.value) {
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

//синхронизация времени
const timeinChange = () => {
  timeoutSelectElement.value =  timeinSelectElement.value;
};

const timeoutChange = () => {
  timeinSelectElement.value = timeoutSelectElement.value;
};

const resetForm = () => {
  document.querySelector('.ad-form').reset();
  document.querySelector('.map__filters').reset();
  document.querySelector('#address').value = `${MAP_CENTER_LAT}, ${MAP_CENTER_LNG}`;
};

const setFormSubmit = (onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(evt.target.reset(), resetForm()),
      () => onError(),
      new FormData(evt.target),
    );
  });
};

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetMap();
});

roomNumberSelectElement.addEventListener('change', roomSelectChange);
typeSelectElement.addEventListener('change', houseTypeSelectChange);
titleInput.addEventListener('input', titleValidate);
timeinSelectElement.addEventListener('change', timeinChange);
timeoutSelectElement.addEventListener('change', timeoutChange);

export {makesPageInactive,makesPageActive,setFormSubmit};
