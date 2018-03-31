import { createSelector } from 'reselect';
import { getIn } from '@hs/transmute';

const getUserFetchRequestStatus = getIn(['requestStatuses', 'userFetchStatus']);

export const getUserFetchStatus = createSelector(
  getUserFetchRequestStatus,
  userFetchStatus => userFetchStatus.status
);

export const getUserFetchError = createSelector(
  getUserFetchRequestStatus,
  userFetchStatus => userFetchStatus.message
);
