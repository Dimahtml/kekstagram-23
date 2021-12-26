const IMAGE_WIDTH = 35;
const IMAGE_HEIGHT = 35;

const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img').querySelector('img');
const cancelButton = bigPicture.querySelector('.big-picture__cancel');
const commentsContainer = document.querySelector('.social__comments');

const createComment = (comment) => {
  const listItem = document.createElement('li');
  const image = document.createElement('img');
  const paragraph = document.createElement('p');

  listItem.classList.add('social__comment');
  image.classList.add('social__picture');
  image.src = comment.avatar;
  image.alt = comment.name;
  image.width = IMAGE_WIDTH;
  image.height = IMAGE_HEIGHT;
  paragraph.classList.add('social__text');
  paragraph.textContent = comment.message;

  listItem.appendChild(image);
  listItem.appendChild(paragraph);
  commentsContainer.appendChild(listItem);
};

const createSimilarComments = (comments) => {
  while (commentsContainer.firstChild) {
    commentsContainer.removeChild(commentsContainer.firstChild);
  }
  comments.forEach((comment) => createComment(comment));
};

const showBigPicture = (url, likesCount, comments, description) => {
  bigPictureImg.src = url;
  bigPicture.querySelector('.social__caption').textContent = description;
  bigPicture.querySelector('.likes-count').textContent = likesCount;
  bigPicture.querySelector('.comments-count').textContent = comments.lenght;
  document.body.classList.add('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.addEventListener('keydown', escButtonHandler);
  // eslint-disable-next-line no-use-before-define
  cancelButton.addEventListener('click', cancelButtonHandler);
  createSimilarComments(comments);

  // прячем пару пунктов, с ними разберемся позже
  bigPicture.querySelector('.social__comment-count').classList.add('hidden');
  bigPicture.querySelector('.comments-loader').classList.add('hidden');
};

const hideBigPicture = () => {
  bigPicture.classList.add('hidden');
  document.body.classList.remove('modal-open');
  // eslint-disable-next-line no-use-before-define
  document.removeEventListener('keydown', escButtonHandler);
  // eslint-disable-next-line no-use-before-define
  cancelButton.removeEventListener('click', cancelButtonHandler);
};

const pictureClickHandler = (url, likesCount, comments, description) => {
  showBigPicture(url, likesCount, comments, description);
  bigPicture.classList.remove('hidden');
};

const escButtonHandler = (evt) => {
  if (evt.key === 'Escape') {
    hideBigPicture();
  }
};

const cancelButtonHandler = () => hideBigPicture();

export { pictureClickHandler };
