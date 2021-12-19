import { createPicture } from './data.js';

const SIMILAR_PICTURE_COUNT = 25;

const similarPictures = new Array(SIMILAR_PICTURE_COUNT).fill(null).map(() => createPicture());

// eslint-disable-next-line no-console
console.log(similarPictures);
