import { handleActions, combineActions } from 'redux-actions';

import { BIKE_CHECKIN_SUCCESS } from 'BikeShare/check-in/constants/CheckInActionTypes';
import { BIKE_CHECKOUT_SUCCESS } from 'BikeShare/check-out/constants/CheckOutActionTypes';

import { FETCH_CURRENT_RENTAL_SUCCESS } from '../constants/RentalActionTypes';
import BikeRental from '../records/BikeRental';

export default handleActions(
  {
    [combineActions(
      BIKE_CHECKOUT_SUCCESS,
      FETCH_CURRENT_RENTAL_SUCCESS,
      BIKE_CHECKIN_SUCCESS
    )](state, action) {
      if (!action.payload) {
        return new BikeRental();
      }

      const { rentedAt, shouldReturnAt, returnedAt, ...rest } = action.payload;
      return new BikeRental({
        returnedAt: returnedAt ? new Date(returnedAt) : null,
        shouldReturnAt: shouldReturnAt ? new Date(shouldReturnAt) : null,
        rentedAt: rentedAt ? new Date(rentedAt) : null,
        ...rest,
      });
    },
  },
  new BikeRental()
);
