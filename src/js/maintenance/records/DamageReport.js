import { Record } from 'immutable';

export default Record(
  {
    reporter: null,
    bike: null,
    reportedAt: null,
    acknowledged: false,
    damageType: null,
    resolvedBy: null,
    comments: null,
    id: null,
    critical: false,
  },
  'DamageReport'
);
