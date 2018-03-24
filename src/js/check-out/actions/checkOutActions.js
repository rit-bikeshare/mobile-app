import { createAction } from 'redux-actions';

import { fetchBikeRacks } from 'BikeShare/bike-rack/actions/bikeRackActions';

import {
  BIKE_CHECKOUT,
  BIKE_CHECKOUT_SUCCESS,
  BIKE_CHECKOUT_FAILED,
  CLEAR_BIKE_CHECKOUT_STATUS,
} from '../constants/CheckOutActionTypes';

const bikeCheckout = createAction(BIKE_CHECKOUT);

const checkoutSuccessAction = createAction(BIKE_CHECKOUT_SUCCESS);

const checkoutFailed = createAction(BIKE_CHECKOUT_FAILED);

export const clearCheckoutStatus = createAction(CLEAR_BIKE_CHECKOUT_STATUS);

function checkoutSuccess(data) {
  return dispatch => {
    dispatch(checkoutSuccessAction(data));
    dispatch(fetchBikeRacks());
  };
}

export function checkoutBike(bikeId) {
  return (dispatch, getState, api) => {
    dispatch(bikeCheckout());
    api.bike
      .checkout(bikeId)
      .then(
        data => dispatch(checkoutSuccess(data)),
        error => dispatch(checkoutFailed(error))
      )
      .done();
  };
}
