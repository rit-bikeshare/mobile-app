import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from 'BikeShare/redux/reducers/authReducer';
import permissionReducer from 'BikeShare/redux/reducers/permissionReducer';
import mapReducer from 'BikeShare/redux/reducers/mapReducer';

export default combineReducers({
  permissions: permissionReducer,
  userData: authReducer,
  mapData: mapReducer,
  routing: routerReducer,
});
