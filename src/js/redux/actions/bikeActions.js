import { createAction } from 'redux-actions';

import ActionTypes from 'BikeShare/redux/ActionTypes';

const bikeCheckout = createAction(
  ActionTypes.BIKE_CHECKOUT
);

const checkoutSuccess = createAction(
  ActionTypes.BIKE_CHECKOUT_SUCCESS
);

const checkoutFailed = createAction(
  ActionTypes.BIKE_CHECKOUT_FAILED
);

export function checkoutBike(bikeId) {
  return (dispatch, getState, api) => {
    const { currentBike } = getState();
    if (!currentBike) {
      dispatch(bikeCheckout());
      const fetchResult = api.bike.checkout(bikeId);
      fetchResult.then(
        () => dispatch(checkoutSuccess(bikeId))
      )
      .catch(error => dispatch(checkoutFailed(error)))
      .done();
    } else {
      dispatch(checkoutFailed('You already have a bike checked out.'));
    }
  };
}
