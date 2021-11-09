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

roomNumberSelectElement.addEventListener('change', (evt) => {
  const choosenValue = (evt.target.value === '100') ? '0' : evt.target.value;
  for (let i = 0; i < capacitySelectElement.length; i++) {
    capacitySelectElement[i].disabled = true;
    if (capacitySelectElement[i].value === choosenValue) {
      capacitySelectElement[i].disabled = false;
    }
    if (capacitySelectElement[i].value <= choosenValue && capacitySelectElement[i].value > 0) {
      capacitySelectElement[i].disabled = false;
    }
  }
});

//тип жилья
const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};
const typeSelectElement = document.querySelector('#type');
const priceInputElement = document.querySelector('#price');

typeSelectElement.addEventListener('change', (evt) => {
  const minPrice = MIN_PRICE[evt.target.value];
  priceInputElement.min = minPrice;
  priceInputElement.placeholder = minPrice;
});


//синхронизация времени
const timeinSelectElement = document.querySelector('#timein');
const timeoutSelectElement = document.querySelector('#timeout');

timeinSelectElement.addEventListener('change', (evt) => {
  timeoutSelectElement.value = evt.target.value;
});

timeoutSelectElement.addEventListener('change', (evt) => {
  timeinSelectElement.value = evt.target.value;
});
