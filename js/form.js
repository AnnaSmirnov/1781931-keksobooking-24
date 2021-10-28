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
    element.remonveAttribute('disabled');
  });
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterElements.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

document.addEventListener('DOMContentLoaded',() => {
  makesPageActive();
});

export {makesPageInactive,makesPageActive};

const titleInput = adForm.querySelector('#title');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;


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
