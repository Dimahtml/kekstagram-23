const URL_METHOD_GET = 'https://23.javascript.pages.academy/kekstagram/data11';
const URL_METHOD_POST = 'https://23.javascript.pages.academy/kekstagram';

const getData = (onSuccess, onFail) => {
  fetch(URL_METHOD_GET)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw new Error(`Ошибка при загрузке данных от сервера. status: ${response.status} (${response.statusText})`);
    })
    .then((data) => {
      onSuccess(data);
    })
    .catch((err) => {
      onFail(err);
    });
};

const sendData = (onSuccess, onFail, body) => {
  fetch(
    URL_METHOD_POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        onSuccess();
      } else {
        onFail('Не удалось отправить форму. Попробуйте еще раз');
      }
    })
    .catch(() => {
      onFail('Не удалось отправить форму. Попробуйте еще раз');
    });
};

export { getData, sendData };
