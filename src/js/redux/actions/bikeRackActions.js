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

export function fetchBikeRacksIfEmpty() {
  return (dispatch, getState, api) => {
    const hasNotFetched = hasNotFetchedBikeRacks(getState());
    if (hasNotFetched) {
      dispatch(fetchBikeRackAction());
      api.bikeRack.fetch().then(
        data => dispatch(fetchBikeRacksSuccess(data))
      ).catch(error => dispatch(fetchBikeRacksFailed(error)));
    }
  };
}
