import { getRandomPositiveInteger } from './utils/utils.js';

const RANDOM_PICTURES_COUNT = 10;

const filters = document.querySelector('.img-filters');
const filterButtons = filters.querySelectorAll('.img-filters__button');

filters.classList.remove('img-filters--inactive');

const filterButtonClickHandler = (evt) => {
  evt.preventDefault();
  filterButtons.forEach((button) => button.classList.remove('img-filters__button--active'));
  evt.target.classList.add('img-filters__button--active');
};

const sortPicturesByComments = (pictures) => {
  const copyPictures = pictures.slice();

  copyPictures.sort((pictureA, pictureB) => {
    if (pictureA.comments.length < pictureB.comments.length) {
      return 1;
    }
    if (pictureA.comments.length > pictureB.comments.length) {
      return -1;
    }
    return 0;
  });

  return copyPictures;
};

const sortPicturesByRandom = (pictures) => {
  const copyPictures = pictures.slice();
  const randomPictures = [];

  for (let i = 0; i < RANDOM_PICTURES_COUNT; i++) {
    const currentPicture = copyPictures.splice(getRandomPositiveInteger(0, copyPictures.length - 1), 1);
    randomPictures.push(currentPicture);
  }

  return randomPictures.flat();
};

filterButtons.forEach((button) => button.addEventListener('click', filterButtonClickHandler));

export { sortPicturesByComments, sortPicturesByRandom };
