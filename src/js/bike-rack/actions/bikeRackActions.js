import { createAction } from 'redux-actions';

import {
  FETCH_BIKE_RACKS_SUCCESS,
  FETCH_BIKE_RACKS_FAILED,
  FETCH_BIKE_RACKS,
} from '../constants/BikeRackActionTypes';

const fetchBikeRacksSuccess = createAction(FETCH_BIKE_RACKS_SUCCESS);

const fetchBikeRacksFailed = createAction(FETCH_BIKE_RACKS_FAILED);

const fetchBikeRackAction = createAction(FETCH_BIKE_RACKS);

export function fetchBikeRacks() {
  return (dispatch, getState, api) => {
    dispatch(fetchBikeRackAction());
    api.bikeRack
      .fetch()
      .then(
        data => dispatch(fetchBikeRacksSuccess(data)),
        error => dispatch(fetchBikeRacksFailed(error))
      )
      .done();
  };
}
