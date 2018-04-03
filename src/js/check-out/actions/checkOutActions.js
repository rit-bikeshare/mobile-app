import { createAction } from 'redux-actions';

import { fetchBikeRacks } from 'BikeShare/bike-rack/actions/bikeRackActions';

import {
  BIKE_CHECKOUT,
  BIKE_CHECKOUT_SUCCESS,
  BIKE_CHECKOUT_FAILED,
  CLEAR_BIKE_CHECKOUT_STATUS,
} from '../constants/CheckOutActionTypes';

const bikeCheckOut = createAction(BIKE_CHECKOUT);

const checkOutSuccessAction = createAction(BIKE_CHECKOUT_SUCCESS);

const checkOutFailed = createAction(BIKE_CHECKOUT_FAILED);

export const clearCheckOutStatus = createAction(CLEAR_BIKE_CHECKOUT_STATUS);

function checkOutSuccess(data) {
  return dispatch => {
    dispatch(checkOutSuccessAction(data));
    dispatch(fetchBikeRacks());
  };
}

export function checkOutBike(bikeId) {
  return (dispatch, getState, api) => {
    dispatch(bikeCheckOut());
    api.bike
      .checkOut(bikeId)
      .then(
        data => dispatch(checkOutSuccess(data)),
        error => dispatch(checkOutFailed(error))
      )
      .done();
  };
}
