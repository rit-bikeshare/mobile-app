import { createAction } from 'redux-actions';
import { getIn } from '@hs/transmute';
import { DAMAGE_REPORT_UPDATED } from '../constants/MaintenanceActionTypes';

const getDamageReports = getIn(['maintenance', 'damageLookup', 'reports']);

const updateDamageReport = createAction(DAMAGE_REPORT_UPDATED);

export default function ackBikeDamage() {
  return (dispatch, getState, api) => {
    const damageReportsToAck = getDamageReports(getState())
      .filter(report => !report.acknowledged)
      .map(report => report.set('acknowledged', true))
      .toList()
      .toJS();

    const promises = damageReportsToAck.map(report =>
      api.maintenance.updateDamageReport(report)
    );

    Promise.all(promises).then(responses => {
      responses.map(response => {
        if (!response.code) dispatch(updateDamageReport(response));
      });
    });
  };
}
