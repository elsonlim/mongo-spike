const defaultState = {
  loading: false,
  error: false,
  offline: false,
};

export default (state = defaultState, action) => {
  switch (action.type) {
      case 'loading':
          return Object.assign({...state}, action.payload);
      case 'error':
          return Object.assign({...state}, action.payload);
      case 'offline':
          return Object.assign({...state}, action.payload);
      default:
          return state;
  }
}