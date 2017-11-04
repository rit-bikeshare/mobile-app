import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import authReducer from 'BikeShare/redux/reducers/authReducer';
import permissionReducer from 'BikeShare/redux/reducers/permissionReducer';
import requestStatusReducer from 'BikeShare/redux/reducers/requestStatusReducer';
import bikeRackReducer from 'BikeShare/redux/reducers/bikeRackReducer';

export default combineReducers({
  permissions: permissionReducer,
  userData: authReducer,
  requestStatuses: requestStatusReducer,
  routing: routerReducer,
  bikeRacks: bikeRackReducer
});
