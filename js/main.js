function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min; //Максимум и минимум включаются
}

function checkStringLength(string, maxLength) {
  return string.length <= maxLength;
}

getRandomIntInclusive();
checkStringLength();
