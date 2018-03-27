import { createSelector } from 'reselect';
import { getIn } from '@hs/transmute';

const getBikeCheckInRequestStatus = getIn([
  'requestStatuses',
  'bikeCheckinStatus',
]);

export const getCheckInStatus = createSelector(
  getBikeCheckInRequestStatus,
  bikeCheckInStatus => bikeCheckInStatus.status
);

export const getCheckInError = createSelector(
  getBikeCheckInRequestStatus,
  bikeCheckInStatus => bikeCheckInStatus.message
);
