import { getIn } from '@hs/transmute';
import { createSelector } from 'reselect';

const getAllowCheckout = getIn(['systemStatus', 'ALLOW_CHECKOUT']);
const getMaintenanceMode = getIn(['systemStatus', 'MAINTENANCE_MODE']);

export default createSelector(
  [getAllowCheckout, getMaintenanceMode],
  (allowCheckOut, maintenanceMode) => allowCheckOut && !maintenanceMode
);
