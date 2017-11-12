import { handleActions } from 'redux-actions';

import ActionTypes from 'BikeShare/redux/ActionTypes';
import RequestStatus from 'BikeShare/data/records/RequestStatus';
import RequestStatuses from 'BikeShare/data/records/RequestStatuses';
import RequestStatusTypes from 'BikeShare/constants/RequestStatus';

const {
  PENDING,
  SUCCESS,
  FAILED
} = RequestStatusTypes;

export default handleActions({
  [ActionTypes.FETCH_BIKE_RACKS](state) {
    return state.set('bikeRackFetchStatus', new RequestStatus({ status: PENDING }));
  },
  [ActionTypes.FETCH_BIKE_RACKS_SUCCESS](state) {
    const newState = state.set('bikeRackFetchStatus', new RequestStatus({ status: SUCCESS }));
    return newState;
  },
  [ActionTypes.FETCH_BIKE_RACKS_FAILED](state) {
    return state.set('bikeRackFetchStatus', new RequestStatus({ status: FAILED }));
  },
}, new RequestStatuses());
