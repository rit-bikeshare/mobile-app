import { combineReducers } from 'redux';

import damageLookup from './damageLookup';
import damagedBikes from './damagedBikes';

export default combineReducers({
  damageLookup,
  damagedBikes,
});
