import {
  HOUSING_TYPES,
  REGISTRATION_INTERVALS,
  FEATURES,
  PHOTOS,
} from './const';

import {
  getRandomInteger,
  getRandomArrayElement,
  getRandomArray,
  getRandomDecimal,
} from './util';


const createRentalAdData = () => {
  const longitude = getRandomDecimal(35.65000, 35.70000);
  const latitude = getRandomDecimal(139.70000, 139.80000);
  return {
    author: {
      avatar: `img/avatars/user0${getRandomInteger(1, 8)}.png`,
    },
    offer: {
      title: 'Accommodation of your dreams',
      address: `${longitude} ${latitude}`,
      price: getRandomInteger(100, 1000),
      type: getRandomArrayElement(HOUSING_TYPES),
      rooms: getRandomInteger(1, 20),
      guests: getRandomInteger(1, 10),
      checkin: getRandomArrayElement(REGISTRATION_INTERVALS),
      checkout: getRandomArrayElement(REGISTRATION_INTERVALS),
      features: getRandomArray(FEATURES),
      description: 'Lovely place to live',
      photos: getRandomArray(PHOTOS),
      location: {
        x: longitude,
        y: latitude,
      },
    },
  };
};

export const rentalAdData = new Array(10)
  .fill(null).map(() => createRentalAdData());
