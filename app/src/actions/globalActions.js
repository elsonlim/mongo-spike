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

export default {
  updateError,
  updateLoading,
  updateOffline,
}