import L from 'leaflet';
import './../../node_modules/leaflet/dist/leaflet.css';
import { createAdTemplate } from './template';
import { mockAdsData } from './mock';

const ZOOM_LEVEL = 9;
const COORDINATE_ACCURACY = 5;
const ANCHOR_SIZE_MULTIPLIER = 2;
const cityCenterCoord = {
  lat: 35.681700,
  lng: 139.753891,
};

const IconSize = {
  MAIN_VALUES: [40, 40],
  RENT_VALUES: [24, 24],
};

const mapFilterElement = document.querySelector('.map__filters');
const adFormElement = document.querySelector('.ad-form');
const addressInputElement = adFormElement.querySelector('#address');


const getIconsAnchorCoordinates = (iconSizes) => {
  const [coordinateX, coordinateY] = iconSizes;
  return [coordinateX / ANCHOR_SIZE_MULTIPLIER, coordinateY];
};

const toggleFilterStatus = () => {
  mapFilterElement.classList.toggle('ad-form--disabled');
  Array.from(mapFilterElement.children)
    .forEach((element) => element.disabled = element.disabled === false);
};

const toggleFormStatus = () => {
  adFormElement.classList.toggle('ad-form--disabled');
  Array.from(adFormElement.children)
    .forEach((element) => element.disabled = element.disabled === false);
};

toggleFormStatus();
toggleFilterStatus();


const renderLatLng = (coordinate) => {
  const {lat, lng} = coordinate;
  addressInputElement.value = `${(lat).toFixed(COORDINATE_ACCURACY)},
  ${lng.toFixed(COORDINATE_ACCURACY)}`;
};

const map = L.map('map-canvas')
  .on('load', () => {
    toggleFormStatus();
    toggleFilterStatus();
    renderLatLng(cityCenterCoord);
  })
  .setView(Object.values(cityCenterCoord), ZOOM_LEVEL);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

const mainIcon = L.icon({
  iconUrl: './../img/map-icons/main-pin.svg',
  iconSize: IconSize.MAIN_VALUES,
  iconAnchor: getIconsAnchorCoordinates(IconSize.MAIN_VALUES),
});

const mainMarker = L.marker(Object.values(cityCenterCoord),
  {
    icon: mainIcon,
    draggable: true,
  });
mainMarker.addTo(map);

mainMarker.on('moveend', (ev) => {
  renderLatLng(ev.target.getLatLng());
});


const rentIcon = L.icon({
  iconUrl: './../img/map-icons/pin.svg',
  iconSize: IconSize.RENT_VALUES,
  iconAnchor: getIconsAnchorCoordinates(IconSize.RENT_VALUES),
});

mockAdsData.forEach((adData) => {
  const { offer } = adData;
  L.marker([offer.location.x, offer.location.y],
    {
      icon: rentIcon,
    }).bindPopup(createAdTemplate(adData)).addTo(map);
});
