const PriceSegment = {
  LOW: 'low',
  MIDDLE: 'middle',
  HIGH: 'high',
  ANY: 'any',
};

const PriceRank = {
  LOW: 10000,
  HIGH: 50000,
};

export const mapFilterElement = document.querySelector('.map__filters');
const housingTypeInputElement = mapFilterElement.querySelector('#housing-type');
const priceInputElement = mapFilterElement.querySelector('#housing-price');
const roomsInputElement = mapFilterElement.querySelector('#housing-rooms');
const guestsInputElement = mapFilterElement.querySelector('#housing-guests');
const wifiInputElement = mapFilterElement.querySelector('#filter-wifi');
const dishwasherInputElement = mapFilterElement.querySelector('#filter-dishwasher');
const parkingInputElement = mapFilterElement.querySelector('#filter-parking');
const washerInputElement = mapFilterElement.querySelector('#filter-washer');
const elevatorInputElement = mapFilterElement.querySelector('#filter-elevator');
const conditionerInputElement = mapFilterElement.querySelector('#filter-conditioner');


const checkFilterStatus = (filterInput, adValue) => {
  if (filterInput !== priceInputElement) {
    return filterInput.value === adValue.toString() || filterInput.value === 'any';
  }
  switch (filterInput.value) {
    case PriceSegment.LOW:
      return adValue < PriceRank.LOW;
    case PriceSegment.MIDDLE:
      return adValue > PriceRank.LOW && adValue < PriceRank.HIGH;
    case PriceSegment.HIGH:
      return adValue > PriceRank.HIGH;
    default:
      return PriceSegment.ANY;
  }
};

const getCheckboxStatus = (checkbox, adValue) =>
  adValue.includes(checkbox.value) ||!checkbox.checked;

export const applyFilter = (ad) =>
  checkFilterStatus(housingTypeInputElement, ad.offer.type)
  && checkFilterStatus(priceInputElement, ad.offer.price)
  && checkFilterStatus(roomsInputElement, ad.offer.rooms)
  && checkFilterStatus(guestsInputElement, ad.offer.guests)
  && getCheckboxStatus(wifiInputElement, ad.offer.features)
  && getCheckboxStatus(dishwasherInputElement, ad.offer.features)
  && getCheckboxStatus(parkingInputElement, ad.offer.features)
  && getCheckboxStatus(washerInputElement, ad.offer.features)
  && getCheckboxStatus(elevatorInputElement, ad.offer.features)
  && getCheckboxStatus(conditionerInputElement, ad.offer.features);

export const setFilterInputClick = (ads, mapIconsLayer, onFilterChange) => {
  mapFilterElement.addEventListener('change', (evt) => {
    if (evt.target.matches('.map__filter') ||
    evt.target.matches('.map__checkbox')) {
      mapIconsLayer.clearLayers();
      onFilterChange(ads);
    }
  });
};
