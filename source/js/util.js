const shuffleArray = (array) => {
  const shuffledArray = array.slice();
  let j;
  let temp;

  for (let i = shuffledArray.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = shuffledArray[j];
    shuffledArray[j] = shuffledArray[i];
    shuffledArray[i] = temp;
  }
  return shuffledArray;
};

export const getRandomInteger = (a, b) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomDecimal = (a, b, fraction = 5) => {
  const min = Math.ceil(Math.min(a, b));
  const max = Math.floor(Math.max(a, b));
  return (Math.random() * (max - min) + min).toFixed(fraction);
};

export const getRandomArrayElement = (array) =>
  array[getRandomInteger(0, array.length - 1)];

export const getRandomArray = (array) =>
  shuffleArray(array).slice(0, getRandomInteger(1, array.length));

export const getRoomPostfix = (roomNumber) => {
  switch (true) {
    case roomNumber === 1:
      return 'комната';
    case roomNumber > 4:
      return 'комнат';
    default:
      return 'комнаты';
  }
};

export const getGuestPostfix = (guestNumber) =>
  guestNumber === 1 ? 'гостя' : 'гостей';

export const housingType = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
};
