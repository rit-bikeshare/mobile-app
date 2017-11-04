import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from 'BikeShare/redux/reducers/authReducer';
import permissionReducer from 'BikeShare/redux/reducers/permissionReducer';
import mapReducer from 'BikeShare/redux/reducers/mapReducer';
import networkConnectionReducer from 'BikeShare/redux/reducers/networkConnectionReducer';

export default combineReducers({
  permissions: permissionReducer,
  userData: authReducer,
  mapData: mapReducer,
  routing: routerReducer,
  networkConnectionStatus: networkConnectionReducer
});
