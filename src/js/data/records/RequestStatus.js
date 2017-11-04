import { Record } from 'immutable';
import { UNINITIALIZED } from 'BikeShare/constants/RequestStatus';

export default new Record({
  status: UNINITIALIZED,
  code: null,
  message: null
});
