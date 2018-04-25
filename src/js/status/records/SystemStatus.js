import { Record } from 'immutable';

export default Record(
  {
    ALLOW_CHECKOUT: true,
    CHECKOUT_DISALLOWED_MESSAGE: null,
    MAINTENANCE_MESSAGE: null,
    ENABLE_DROP_ANYWHERE: false,
    MAINTENANCE_MODE: false,
  },
  'SystemStatus'
);
