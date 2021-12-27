/* eslint-disable no-use-before-define */
import { isEscEvent  } from './utils.js';

const DEFAULT_SCALE = '55%';

const uploadForm = document.querySelector('.img-upload__form');
const pictureUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFileInput = uploadForm.querySelector('#upload-file');
const picturePreview = uploadForm.querySelector('.img-upload__preview').querySelector('img');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');

const showUploadForm = () => {
  pictureUploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  const [file] = uploadFileInput.files;
  picturePreview.src = URL.createObjectURL(file);
  cancelButton.addEventListener('click', cancelButtonClickHandler);
  document.addEventListener('keydown', escButtonKeydownHandler);
};

const hideUploadForm = () => {
  pictureUploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escButtonKeydownHandler);
  cancelButton.removeEventListener('click', cancelButtonClickHandler);
};

const resetUploadForm = () => {
  uploadFileInput.value = '';
  uploadForm.querySelector('.scale__control--value').value = DEFAULT_SCALE;
  uploadForm.querySelector('.text__hashtags').value = '';
  uploadForm.querySelector('.text__description').value = '';
};

const cancelButtonClickHandler = (evt) => {
  evt.preventDefault(evt);
  hideUploadForm();
  resetUploadForm();
};

const escButtonKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    hideUploadForm();
    resetUploadForm();
  }
};

const downloadButtonClickHandler = () => {
  showUploadForm();
};

uploadFileInput.addEventListener('change', downloadButtonClickHandler);
