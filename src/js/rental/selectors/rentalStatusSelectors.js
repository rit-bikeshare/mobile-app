import { createSelector } from 'reselect';
import { getIn } from '@hs/transmute';

import RequestStatusTypes from 'BikeShare/api/constants/RequestStatus';

const { UNINITIALIZED } = RequestStatusTypes;
const getCurrentRentalFetchStatus = getIn([
  'requestStatuses',
  'currentRentalFetchStatus',
]);

export const hasNotFetchedCurrentRental = createSelector(
  getCurrentRentalFetchStatus,
  currentRentalFetchStatus => currentRentalFetchStatus.status === UNINITIALIZED
);
