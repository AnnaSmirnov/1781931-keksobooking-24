const getData = (onSuccess) => {
  fetch('https://24.javascript.pages.academy/keksobooking/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Что-то пошло не так');
      }
    }).then((data) => {
      onSuccess(data);
    });
};

const sendData = (onSuccess, onError, data) => {
  const formData = new FormData(data);
  fetch('https://24.javascript.pages.academy/keksobooking', {
    method: 'POST',
    body: formData,
  }).then((response) => {
    if (response.ok) {
      onSuccess();
    } else {
      throw new Error('Не удалось отправить форму. Попробуйте ещё раз');
    }
  }).catch(() => {
    onError('Не удалось отправить форму. Попробуйте ещё раз');
  });
};

export {getData, sendData};
