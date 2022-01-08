import './pictures.js';
import './filters.js';

import { setUploadFormSubmit, formSuccessSubmitHandler } from './form.js';
import { renderSimilarPictures, setDiscussedButtonClick, setDefaultButtonClick, setRandomButtonClick } from './pictures.js';
import { sortPicturesByComments, sortPicturesByRandom } from './filters.js';
import { showErrorMessageGetData } from './utils.js';
import { getData } from './api.js';

getData(
  (pictures) => {
    renderSimilarPictures(pictures);
    setDefaultButtonClick(() => renderSimilarPictures(pictures));
    setRandomButtonClick(() => renderSimilarPictures(sortPicturesByRandom(pictures)));
    setDiscussedButtonClick(() => renderSimilarPictures(sortPicturesByComments(pictures)));
  },
  showErrorMessageGetData
);

setUploadFormSubmit(formSuccessSubmitHandler);
