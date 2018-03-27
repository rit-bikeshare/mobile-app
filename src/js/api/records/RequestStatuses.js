import { Record } from 'immutable';

import RequestStatus from './RequestStatus';

export default new Record({
  bikeRackFetchStatus: new RequestStatus(),
  bikeCheckoutStatus: new RequestStatus(),
  currentRentalFetchStatus: new RequestStatus(),
  bikeCheckinStatus: new RequestStatus(),
});
