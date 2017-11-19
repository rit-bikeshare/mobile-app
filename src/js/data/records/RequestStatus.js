import { Record } from 'immutable';
import RequestStatusTypes from 'BikeShare/constants/RequestStatus';

const { UNINITIALIZED } = RequestStatusTypes;

export default new Record({
  status: UNINITIALIZED,
  code: null,
  message: null
});
