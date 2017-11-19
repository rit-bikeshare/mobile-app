import { createSelector } from 'reselect';
import { getIn } from '@hs/transmute';

const getBikeCheckoutRequestStatus = getIn(['requestStatuses', 'bikeCheckoutStatus']);

export const getBikeCheckoutStatus = createSelector(
  getBikeCheckoutRequestStatus,
  bikeCheckoutStatus => bikeCheckoutStatus.status
);

export const getBikeCheckoutError = createSelector(
  getBikeCheckoutRequestStatus,
  bikeCheckoutStatus => bikeCheckoutStatus.message
);
