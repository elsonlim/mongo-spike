import Actions from "../actions";

/*
promise reject
  response exist
    error
  else 
    offline
promise fulfilled
  remove error
*/
export default ({getState, dispatch}) => next => action => {
    const type = action.type;
    if (!action || !type) {
        next(action);
    }

    const {error, offline} = getState().global;
    const hasError = error || offline;
    if (type.includes('_REJECTED')) {
        console.log("error, rejected");
        if (typeof action.payload.response === "object") {
            dispatch(Actions.updateError(true));
        } else {
            dispatch(Actions.updateOffline(true));
        }
    } else if (hasError && type.includes('_FULFILLED')) {
        console.log("remove error");
        dispatch(Actions.updateError(false));
    }

    next(action);
};
