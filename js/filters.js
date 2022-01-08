import { getRandomPositiveInteger } from './utils/utils.js';
import { renderSimilarPictures } from './pictures.js';
import { debounce } from './utils/debounce.js';

const RANDOM_PICTURES_COUNT = 10;
const TIMEOUT_DELAY = 500;

const filterContainer = document.querySelector('.img-filters');
const filterButtons = filterContainer.querySelectorAll('.img-filters__button');

const filterButtonsClickHandler = (evt) => {
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

const setFilterContainerClickHandler = (defaultPictures) => {
  let currentPictures = [];

  const changeFilterHandler = (evt) => {
    if (evt.target.id === 'filter-default') {
      currentPictures = defaultPictures;
      renderSimilarPictures(currentPictures);
    } else if (evt.target.id === 'filter-random') {
      currentPictures = sortPicturesByRandom(defaultPictures);
      renderSimilarPictures(currentPictures);
    } else if (evt.target.id === 'filter-discussed') {
      currentPictures = sortPicturesByComments(defaultPictures);
      renderSimilarPictures(currentPictures);
    }
  };

  filterContainer.addEventListener('click', debounce(changeFilterHandler), TIMEOUT_DELAY);
};

filterButtons.forEach((button) => button.addEventListener('click', filterButtonsClickHandler));
filterContainer.classList.remove('img-filters--inactive');

export {
  sortPicturesByComments,
  sortPicturesByRandom,
  setFilterContainerClickHandler
};
