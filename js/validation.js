const getReportHashtagsText = (text) => {
  const regex = /^#[A-Za-zА-Яа-я0-9]{1,19}$/;
  const regexFirstSymbol = /^#/;

  // убирает дублирующиеся пробелы, обрезает пробелы по концам строки, применяет split()
  const hashtags = text.replace(/\s\s+/g, ' ').trim().split(' ');
  const hashtagsLowerCase = hashtags.map((hashtag) => hashtag.toLowerCase());
  const uniqueHashtagsLowerCase = new Set(hashtagsLowerCase);

  if (hashtags.length > 5) {
    return 'Максимальное количество хэштегов равно 5';
  }
  if (hashtagsLowerCase.length !== uniqueHashtagsLowerCase.size) {
    return 'Хэштеги не должны повторяться (регистр букв не учитывается)';
  }
  if (!(hashtags.every((hashtag) => regexFirstSymbol.test(hashtag)))) {
    return 'Хэштег должен начинаться с символа #';
  }
  if (!(hashtags.every((hashtag) => regex.test(hashtag)))) {
    return 'Неправильный хэштег';
  }

  return '';
};

export { getReportHashtagsText };
