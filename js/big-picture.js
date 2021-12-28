/* eslint-disable no-use-before-define */
import { isEscEvent  } from './utils.js';
import { renderSimilarComments, clearContainer } from './comments.js';

const COMMENTS_PER_STEP = 5;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const commentsContainer = document.querySelector('.social__comments');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');

const showBigPicture = (url, likesCount, comments, description) => {
  const currentCommentsCount = COMMENTS_PER_STEP;
  const commentsCount = comments.length > COMMENTS_PER_STEP ? currentCommentsCount : comments.length;
  bigPicture.querySelector('.social__comment-count').innerHTML = `
    ${commentsCount} из <span class="comments-count">${comments.length}</span> комментариев
  `;

  bigPictureImg.src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likesCount;
  bigPicture.querySelector('.comments-count').textContent = comments.length;
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', escButtonKeydownHandler);
  cancelButton.addEventListener('click', cancelButtonClickHandler);
  clearContainer(commentsContainer);
  renderSimilarComments(commentsContainer, comments);
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  document.removeEventListener('keydown', escButtonKeydownHandler);
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
