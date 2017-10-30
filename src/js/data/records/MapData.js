import { Record, Map } from 'immutable';
import MapMarker from './MapMarker';

export default new Record({
  markers: Map({
    1: new MapMarker({
      id: '1',
      latitude: 43.08447438334887,
      longitude: -77.67920080572367,
    }),
    2: new MapMarker({
      id: '2',
      latitude: 43.08457438334887,
      longitude: -77.67920080572367,
    }),
  }),
});
