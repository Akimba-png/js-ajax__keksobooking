const mapFilterElement = document.querySelector('.map__filters');
const adFormElement = document.querySelector('.ad-form');

const togglePageStatus = () => {
  mapFilterElement.classList.toggle('ad-form--disabled');
  Array.from(mapFilterElement.children)
    .forEach((element) => element.disabled = element.disabled === false);
  adFormElement.classList.toggle('ad-form--disabled');
  Array.from(adFormElement.children)
    .forEach((element) => element.disabled = element.disabled === false);
};

togglePageStatus.apply();
