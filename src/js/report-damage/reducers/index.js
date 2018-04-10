import { combineReducers } from 'redux';

import DamageNetworkStatus from './DamageNetworkStatus';
import DamageTypes from './DamageTypes';

export default combineReducers({
  status: DamageNetworkStatus,
  types: DamageTypes,
});
