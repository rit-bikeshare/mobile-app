import { createAction } from 'redux-actions';

import { hasNotFetchedCurrentRental } from 'BikeShare/rental/selectors/rentalStatusSelectors';

import {
  FETCH_CURRENT_RENTAL,
  FETCH_CURRENT_RENTAL_SUCCESS,
  FETCH_CURRENT_RENTAL_FAILED,
} from '../constants/RentalActionTypes';

const rentalFetch = createAction(FETCH_CURRENT_RENTAL);

const fetchRentalSuccess = createAction(FETCH_CURRENT_RENTAL_SUCCESS);

const fetchRentalFailed = createAction(FETCH_CURRENT_RENTAL_FAILED);

function fetchCurrentRental() {
  return (dispatch, getState, api) => {
    dispatch(rentalFetch());
    api.bike
      .fetchRentals()
      .then(
        data => dispatch(fetchRentalSuccess(data[0])),
        error => dispatch(fetchRentalFailed(error))
      )
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
