import axios from 'axios';

export const updateLatLng = (lat, lng) => ({
  type: 'latlng',
  payload: { lat, lng }
});

export const getNearbyPlace = (lat, lng) => {
  return {
    type: "nearby",
    payload: axios.get(`/api/place/near?lat=${lat}&lng=${lng}`)
  }
};

export const getSavedPlaces = (lat, lng) => {
  return {
    type: "markers",
    payload: axios.get(`/api/place`)
  }
};


export const savePlace = (name, description, lat, lng) => ({
  type: "saved-places",
  payload:
    axios.post(`/api/place`, {name, description, lng, lat})
});

export const toggleMarkers = (showMarkers) => ({
  type: "toggle-markers",
  payload: { showMarkers }
});

export default {
  updateLatLng,
  savePlace,
  getSavedPlaces,
  toggleMarkers,
  getNearbyPlace,
};