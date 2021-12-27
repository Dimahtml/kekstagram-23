import { isEscEvent  } from './utils.js';
import { createSimilarComments, clearCommentsContainer } from './comments.js';

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

const showBigPicture = (url, likesCount, comments, description) => {
  bigPictureImg.src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likesCount;
  bigPicture.querySelector('.comments-count').textContent = comments.lenght;
  document.body.classList.add('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.addEventListener('keydown', escButtonKeydownHandler);
  // eslint-disable-next-line no-use-before-define
  cancelButton.addEventListener('click', cancelButtonClickHandler);
  clearCommentsContainer();
  createSimilarComments(comments);

  // прячем пару пунктов, с ними разберемся позже
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', escButtonKeydownHandler);
  // eslint-disable-next-line no-use-before-define
  cancelButton.removeEventListener('click', cancelButtonClickHandler);
};

const pictureClickHandler = (evt, url, likesCount, comments, description) => {
  evt.preventDefault();
  showBigPicture(url, likesCount, comments, description);
  bigPicture.classList.remove('hidden');
};

const escButtonKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    evt.target.blur();
    hideBigPicture();
  }
};

const cancelButtonClickHandler = () => hideBigPicture();

export { pictureClickHandler };
