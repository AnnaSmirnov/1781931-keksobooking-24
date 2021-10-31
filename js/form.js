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
    titleInput.setCustomValidity(`Ещё ${  MIN_TITLE_LENGTH - valueLength } символов`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${  valueLength - MAX_TITLE_LENGTH } символов`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
});

//Валидация количества комнат

const roomNumberSelectElement = adForm.querySelector('#room_number');
const capacitySelectElement = adForm.querySelector('#capacity');

capacitySelectElement.addEventListener('change', (evt) => {
  if (roomNumberSelectElement.value === '1' && ['3', '2', '0'].includes(evt.target.value)) {
    capacitySelectElement.setCustomValidity('Количество гостей: 1');
  } else if (roomNumberSelectElement.value === '2' && ['3', '0'].includes(evt.target.value)) {
    capacitySelectElement.setCustomValidity('Количество гостей: 1-2');
  } else if (roomNumberSelectElement.value === '3' && ['0'].includes(evt.target.value)) {
    capacitySelectElement.setCustomValidity('Количество гостей: 1-3');
  } else if (roomNumberSelectElement.value === '100' && ['3', '2', '1'].includes(evt.target.value)) {
    capacitySelectElement.setCustomValidity('Не для гостей');
  } else {
    capacitySelectElement.setCustomValidity('');
  }
  capacitySelectElement.reportValidity();
});
