import { combineReducers } from 'redux';

import damageLookup from './damageLookup';

export default combineReducers({
  damageLookup: damageLookup,
});
