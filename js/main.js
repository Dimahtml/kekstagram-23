import './pictures.js';

import { setUploadFormSubmit, formSuccessSubmitHandler } from './form.js';
import { renderSimilarPictures } from './pictures.js';
import { showErrorMessage } from './utils.js';
import { getData } from './api.js';

getData(
  (pictures) => renderSimilarPictures(pictures),
  showErrorMessage
);

setUploadFormSubmit(formSuccessSubmitHandler);
