import './pictures.js';
import './form.js';
import { setUploadFormSubmit, hideUploadForm } from './form.js';
import { renderSimilarPictures } from './pictures.js';

fetch('https://23.javascript.pages.academy/kekstagram/data')
  .then((response) => response.json())
  .then((pictures) => {
    renderSimilarPictures(pictures);
  });

setUploadFormSubmit(hideUploadForm);
