/* eslint-disable no-use-before-define */
import { isEscEvent  } from './utils.js';
import { getReportHashtagsText } from './validation.js';

const DEFAULT_SCALE_VALUE = 100;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;
const SCALE_VALUE_PER_STEP = 25;

const uploadForm = document.querySelector('.img-upload__form');
const pictureUploadOverlay = uploadForm.querySelector('.img-upload__overlay');
const uploadFileInput = uploadForm.querySelector('#upload-file');
const picturePreview = uploadForm.querySelector('.img-upload__preview').querySelector('img');
const cancelButton = uploadForm.querySelector('.img-upload__cancel');
const textHashtagsInput = uploadForm.querySelector('.text__hashtags');
const textCommentInput = uploadForm.querySelector('.text__description');
const imgUploadScale = uploadForm.querySelector('.img-upload__scale');
const scaleButtonSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleButtonBigger = imgUploadScale.querySelector('.scale__control--bigger');
const scaleInput = imgUploadScale.querySelector('.scale__control--value');

let currentScaleValue = DEFAULT_SCALE_VALUE;

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
  scaleInput.value = DEFAULT_SCALE_VALUE;
  textHashtagsInput.value = '';
  textCommentInput.value = '';
  currentScaleValue = DEFAULT_SCALE_VALUE;
};

const setScaleValue = (scaleValue) => {
  if (scaleValue < 100) {
    picturePreview.style = `transform: scale(0.${scaleValue})`;
  } else {
    picturePreview.style = `transform: scale(${scaleValue / 100})`;
  }
  scaleInput.value = `${scaleValue}%`;
};

const cancelButtonClickHandler = (evt) => {
  evt.preventDefault(evt);
  hideUploadForm();
  resetUploadForm();
  setScaleValue(DEFAULT_SCALE_VALUE);
};

const escButtonKeydownHandler = (evt) => {
  if (isEscEvent(evt) && evt.target !== textHashtagsInput) {
    evt.preventDefault();
    hideUploadForm();
    resetUploadForm();
    setScaleValue(DEFAULT_SCALE_VALUE);
  }
};

const downloadButtonClickHandler = () => {
  showUploadForm();
};

uploadFileInput.addEventListener('change', downloadButtonClickHandler);

textHashtagsInput.addEventListener('input', () => {
  const value = textHashtagsInput.value;
  const report = getReportHashtagsText(value);

  textHashtagsInput.setCustomValidity(`${report}`);
  textHashtagsInput.reportValidity();
});

scaleButtonSmaller.addEventListener('click', (evt) => {
  if (currentScaleValue >= MIN_SCALE_VALUE + SCALE_VALUE_PER_STEP) {
    currentScaleValue -= SCALE_VALUE_PER_STEP;
  }
  setScaleValue(currentScaleValue);
  evt.target.blur();
});

scaleButtonBigger.addEventListener('click', (evt) => {
  if (currentScaleValue <= MAX_SCALE_VALUE - SCALE_VALUE_PER_STEP) {
    currentScaleValue += SCALE_VALUE_PER_STEP;
  }
  setScaleValue(currentScaleValue);
  evt.target.blur();
});

setScaleValue(DEFAULT_SCALE_VALUE);
