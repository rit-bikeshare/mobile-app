import { handleActions } from 'redux-actions';
import { Map } from 'immutable';

// import ActionTypes from 'BikeShare/redux/ActionTypes';
import MapData from 'BikeShare/data/records/MapData';
import MapMarker from 'BikeShare/data/records/MapMarker';

const initialState = new MapData({
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

export default handleActions({}, initialState);
