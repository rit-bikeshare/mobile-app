import { createAction } from 'redux-actions';
import { Permissions } from 'expo';

import permissionSelectors from 'BikeShare/selectors/permissionSelectors';
import ActionTypes from 'BikeShare/redux/ActionTypes';
import { PENDING } from 'BikeShare/constants/PermissionValues';

const {
  cameraPermissionGranted
} = permissionSelectors;

const updateCameraPermission = createAction(
  ActionTypes.SET_CAMERA_PERMISSION
);

/*
 * asks for permission for camera use if the permission is not already granted.
 */
export function askForCameraPermission() {
  return async (dispatch, getState) => {
    const hasPermission = cameraPermissionGranted(getState());
    if (!hasPermission) {
      dispatch(updateCameraPermission(PENDING));
      const { status: result } = await Permissions.askAsync(Permissions.CAMERA);
      dispatch(updateCameraPermission(result));
    }
  };
}
