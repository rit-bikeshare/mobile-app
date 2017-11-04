import { handleActions } from 'redux-actions';
import ActionTypes from 'BikeShare/redux/ActionTypes';

export default handleActions({
  [ActionTypes.SET_NETWORK_CONNECTION_STATUS](state, action) {
    return action.payload;
  }
});
