import { List } from 'immutable';
import { handleActions } from 'redux-actions';
import { FETCH_DAMAGED_BIKES_SUCCESS } from '../constants/MaintenanceActionTypes';
import Bike from '../records/Bike';

export default handleActions(
  {
    [FETCH_DAMAGED_BIKES_SUCCESS](state, action) {
      const data = action.payload.map(bike => new Bike(bike));
      return List(data);
    },
  },
  List()
);
