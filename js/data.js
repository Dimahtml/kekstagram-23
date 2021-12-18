import { getRandomPositiveInteger, getRandomItem } from './utils.js';

const DESCRIPTION = 'Отличный кадр получился, правда?';
const LIKES_MIN_COUNT = 15;
const LIKES_MAX_COUNT = 200;
const COMMENTS_MIN_COUNT = 1;
const COMMENTS_MAX_COUNT = 4;
const URL_INDEXES_COUNT = 25;

const NAMES = [
  'Максим',
  'Вика',
  'Настя',
  'Костя',
  'Сеня',
  'Федя',
];

const AVATARS = [
  'img/avatar-1.svg',
  'img/avatar-2.svg',
  'img/avatar-3.svg',
  'img/avatar-4.svg',
  'img/avatar-5.svg',
  'img/avatar-6.svg',
];

const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];

let lastPictureId = 0;
let lastCommentId = 0;

const getPictureId = () => {
  lastPictureId += 1;
  const result = lastPictureId;
  return result;
};

const getCommentId = () => {
  lastCommentId += 1;
  const result = lastCommentId;
  return result;
};

const getPictureUrl = (pictureNumbers) => {
  const index = getRandomPositiveInteger(0, pictureNumbers.length - 1);
  const pictureNumber = pictureNumbers.splice(index, 1);
  return `photos/${pictureNumber}.jpg`;
};

const createComment = function() {
  return {
    id: getCommentId(),
    avatar: getRandomItem(AVATARS),
    message: getRandomItem(MESSAGES),
    name: getRandomItem(NAMES),
  };
};

const createSimilarComments = function () {
  const commentsCount = getRandomPositiveInteger(COMMENTS_MIN_COUNT, COMMENTS_MAX_COUNT);
  const similarComments = new Array(commentsCount).fill(null).map(() => createComment());
  return similarComments;
};

const picturesUrlIndexes = new Array(URL_INDEXES_COUNT).fill(null).map((item, index) => index + 1);

const createPicture = function () {
  return {
    id: getPictureId(),
    url: getPictureUrl(picturesUrlIndexes),
    description: DESCRIPTION,
    likes: getRandomPositiveInteger(LIKES_MIN_COUNT, LIKES_MAX_COUNT),
    comments: createSimilarComments(),
  };
};

export { createPicture };
