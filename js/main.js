import './pictures.js';
import './form.js';
import { setUploadFormSubmit, formSuccessSubmitHandler } from './form.js';
import { renderSimilarPictures } from './pictures.js';
import { showErrorMessage } from './utils.js';

const URL_GET_METHOD = 'https://23.javascript.pages.academy/kekstagram/data';

const createFetch = (onSuccess, onError) => {
  fetch(URL_GET_METHOD)
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
      onError(err);
    });

  setUploadFormSubmit(formSuccessSubmitHandler);
};

createFetch(renderSimilarPictures, showErrorMessage);
