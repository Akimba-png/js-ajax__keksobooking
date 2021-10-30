import L from 'leaflet';
import './../../node_modules/leaflet/dist/leaflet.css';
import { getData } from './api';
import { createAdTemplate } from './template';
import { toggleFormStatus } from './util';

import { showErrorMessage } from './error-message';

import {
  mapFilterElement,
  applyFilter,
  setFilterInputClick
} from './filter';

import {
  adFormElement,
  showAddress
} from './form';


const ZOOM_LEVEL = 9;
const ANCHOR_SIZE_MULTIPLIER = 2;
const MAX_RENT_ICONS_AMOUNT = 10;

const IconSize = {
  MAIN_VALUES: [40, 40],
  RENT_VALUES: [24, 24],
};

const IconUrl = {
  MAIN: './../img/map-icons/main-pin.svg',
  RENT: './../img/map-icons/pin.svg',
};

const cityCenterCoord = {
  lat: 35.681700,
  lng: 139.753891,
};

const map = L.map('map-canvas');
toggleFormStatus(mapFilterElement);
toggleFormStatus(adFormElement);

const getIconsAnchorCoordinates = (iconSizes) => {
  const [coordinateX, coordinateY] = iconSizes;
  return [coordinateX / ANCHOR_SIZE_MULTIPLIER, coordinateY];
};

const mainIcon = L.icon({
  iconUrl: IconUrl.MAIN,
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
  showAddress(ev.target.getLatLng());
});

const rentIcon = L.icon({
  iconUrl: IconUrl.RENT,
  iconSize: IconSize.RENT_VALUES,
  iconAnchor: getIconsAnchorCoordinates(IconSize.RENT_VALUES),
});

const rentIconsLayerGroup = L.layerGroup();
const renderAds = (ads) => {
  ads
    .slice()
    .filter(applyFilter)
    .slice(0, MAX_RENT_ICONS_AMOUNT)
    .forEach((ad) => {
      const { offer } = ad;
      L.marker([offer.location.x, offer.location.y],
        {
          icon: rentIcon,
        }).bindPopup(createAdTemplate(ad)).addTo(rentIconsLayerGroup);
    });
  rentIconsLayerGroup.addTo(map);
};

map.on('load', () => {
  toggleFormStatus(adFormElement);
  showAddress(cityCenterCoord);
  getData(
    (ads) => {
      renderAds(ads);
      toggleFormStatus(mapFilterElement);
      setFilterInputClick(ads, rentIconsLayerGroup, renderAds);
    },
    showErrorMessage,
  );
}).setView(Object.values(cityCenterCoord), ZOOM_LEVEL);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);
