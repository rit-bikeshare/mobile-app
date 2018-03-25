import { createSelector } from 'reselect';
import { getIn } from '@hs/transmute';

const getBikeCheckOutRequestStatus = getIn([
  'requestStatuses',
  'bikeCheckoutStatus',
]);

export const getCheckOutStatus = createSelector(
  getBikeCheckOutRequestStatus,
  bikeCheckOutStatus => bikeCheckOutStatus.status
);

export const getCheckOutError = createSelector(
  getBikeCheckOutRequestStatus,
  bikeCheckOutStatus => bikeCheckOutStatus.message
);
