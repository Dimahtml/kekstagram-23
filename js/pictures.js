import { showBigPicture } from './big-picture.js';
import { createPictures } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPicturesContainer = document.querySelector('.pictures');
const bigPicture = document.querySelector('.big-picture');

const similarPictures = createPictures();

const similarPicturesFragment = document.createDocumentFragment();

const pictureClickHandler = (evt, url, likesCount, comments, description) => {
  evt.preventDefault();
  showBigPicture(url, likesCount, comments, description);
  bigPicture.classList.remove('hidden');
};

similarPictures.forEach(({url, likes, comments, description}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  similarPicturesFragment.appendChild(pictureElement);

  pictureElement.addEventListener('click', (evt) => pictureClickHandler(evt, url, likes, comments, description));
});

similarPicturesContainer.appendChild(similarPicturesFragment);

export { similarPictures };
