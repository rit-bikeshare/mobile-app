import { createAction } from 'redux-actions';
import { STATUS_FETCH_SUCCESS } from '../constants/StatusActionTypes';
import Toast from 'BikeShare/lib/Toast';

const statusFetchSuccess = createAction(STATUS_FETCH_SUCCESS);

export default function fetchSystemStatus() {
  return (dispatch, getState, api) => {
    api.status
      .fetch()
      .then(
        response => dispatch(statusFetchSuccess(response)),
        () => Toast.show('Error fetching system status')
      );
  };
}
