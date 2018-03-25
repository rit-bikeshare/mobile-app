import { createSelector } from 'reselect';
import { getIn } from '@hs/transmute';

const getBikeCheckInRequestStatus = getIn([
  'requestStatuses',
  'userFetchStatus',
]);

export const getUserFetchStatus = createSelector(
  getBikeCheckInRequestStatus,
  bikeCheckInStatus => bikeCheckInStatus.status
);

export const getUserFetchError = createSelector(
  getBikeCheckInRequestStatus,
  bikeCheckInStatus => bikeCheckInStatus.message
);
