import { handleActions } from 'redux-actions';

import ActionTypes from 'BikeShare/redux/ActionTypes';

export default handleActions({
  [ActionTypes.BIKE_CHECKOUT_SUCCESS](state, action) {
    return action.payload;
  }
}, null);
