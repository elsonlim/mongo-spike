const defaultState = {
  lat: 1.3521,
  lng: 103.8198,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'latlng':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}