import { Record } from 'immutable';
import RequestStatusTypes from '../constants/RequestStatus';

const { UNINITIALIZED } = RequestStatusTypes;

export default new Record({
  status: UNINITIALIZED,
  code: null,
  message: null,
});
