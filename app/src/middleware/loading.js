import Actions from "../actions";
// PENDING FULFILLED REJECTED
export default ({getState, dispatch}) => next => action => {
    const isLoading = getState().global.loading;

    if (action && action.payload && action.payload.then && !isLoading) {
        console.log("loading");
        dispatch(Actions.updateLoading(true));
    } else if (action && action.type.includes('_FULFILLED')) {
        console.log("stop loading");
        dispatch(Actions.updateLoading(false));
    }
    next(action);
};
