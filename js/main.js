import './pictures.js';

import { setUploadFormSubmit, formSuccessSubmitHandler } from './form.js';
import { renderSimilarPictures } from './pictures.js';
import { showErrorMessageGetData } from './utils.js';
import { getData } from './api.js';

getData(
  (pictures) => renderSimilarPictures(pictures),
  showErrorMessageGetData
);

setUploadFormSubmit(formSuccessSubmitHandler);
