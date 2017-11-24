import { createAction } from 'redux-actions';

import ActionTypes from 'BikeShare/redux/ActionTypes';
import { hasNotFetchedBikeRacks } from 'BikeShare/selectors/bikeRackSelectors';

const fetchBikeRacksSuccess = createAction(
  ActionTypes.FETCH_BIKE_RACKS_SUCCESS
);

const fetchBikeRacksFailed = createAction(
  ActionTypes.FETCH_BIKE_RACKS_FAILED
);

const fetchBikeRackAction = createAction(
  ActionTypes.FETCH_BIKE_RACKS
);

export function fetchBikeRacks() {
  return (dispatch, getState, api) => {
    dispatch(fetchBikeRackAction());
    api.bikeRack.fetch()
      .then(
        data => dispatch(fetchBikeRacksSuccess(data)),
        error => dispatch(fetchBikeRacksFailed(error))
      )
      .done();
  };
}
export function fetchBikeRacksIfEmpty() {
  return (dispatch, getState) => {
    const hasNotFetched = hasNotFetchedBikeRacks(getState());
    if (hasNotFetched) {
      dispatch(fetchBikeRacks());
    }
  };
}
