import { createAction } from 'redux-actions';

import { hasNotFetchedCurrentRental } from 'BikeShare/selectors/bikeSelectors';

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

const rentalFetch = createAction(
  ActionTypes.FETCH_CURRENT_RENTAL
);

const fetchRentalSuccess = createAction(
  ActionTypes.FETCH_CURRENT_RENTAL_SUCCESS
);

const fetchRentalFailed = createAction(
  ActionTypes.FETCH_CURRENT_RENTAL_FAILED
);

function fetchCurrentRental() {
  return (dispatch, getState, api) => {
    dispatch(rentalFetch());
    api.bike.fetchRentals()
      .then(data => dispatch(fetchRentalSuccess(data[0])))
      .catch(error => dispatch(fetchRentalFailed(error)))
      .done();
  };
}

export function fetchCurrentRentalIfNotAlready() {
  return (dispatch, getState) => {
    const hasNotFetched = hasNotFetchedCurrentRental(getState());
    if (hasNotFetched) {
      dispatch(fetchCurrentRental());
    }
  };
}

export function checkoutBike(bikeId) {
  return (dispatch, getState, api) => {
    dispatch(bikeCheckout());
    api.bike.checkout(bikeId)
      .then(data => dispatch(checkoutSuccess(data)))
      .catch(error => dispatch(checkoutFailed(error)))
      .done();
  };
}

export function lockBike() {
  return () => {
    console.log('lock da bike');
  };
}
