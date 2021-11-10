const adForm = document.querySelector('.ad-form');
const adFormElements = adForm.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const mapFilterElements = mapFilter.querySelectorAll('.map__filter');


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

export {makesPageInactive,makesPageActive};

const titleInput = adForm.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

//Валидация заголовка объявления
titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - valueLength} символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} символов`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

//Валидация количества комнат
const roomNumberSelectElement = adForm.querySelector('#room_number');
const capacitySelectElement = adForm.querySelector('#capacity');
const capacityOptionList = capacitySelectElement.querySelectorAll('option');

const roomSelectChange = () => {
  const updateOptions = (optionList) => {
    capacityOptionList.forEach((option) => {
      if (optionList.includes(option.value)) {
        option.removeAttribute('disabled');
      }
      else {
        option.setAttribute('disabled', '');
        if (capacitySelectElement.value === option.value) {
          capacitySelectElement.value = '';
        }
      }
    });
  };
  switch(roomNumberSelectElement.value) {
    case '1':
      updateOptions(['1']);
      break;
    case '2':
      updateOptions(['1', '2']);
      break;
    case '3':
      updateOptions(['1', '2', '3']);
      break;
    case '100':
      updateOptions(['0']);
      break;
  }
};
roomNumberSelectElement.addEventListener('change', roomSelectChange);

//тип жилья
const typeSelectElement = document.querySelector('#type');
const priceInputElement = document.querySelector('#price');

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
  validatePrice();
};
typeSelectElement.addEventListener('change', houseTypeSelectChange);

//синхронизация времени
const timeinSelectElement = document.querySelector('#timein');
const timeoutSelectElement = document.querySelector('#timeout');

timeinSelectElement.addEventListener('change', (evt) => {
  timeoutSelectElement.value = evt.target.value;
});

timeoutSelectElement.addEventListener('change', (evt) => {
  timeinSelectElement.value = evt.target.value;
});
