import { mockAdsData } from './mock';
import { getRoomPostfix, getGuestPostfix, housingType } from './util';

const templateElement = document.querySelector('#card').content.querySelector('.popup');
const containerElement = document.querySelector('.map__canvas');


const renderAvailableFeatures = (adTemplate, features) => {
  const featuresList = adTemplate.querySelector('.popup__features');
  Array.from(featuresList.children)
    .forEach((featuresItem) => featuresList.removeChild(featuresItem));
  const featuresListFragment = document.createDocumentFragment();
  features.forEach((feature) => {
    const featuresElement = document.createElement('li');
    featuresElement.classList.add('popup__feature');
    featuresElement.classList.add(`popup__feature--${feature}`);
    featuresListFragment.appendChild(featuresElement);
  });
  return featuresList.appendChild(featuresListFragment);
};

const renderPhotos = (adTemplate, photos) => {
  const photosFragment = document.createDocumentFragment();
  const photoContainerElement = adTemplate.querySelector('.popup__photos');
  const photoElement = adTemplate.querySelector('.popup__photo');
  photos.forEach((photo) => {
    const photoItem = photoElement.cloneNode();
    photoItem.src = photo;
    photosFragment.appendChild(photoItem);
  });
  photoContainerElement.removeChild(photoElement);
  return photoContainerElement.appendChild(photosFragment);
};

const createAdsTemplate = (adsData) => {
  const fragmentElement = document.createDocumentFragment();
  adsData.forEach((adData) => {
    const adTemplate = templateElement.cloneNode(true);
    adTemplate.querySelector('.popup__avatar').src = adData.author.avatar;
    adTemplate.querySelector('.popup__title').textContent = adData.offer.title;
    adTemplate.querySelector('.popup__text--address').textContent = adData.offer.address;
    adTemplate.querySelector('.popup__text--price').textContent = `${adData.offer.price} ₽/ночь`;
    adTemplate.querySelector('.popup__type').textContent = housingType[adData.offer.type];
    adTemplate.querySelector('.popup__text--capacity').textContent = `${adData.offer.rooms} ${getRoomPostfix(adData.offer.rooms)} для ${adData.offer.guests} ${getGuestPostfix(adData.offer.guests)}`;
    adTemplate.querySelector('.popup__text--time').textContent = `Заезд после ${adData.offer.checkin}, выезд до ${adData.offer.checkout}`;
    renderAvailableFeatures(adTemplate, adData.offer.features);
    adTemplate.querySelector('.popup__description').textContent = adData.offer.description;
    renderPhotos(adTemplate, adData.offer.photos);
    fragmentElement.appendChild(adTemplate);
  });
  containerElement.appendChild(fragmentElement);
};

createAdsTemplate(mockAdsData.slice(0, 1));
