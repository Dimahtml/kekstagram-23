/* eslint-disable no-use-before-define */
import { isEscEvent, showErrorMessage } from './utils.js';
import { getReportHashtagsText } from './validation.js';
import { sendData } from './api.js';

const DEFAULT_EFFECT_VALUE = 100;
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
const scaleButtonSmaller = uploadForm.querySelector('.scale__control--smaller');
const scaleButtonBigger = uploadForm.querySelector('.scale__control--bigger');
const scaleInput = uploadForm.querySelector('.scale__control--value');
const pictureEffectsContainer = uploadForm.querySelector('.effects__list');
const valueElement = uploadForm.querySelector('.effect-level__value');
const sliderElement = uploadForm.querySelector('.effect-level__slider');
let successMessageTemplate = null;

let currentScaleValue = DEFAULT_SCALE_VALUE;
let currentEffect = '';

const setUploadFormSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    sendData(
      () => onSuccess(),
      () => showErrorMessage('Не удалось отправить форму. Попробуйте еще раз'),
      new FormData(evt.target),
    );
  });
};

const showUploadForm = () => {
  pictureUploadOverlay.classList.remove('hidden');
  sliderElement.classList.add('hidden');
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

const showSuccessMessage = () => {
  successMessageTemplate = document.querySelector('#success').content;
  document.body.appendChild(successMessageTemplate.cloneNode(true));

  const successButton = document.querySelector('.success__button');

  document.addEventListener('keydown', escButtonKeydownOnSuccessMessageHandler);
  document.addEventListener('click', successMessageClickHandler);
  successButton.addEventListener('click', successButtonClickHandler);
};

const hideSuccessMessage = () => {
  const successButton = document.querySelector('.success__button');
  const successMessage = document.querySelector('.success');

  document.body.removeChild(successMessage);

  document.removeEventListener('keydown', escButtonKeydownOnSuccessMessageHandler);
  document.removeEventListener('click', successMessageClickHandler);
  successButton.removeEventListener('click', successButtonClickHandler);
};

const setScaleValue = (scaleValue) => {
  if (scaleValue < 100) {
    picturePreview.style.transform = `scale(0.${scaleValue})`;
  } else {
    picturePreview.style.transform = `scale(${scaleValue / 100})`;
  }
  scaleInput.value = `${scaleValue}%`;
};

const clearPictureEffects = () => {
  picturePreview.className = '';
  currentEffect = '';

  sliderElement.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 10,
    connect: 'lower',
  });

  document.querySelector('#effect-none').checked = true;
  picturePreview.style.filter = 'none';
};

const cancelButtonClickHandler = (evt) => {
  evt.preventDefault(evt);
  hideUploadForm();
  resetUploadForm();
  clearPictureEffects();
  setScaleValue(DEFAULT_SCALE_VALUE);
};

const escButtonKeydownHandler = (evt) => {
  if (isEscEvent(evt) && evt.target !== textHashtagsInput) {
    evt.preventDefault();
    hideUploadForm();
    resetUploadForm();
    clearPictureEffects();
    setScaleValue(DEFAULT_SCALE_VALUE);
  }
};

const downloadButtonClickHandler = () => {
  showUploadForm();
};

const effectsChangeHandler = (evt) => {
  if (evt.target && evt.target.matches('input[type="radio"]')) {
    currentEffect = evt.target.value;
    valueElement.value = DEFAULT_EFFECT_VALUE;
    picturePreview.className = '';
    picturePreview.classList.add(`effects__preview--${evt.target.value}`);

    if (currentEffect === 'none') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        start: 100,
        step: 10,
        connect: 'lower',
      });
    }

    if (currentEffect === 'chrome' || currentEffect === 'sepia') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
      });
      sliderElement.noUiSlider.set(1);
    }

    if (currentEffect === 'marvin') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
      });
      sliderElement.noUiSlider.set(100);
    }

    if (currentEffect === 'phobos') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
      });
      sliderElement.noUiSlider.set(3);
    }

    if (currentEffect === 'heat') {
      sliderElement.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
      });
      sliderElement.noUiSlider.set(3);
    }
  }
};

const formSuccessSubmitHandler = () => {
  resetUploadForm();
  clearPictureEffects();
  setScaleValue(DEFAULT_SCALE_VALUE);
  hideUploadForm();
  showSuccessMessage();
};

const successButtonClickHandler = (evt) => {
  evt.preventDefault();
  hideSuccessMessage();
};

// в разметке successMessage - это область вне попапа с сообщением
const successMessageClickHandler = (evt) => {
  const successMessage = document.querySelector('.success');
  evt.preventDefault();
  if (evt.target === successMessage) {
    hideSuccessMessage();
  }
};

const escButtonKeydownOnSuccessMessageHandler = (evt) => {
  if (isEscEvent(evt)) {
    hideSuccessMessage();
  }
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

pictureEffectsContainer.addEventListener('change', effectsChangeHandler);

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 10,
  connect: 'lower',
});

sliderElement.noUiSlider.on('update', (_values, handle, unencoded) => {
  valueElement.value = unencoded[handle];

  if (currentEffect === 'none') {
    picturePreview.style.filter = 'none';
    sliderElement.classList.add('hidden');
  } else if (currentEffect === 'chrome') {
    picturePreview.style.filter = `grayscale(${valueElement.value})`;
    sliderElement.classList.remove('hidden');
  } else if (currentEffect === 'sepia') {
    picturePreview.style.filter = `sepia(${valueElement.value})`;
    sliderElement.classList.remove('hidden');
  } else if (currentEffect === 'marvin') {
    picturePreview.style.filter = `invert(${valueElement.value}%)`;
    sliderElement.classList.remove('hidden');
  } else if (currentEffect === 'phobos') {
    picturePreview.style.filter = `blur(${valueElement.value}px)`;
    sliderElement.classList.remove('hidden');
  } else if (currentEffect === 'heat') {
    picturePreview.style.filter = `brightness(${valueElement.value})`;
    sliderElement.classList.remove('hidden');
  }
});

setScaleValue(DEFAULT_SCALE_VALUE);

export { setUploadFormSubmit, formSuccessSubmitHandler };
