const adForm = document.querySelector('.ad-form');
const adFormElement = adForm.querySelectorAll('.ad-form__element');
const mapFilter = document.querySelector('.map__filters');
const mapFilterElement = mapFilter.querySelectorAll('.map__filter');


const getInactiveForm = () => {
  adFormElement.forEach((element) => {
    element.setAttribute('disabled', '');
  });
  adForm.classList.add('ad-form--disabled');
  mapFilter.classList.add('map__filters--disabled');
  mapFilterElement.forEach((element) => {
    element.setAttribute('disabled', '');
  });
};

const getAciveForm = () => {
  adFormElement.forEach((element) => {
    element.remonveAttribute('disabled', '');
  });
  adForm.classList.remove('ad-form--disabled');
  mapFilter.classList.remove('map__filters--disabled');
  mapFilterElement.forEach((element) => {
    element.removeAttribute('disabled', '');
  });
};

document.addEventListener('DOMContentLoaded',() => {
  getAciveForm();
});

export {getInactiveForm,getAciveForm};
