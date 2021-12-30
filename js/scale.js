const INITIAL_SCALE_VALUE = 100;
const SCALE_VALUE_PER_STEP = 25;
const MIN_SCALE_VALUE = 25;
const MAX_SCALE_VALUE = 100;

const imgPreview = document.querySelector('.img-upload__preview').querySelector('img');
const imgUploadScale = document.querySelector('.img-upload__scale');
const scaleButtonSmaller = imgUploadScale.querySelector('.scale__control--smaller');
const scaleButtonBigger = imgUploadScale.querySelector('.scale__control--bigger');
const scaleInput = imgUploadScale.querySelector('.scale__control--value');

let currentScaleValue = INITIAL_SCALE_VALUE;

const setScaleValue = (scaleValue) => {
  if (scaleValue < 100) {
    imgPreview.style = `transform: scale(0.${scaleValue})`;
  } else {
    imgPreview.style = `transform: scale(${scaleValue / 100})`;
  }
  scaleInput.value = `${scaleValue}%`;
};

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

setScaleValue(INITIAL_SCALE_VALUE);
