import './pictures.js';
import './filters.js';
import './upload-picture.js';

import { setUploadFormSubmit, formSuccessSubmitHandler } from './form.js';
import { renderSimilarPictures } from './pictures.js';
import { setFilterContainerClickHandler } from './filters.js';
import { showErrorMessageGetData } from './utils/utils.js';
import { getData } from './api.js';

getData(
  (pictures) => {
    renderSimilarPictures(pictures);
    setFilterContainerClickHandler(pictures);
  },
  showErrorMessageGetData
);

setUploadFormSubmit(formSuccessSubmitHandler);
