import './pictures.js';
import './filters.js';

import { setUploadFormSubmit, formSuccessSubmitHandler } from './form.js';
import { renderSimilarPictures } from './pictures.js';
import { sortPicturesByComments, sortPicturesByRandom, setDiscussedButtonClick, setDefaultButtonClick, setRandomButtonClick } from './filters.js';
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
