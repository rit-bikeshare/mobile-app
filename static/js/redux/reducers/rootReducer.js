import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import authReducer from 'BikeShare/redux/reducers/authReducer';
import permissionReducer from 'BikeShare/redux/reducers/permissionReducer';

export default combineReducers({
  permissions: permissionReducer,
  userData: authReducer,
  routing: routerReducer
});
