import { DISABLED_CLASS, COORDINATE_ACCURACY, RADIX } from './const';

const PLURAL_ENDING_NUMBER = 4;
const DEBOUNCE_DELAY = 500;

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

export const getRandomDecimal = (a, b, fraction = COORDINATE_ACCURACY) => {
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
    case roomNumber > PLURAL_ENDING_NUMBER:
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

export const adaptAdToClient = (ad) => {
  const adaptedAd = Object.assign(
    {},
    ad,
    {
      offer: Object.assign(
        {},
        ad.offer,
        {
          location:
          {
            x: ad.location.lat,
            y: ad.location.lng,
          },
        },
      ),
    },
  );
  delete adaptedAd.location;
  return adaptedAd;
};

const checkAvailableFeatures = (features) => {
  if (!features) {
    return [];
  }
  return typeof features === 'object' ? features : [features];
};

export const adaptPostedAdToClient = (ad) => {
  const adaptedAd = {
    author: ad.author || '',
    offer: {
      address: ad.address || '',
      checkin: ad.timein || '',
      checkout: ad.timeout || '',
      description: ad.description || '',
      features: checkAvailableFeatures(ad.features),
      guests: ad.capacity || 1,
      location: {
        x: parseFloat(ad.address.split(',  ')[0]),
        y: parseFloat(ad.address.split(',  ')[1]),
      },
      photos: ad.files || [],
      price: parseInt(ad.price, RADIX),
      rooms: ad.rooms || '',
      title: ad.title || '',
      type: ad.type || '',
    },
  };
  return [adaptedAd];
};

export const toggleFormStatus = (formElement) => {
  formElement.classList.toggle(DISABLED_CLASS);
  Array.from(formElement.children)
    .forEach((element) => element.disabled = element.disabled === false);
};

export const debounce = (cb) => {
  let intervalId;
  return () => {
    clearTimeout(intervalId);
    intervalId = setTimeout(cb, DEBOUNCE_DELAY);
  };
};
