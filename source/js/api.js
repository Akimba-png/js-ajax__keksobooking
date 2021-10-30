import { adaptAdToClient } from './util';

const checkResponseStatus = (response) => {
  if (response.ok) {
    return response;
  }
  const { status, statusText } = response;
  throw new Error(`Error ${status} occurred - ${statusText}`);
};

export const getData = (onSuccess, onError) => {
  fetch('https://22.javascript.pages.academy/keksobooking/data')
    .then(checkResponseStatus)
    .then((response) => response.json())
    .then((ads) => ads.map(adaptAdToClient))
    .then((adaptedAds) => onSuccess(adaptedAds))
    .catch(onError);
};
