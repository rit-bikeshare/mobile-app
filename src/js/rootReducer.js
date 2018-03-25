import { combineReducers } from 'redux';

import permissionReducer from 'BikeShare/permissions/reducers/permissionReducer';
import authReducer from 'BikeShare/auth/reducers/authReducer';
import requestStatusReducer from 'BikeShare/api/reducers/requestStatusReducer';
import { routerReducer } from 'react-router-redux';
import networkConnectionReducer from 'BikeShare/api/reducers/networkConnectionReducer';
import bikeRackReducer from 'BikeShare/bike-rack/reducers/bikeRackReducer';
import rentalReducer from 'BikeShare/rental/reducers/rentalReducer';
import settingsReducer from 'BikeShare/settings/reducers/settingsReducer';

export default combineReducers({
  permissions: permissionReducer,
  userData: authReducer,
  requestStatuses: requestStatusReducer,
  routing: routerReducer,
  networkConnectionStatus: networkConnectionReducer,
  bikeRacks: bikeRackReducer,
  currentRental: rentalReducer,
  settings: settingsReducer,
});
