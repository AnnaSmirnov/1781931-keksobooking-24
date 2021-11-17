import  {renderMarkers} from './map.js';
import {adForm,resetForm} from './form.js';
import {closeMessage,showAlert} from './utils.js';
import {setMapFilters,ADVERT_COUNT} from './filters.js';

const SAVE_FORM_URL = 'https://24.javascript.pages.academy/keksobooking';
const DATE_MAP_URL = 'https://24.javascript.pages.academy/keksobooking/data';

const getData = () => {
  fetch(DATE_MAP_URL)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((advert) => {
            renderMarkers(advert.slice(0, ADVERT_COUNT));
            setMapFilters();
          });
      } else {
        showAlert('Не удалось загрузить данные');
      }
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные');},
    );
};

const sendData = () => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      SAVE_FORM_URL,
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          closeMessage(document.querySelector('.success'));
          resetForm();
        } else {
          closeMessage(document.querySelector('.error'));
        }
      })
      .catch(() => {
        closeMessage(document.querySelector('.error'));
      });
  });
};

export {getData, sendData};
