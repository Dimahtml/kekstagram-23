import { createPictures } from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const similarPicturesContainer = document.querySelector('.pictures');

const similarPictures = createPictures();

const similarPicturesFragment = document.createDocumentFragment();

similarPictures.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__likes').textContent = likes;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  similarPicturesFragment.appendChild(pictureElement);
});

similarPicturesContainer.appendChild(similarPicturesFragment);
