import { Record } from 'immutable';
import RequestStatus from 'BikeShare/data/records/RequestStatus';

export default new Record({
  bikeRackFetchStatus: new RequestStatus()
});
