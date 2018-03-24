import { createAction } from 'redux-actions';
import { Permissions } from 'expo';

import permissionSelectors from '../selectors/permissionSelectors';
import { PENDING } from '../constants/PermissionValues';
import {
  SET_CAMERA_PERMISSION,
  SET_LOCATION_PERMISSION,
} from '../constants/PermissionActionTypes';

const {
  cameraPermissionGranted,
  locationPermissionGranted,
} = permissionSelectors;

const updateCameraPermission = createAction(SET_CAMERA_PERMISSION);

export const updateLocationPermission = createAction(SET_LOCATION_PERMISSION);

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

export function askForLocationPermission() {
  return async (dispatch, getState) => {
    const hasPermission = locationPermissionGranted(getState());
    if (!hasPermission) {
      dispatch(updateLocationPermission(PENDING));
      const { status: result } = await Permissions.askAsync(
        Permissions.LOCATION
      );
      dispatch(updateLocationPermission(result));
    }
  };
}
