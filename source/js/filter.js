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
const housingTypeOptionElement = mapFilterElement.querySelector('#housing-type');
const priceOptionElement = mapFilterElement.querySelector('#housing-price');
const roomsOptionElement = mapFilterElement.querySelector('#housing-rooms');
const guestsOptionElement = mapFilterElement.querySelector('#housing-guests');
const wifiOptionElement = mapFilterElement.querySelector('#filter-wifi');
const dishwasherOptionElement = mapFilterElement.querySelector('#filter-dishwasher');
const parkingOptionElement = mapFilterElement.querySelector('#filter-parking');
const washerOptionElement = mapFilterElement.querySelector('#filter-washer');
const elevatorOptionElement = mapFilterElement.querySelector('#filter-elevator');
const conditionerOptionElement = mapFilterElement.querySelector('#filter-conditioner');


const checkFilterStatus = (filterInput, adValue) => {
  if (filterInput !== priceOptionElement) {
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
  checkFilterStatus(housingTypeOptionElement, ad.offer.type)
  && checkFilterStatus(priceOptionElement, ad.offer.price)
  && checkFilterStatus(roomsOptionElement, ad.offer.rooms)
  && checkFilterStatus(guestsOptionElement, ad.offer.guests)
  && getCheckboxStatus(wifiOptionElement, ad.offer.features)
  && getCheckboxStatus(dishwasherOptionElement, ad.offer.features)
  && getCheckboxStatus(parkingOptionElement, ad.offer.features)
  && getCheckboxStatus(washerOptionElement, ad.offer.features)
  && getCheckboxStatus(elevatorOptionElement, ad.offer.features)
  && getCheckboxStatus(conditionerOptionElement, ad.offer.features);

export const setFilterInputClick = (onFilterChange) => {
  mapFilterElement.addEventListener('change', (evt) => {
    if (evt.target.matches('.map__filter') ||
    evt.target.matches('.map__checkbox')) {
      onFilterChange();
    }
  });
};

export const resetFilters = () => mapFilterElement.reset();
