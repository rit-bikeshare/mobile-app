import { getIn } from '@hs/transmute';
import { createSelector } from 'reselect';

const getCurrentRentalExpiration = getIn([
  'currentRental',
  'shouldBeReturnedAt',
]);
export default createSelector(getCurrentRentalExpiration, returnTime =>
  new Date(returnTime).getTime()
);
