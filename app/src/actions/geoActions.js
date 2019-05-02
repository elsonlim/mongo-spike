import axios from 'axios';

export const updateLatLng = (lat, lng) => ({
  type: 'latlng',
  payload: { lat, lng }
});

export const getSavedPlaces = () => {
  console.log("here");
  return {
    type: "markers",
    payload: axios.get(`/api/place`)
  }
}

export const savePlace = (name, description, lat, lng) => ({
  type: "saved-places",
  payload:
    axios.post(`/api/place`,{ name, description, lng, lat})
})

export default {
  updateLatLng,
  savePlace,
  getSavedPlaces,
}