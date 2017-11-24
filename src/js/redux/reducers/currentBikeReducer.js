import { handleActions, combineActions } from 'redux-actions';

import BikeRental from 'BikeShare/data/records/BikeRental';
import ActionTypes from 'BikeShare/redux/ActionTypes';

export default handleActions({
  [combineActions(
    ActionTypes.BIKE_CHECKOUT_SUCCESS,
    ActionTypes.FETCH_CURRENT_RENTAL_SUCCESS,
    ActionTypes.BIKE_CHECKIN_SUCCESS
  )](state, action) {
    const {
      rentedAt,
      shouldReturnAt,
      returnedAt,
      ...rest
    } = action.payload;
    return new BikeRental({
      returnedAt: returnedAt ? new Date(returnedAt) : null,
      shouldReturnAt: shouldReturnAt ? new Date(shouldReturnAt) : null,
      rentedAt: rentedAt ? new Date(rentedAt) : null,
      ...rest
    });
  }
}, new BikeRental());
