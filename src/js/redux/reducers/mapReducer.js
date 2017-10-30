import { handleActions } from 'redux-actions';

// import ActionTypes from 'BikeShare/redux/ActionTypes';
import MapData from 'BikeShare/data/records/MapData';

const initialState = new MapData();

export default handleActions({}, initialState);
