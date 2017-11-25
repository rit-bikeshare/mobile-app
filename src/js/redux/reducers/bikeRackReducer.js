import { Map } from 'immutable';
import { handleActions } from 'redux-actions';
import { polygon } from '@turf/helpers';

import ActionTypes from 'BikeShare/redux/ActionTypes';
import BikeRack from 'BikeShare/data/records/BikeRack';

export default handleActions({
  [ActionTypes.FETCH_BIKE_RACKS_SUCCESS](state, action) {
    return action.payload.reduce((accumulator, bikeRack) => {
      const {
        checkInArea,
        ...rest
      } = bikeRack;
      const polygonArea = polygon(checkInArea.coordinates);
      return accumulator.set(bikeRack.id, new BikeRack({
        checkInArea: polygonArea,
        ...rest
      }));
    }, new Map());
  }
}, new Map());
