import { COORDINATE_ACCURACY } from './const';

export const adFormElement = document.querySelector('.ad-form');
const addressInputElement = adFormElement.querySelector('#address');

export const showAddress = (coordinate) => {
  const {lat, lng} = coordinate;
  addressInputElement.value = `${(lat).toFixed(COORDINATE_ACCURACY)},
  ${lng.toFixed(COORDINATE_ACCURACY)}`;
};
