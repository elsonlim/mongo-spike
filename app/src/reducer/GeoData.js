const defaultState = {
  lat: 1.3521,
  lng: 103.8198,
  markers: [],
  near: [],
  far: [],
  showMarkers: true,
};

export default (state = defaultState, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'latlng':
      return { ...state, ...action.payload };
    case 'markers_FULFILLED':
      return { ...state, markers: action.payload.data };
    case 'saved-places_FULFILLED':
      return { ...state, near: [ ...state.near, action.payload.data ] };
    case 'nearby_FULFILLED':
    return { ...state, ...action.payload.data };
    case 'toggle-markers':
      return { ...state, ...action.payload };
    default:
      return state;
  }
}
