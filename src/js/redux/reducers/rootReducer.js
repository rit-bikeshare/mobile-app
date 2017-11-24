import { combineReducers } from 'redux';

import permissionReducer from 'BikeShare/redux/reducers/permissionReducer';
import authReducer from 'BikeShare/redux/reducers/authReducer';
import requestStatusReducer from 'BikeShare/redux/reducers/requestStatusReducer';
import { routerReducer } from 'react-router-redux';
import networkConnectionReducer from 'BikeShare/redux/reducers/networkConnectionReducer';
import bikeRackReducer from 'BikeShare/redux/reducers/bikeRackReducer';
import currentBikeReducer from 'BikeShare/redux/reducers/currentBikeReducer';
import settingsReducer from 'BikeShare/redux/reducers/settingsReducer';

export default combineReducers({
  permissions: permissionReducer,
  userData: authReducer,
  requestStatuses: requestStatusReducer,
  routing: routerReducer,
  networkConnectionStatus: networkConnectionReducer,
  bikeRacks: bikeRackReducer,
  currentBike: currentBikeReducer,
  settings: settingsReducer
});
