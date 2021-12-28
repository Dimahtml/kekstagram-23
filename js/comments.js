const IMAGE_WIDTH = 35;
const IMAGE_HEIGHT = 35;

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
  comments.forEach((comment) => createComment(comment));
};

const clearCommentsContainer = () => {
  commentsContainer.innerHTML = '';
};

export { createSimilarComments, clearCommentsContainer };
