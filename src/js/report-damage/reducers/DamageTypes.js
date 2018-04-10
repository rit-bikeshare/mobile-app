import { Map, List } from 'immutable';
import { handleActions } from 'redux-actions';

import DamageType from '../records/DamageType';
import { FETCH_DAMAGE_TYPES_SUCCESS } from '../constants/DamageActionTypes';

export default handleActions(
  {
    [FETCH_DAMAGE_TYPES_SUCCESS](state, { payload }) {
      return List(payload).reduce((accumulator, damageType) => {
        return accumulator.set(damageType.id, new DamageType(damageType));
      }, Map());
    },
  },
  Map()
);
