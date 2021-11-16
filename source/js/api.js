import { adaptAdToClient, adaptPostedAdToClient } from './util';
import { storage } from './storage';

const ApiRoute = {
  DOWNLOAD_URL: 'https://22.javascript.pages.academy/keksobooking/data',
  UPLOAD_URL: 'https://22.javascript.pages.academy/keksobooking',
};

const checkResponseStatus = (response) => {
  if (response.ok) {
    return response;
  }
  const { status, statusText } = response;
  throw new Error(`Error ${status} occurred - ${statusText}`);
};

export const getData = (onSuccess, onError) => {
  fetch(ApiRoute.DOWNLOAD_URL)
    .then(checkResponseStatus)
    .then((response) => response.json())
    .then((ads) => ads.map(adaptAdToClient))
    .then((adaptedAds) => onSuccess(adaptedAds))
    .catch(onError);
};

export const sendData = (onSuccess, onFail, payload) => {
  fetch(ApiRoute.UPLOAD_URL,
    {
      method: 'POST',
      body: payload,
    })
    .then(checkResponseStatus)
    .then((response) => response.json())
    .then((ad) => adaptPostedAdToClient(ad))
    .then((adaptedAd) => storage.setAd(adaptedAd))
    .then(onSuccess)
    .catch(onFail);
};
