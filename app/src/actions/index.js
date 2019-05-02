export const updateLoading = loading => ({
  type: 'loading',
  payload: {
    loading,
    error: false,
    offline: false,
  }
});

export const updateError = error => ({
  type: 'error',
  payload: {
    error,
    loading: false,
    offline: false,
  }
});

export const updateOffline = offline => ({
  type: 'offline',
  payload: {
    offline,
    loading: false,
    error: false,
  }
});

export const updateLatLng = (lat, lng) => ({
  type: 'latlng',
  payload: {lat, lng}
});

export default {
  updateError,
  updateLoading,
  updateOffline,
  updateLatLng,
}