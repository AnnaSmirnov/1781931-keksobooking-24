import {adForm,resetForm} from './form.js';
import {showMessageSuccess,showMessageError,closeMessage} from './utils.js';
import { showAlert } from './utils.js';

const SAVE_FORM_URL = 'https://24.javascript.pages.academy/keksobooking';
const DATE_MAP_URL = 'https://24.javascript.pages.academy/keksobooking/data';

const getData = (onSuccess) => {
  fetch(DATE_MAP_URL)
    .then((response) => {
      if (response.ok) {
        response.json()
          .then((offers) => {
            onSuccess(offers);
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
          showMessageSuccess();
          closeMessage(document.querySelector('.success'));
          resetForm();
        } else {
          showMessageError();
          closeMessage(document.querySelector('.error'));
        }
      })
      .catch(() => {
        showMessageError();
        closeMessage(document.querySelector('.error'));
      });
  });
};

export {getData, sendData};
