import { handleActions } from 'redux-actions';

import ActionTypes from 'BikeShare/ActionTypes';
import RequestStatus from '../records/RequestStatus';
import RequestStatuses from '../records/RequestStatuses';
import RequestStatusTypes from '../constants/RequestStatus';

import {
  USER_FETCH,
  USER_FETCH_SUCCESS,
  USER_FETCH_FAILED,
} from 'BikeShare/auth/constants/AuthActionTypes';

const { PENDING, SUCCESS, FAILED, UNINITIALIZED } = RequestStatusTypes;

export default handleActions(
  {
    [ActionTypes.FETCH_BIKE_RACKS](state) {
      return state.set(
        'bikeRackFetchStatus',
        new RequestStatus({ status: PENDING })
      );
    },
    [ActionTypes.FETCH_BIKE_RACKS_SUCCESS](state) {
      const newState = state.set(
        'bikeRackFetchStatus',
        new RequestStatus({ status: SUCCESS })
      );
      return newState;
    },
    [ActionTypes.FETCH_BIKE_RACKS_FAILED](state, action) {
      return state.set(
        'bikeRackFetchStatus',
        new RequestStatus({ status: FAILED, ...action.payload })
      );
    },

    [ActionTypes.BIKE_CHECKOUT](state) {
      return state.set(
        'bikeCheckoutStatus',
        new RequestStatus({ status: PENDING })
      );
    },
    [ActionTypes.BIKE_CHECKOUT_SUCCESS](state) {
      return state
        .set('bikeCheckoutStatus', new RequestStatus({ status: SUCCESS }))
        .set('bikeCheckinStatus', new RequestStatus({ status: UNINITIALIZED }));
    },
    [ActionTypes.BIKE_CHECKOUT_FAILED](state, action) {
      return state.set(
        'bikeCheckoutStatus',
        new RequestStatus({ status: FAILED, ...action.payload })
      );
    },
    [ActionTypes.CLEAR_BIKE_CHECKOUT_STATUS](state) {
      return state.set(
        'bikeCheckoutStatus',
        new RequestStatus({ status: UNINITIALIZED })
      );
    },

    [ActionTypes.BIKE_CHECKIN](state) {
      return state.set(
        'bikeCheckinStatus',
        new RequestStatus({ status: PENDING })
      );
    },
    [ActionTypes.BIKE_CHECKIN_SUCCESS](state) {
      return state
        .set('bikeCheckinStatus', new RequestStatus({ status: SUCCESS }))
        .set(
          'bikeCheckoutStatus',
          new RequestStatus({ status: UNINITIALIZED })
        );
    },
    [ActionTypes.BIKE_CHECKIN_FAILED](state, action) {
      return state.set(
        'bikeCheckinStatus',
        new RequestStatus({ status: FAILED, ...action.payload })
      );
    },
    [ActionTypes.CLEAR_BIKE_CHECKIN_STATUS](state) {
      return state.set(
        'bikeCheckinStatus',
        new RequestStatus({ status: UNINITIALIZED })
      );
    },

    [ActionTypes.FETCH_CURRENT_RENTAL](state) {
      return state.set(
        'currentRentalFetchStatus',
        new RequestStatus({ status: PENDING })
      );
    },
    [ActionTypes.FETCH_CURRENT_RENTAL_SUCCESS](state) {
      return state.set(
        'currentRentalFetchStatus',
        new RequestStatus({ status: SUCCESS })
      );
    },
    [ActionTypes.FETCH_CURRENT_RENTAL_FAILED](state, action) {
      return state.set(
        'currentRentalFetchStatus',
        new RequestStatus({ status: FAILED, ...action.payload })
      );
    },

    [USER_FETCH](state) {
      return state.set(
        'userFetchStatus',
        new RequestStatus({ status: PENDING })
      );
    },
    [USER_FETCH_SUCCESS](state) {
      return state.set(
        'userFetchStatus',
        new RequestStatus({ status: SUCCESS })
      );
    },
    [USER_FETCH_FAILED](state, action) {
      return state.set(
        'userFetchStatus',
        new RequestStatus({ status: FAILED, ...action.payload })
      );
    },
  },
  new RequestStatuses()
);
