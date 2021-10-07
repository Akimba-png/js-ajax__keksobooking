import L from 'leaflet';
import './../../node_modules/leaflet/dist/leaflet.css';
import { mockAdsData } from './mock';

const tokyoCenterCoord = {
  lat: 35.681700,
  lng: 139.753891,
};


const mapFilterElement = document.querySelector('.map__filters');
const adFormElement = document.querySelector('.ad-form');
const addressInputElement = adFormElement.querySelector('#address');

const togglePageStatus = () => {
  mapFilterElement.classList.toggle('ad-form--disabled');
  Array.from(mapFilterElement.children)
    .forEach((element) => element.disabled = element.disabled === false);
  adFormElement.classList.toggle('ad-form--disabled');
  Array.from(adFormElement.children)
    .forEach((element) => element.disabled = element.disabled === false);
};

togglePageStatus.apply();

const renderLatLng = (coordinate) => {
  const {lat, lng} = coordinate;
  addressInputElement.value = `${lat.toFixed(5)}, ${lng.toFixed(5)}`
}

const map = L.map('map-canvas')
  .on('load', () => {
    togglePageStatus();
    renderLatLng(tokyoCenterCoord);
  })
  .setView([35.681700, 139.753891], 9);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);

const mainIcon = L.icon({
  iconUrl: './../img/map-icons/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker([35.681700, 139.753891],
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
  iconSize: [24, 24],
  iconAnchor: [12, 24],
});

mockAdsData.forEach(({offer}) => {
  L.marker([offer.location.x, offer.location.y],
    {
      icon: rentIcon,
    }).addTo(map);
});
