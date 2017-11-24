import { createSelector } from 'reselect';
import { getIn } from '@hs/transmute';

import RequestStatusTypes from 'BikeShare/constants/RequestStatus';

const { UNINITIALIZED } = RequestStatusTypes;
const getCurrentRentalFetchStatus = getIn(['requestStatuses', 'currentRentalFetchStatus']);
const getBikeCheckoutRequestStatus = getIn(['requestStatuses', 'bikeCheckoutStatus']);
const getBikeCheckinRequestStatus = getIn(['requestStatuses', 'bikeCheckinStatus']);

export const getBikeCheckinStatus = createSelector(
  getBikeCheckinRequestStatus,
  bikeCheckinStatus => bikeCheckinStatus.status
);

export const getBikeCheckinError = createSelector(
  getBikeCheckinRequestStatus,
  bikeCheckinStatus => bikeCheckinStatus.message
);

export const getBikeCheckoutStatus = createSelector(
  getBikeCheckoutRequestStatus,
  bikeCheckoutStatus => bikeCheckoutStatus.status
);

export const getBikeCheckoutError = createSelector(
  getBikeCheckoutRequestStatus,
  bikeCheckoutStatus => bikeCheckoutStatus.message
);

export const hasNotFetchedCurrentRental = createSelector(
  getCurrentRentalFetchStatus,
  currentRentalFetchStatus => currentRentalFetchStatus.status === UNINITIALIZED
);
