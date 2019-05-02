const defaultState = {
  lat: 1.3521,
  lng: 103.8198,
  markers: [],
}

export default (state = defaultState, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'latlng':
      return { ...state, ...action.payload };
    case 'markers_FULFILLED':
      return { ...state, markers: action.payload.data };
    default:
      return state;
  }
}