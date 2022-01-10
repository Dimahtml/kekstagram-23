/* eslint-disable no-use-before-define */
import { isEscEvent  } from './utils/utils.js';
import { renderSimilarComments, clearContainer } from './comments.js';

const COMMENTS_PER_STEP = 5;

let currentComments = [];

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const commentsContainer = bigPicture.querySelector('.social__comments');
const commentCount = bigPicture.querySelector('.social__comment-count');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const showMoreButton = bigPicture.querySelector('.social__comments-loader');

const showMoreButtonClickHandler = () => {
  const additionalComments = currentComments.slice(
    commentsContainer.children.length,
    commentsContainer.children.length + COMMENTS_PER_STEP,
  );

  renderSimilarComments(additionalComments);
  bigPicture.querySelector('.social__comment-count').innerHTML = `
    ${commentsContainer.children.length} из <span class="comments-count">${currentComments.length}</span> комментариев
  `;

  if (currentComments.length === commentsContainer.children.length) {
    showMoreButton.classList.add('hidden');
  }
};

const renderFirstComments = (comments) => {
  const firstComments = comments.slice(0, COMMENTS_PER_STEP);
  renderSimilarComments(firstComments);
  commentCount.firstChild.textContent = `${firstComments.length  } из  `;
  if (firstComments.length === comments.length) {
    showMoreButton.classList.add('hidden');
  }
};

const showBigPicture = (url, likesCount, comments, description) => {
  currentComments = comments;

  bigPictureImg.src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likesCount;
  bigPicture.querySelector('.comments-count').textContent = comments.length;

  showMoreButton.classList.remove('hidden');
  document.body.classList.add('modal-open');

  document.addEventListener('keydown', escButtonKeydownHandler);
  cancelButton.addEventListener('click', cancelButtonClickHandler);
  showMoreButton.addEventListener('click', showMoreButtonClickHandler);

  clearContainer(commentsContainer);
  renderFirstComments(comments);

  bigPicture.querySelector('.social__comment-count').innerHTML = `
    ${commentsContainer.children.length} из <span class="comments-count">${comments.length}</span> комментариев
  `;
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('keydown', escButtonKeydownHandler);
  cancelButton.removeEventListener('click', cancelButtonClickHandler);
  showMoreButton.removeEventListener('click', showMoreButtonClickHandler);
};

const escButtonKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    evt.target.blur();
    hideBigPicture();
  }
};

const cancelButtonClickHandler = () => hideBigPicture();

export { showBigPicture };
