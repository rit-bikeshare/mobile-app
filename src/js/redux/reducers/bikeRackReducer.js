import { Map } from 'immutable';
import { handleActions } from 'redux-actions';

import ActionTypes from 'BikeShare/redux/ActionTypes';
import BikeRack from 'BikeShare/data/records/BikeRack';

export default handleActions({
  [ActionTypes.FETCH_BIKE_RACKS_SUCCESS](state, action) {
    return action.payload.reduce((accumulator, bikeRack) => {
      return accumulator.set(bikeRack.id, new BikeRack(bikeRack));
    }, new Map());
  }
}, new Map());
