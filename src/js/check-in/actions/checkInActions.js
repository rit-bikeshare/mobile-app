import { createAction } from 'redux-actions';
import { Permissions, Location } from 'expo';
import { lengthToRadians, point } from '@turf/helpers';
import circle from '@turf/circle';
import booleanOverlap from '@turf/boolean-overlap';
import booleanContains from '@turf/boolean-contains';

import { fetchBikeRacks } from 'BikeShare/bike-rack/actions/bikeRackActions';
import disconnectFromSocket from 'BikeShare/lock/actions/disconnectFromSocket';
import { updateLocationPermission } from 'BikeShare/permissions/actions/permissionActions';
import { PENDING } from 'BikeShare/permissions/constants/PermissionValues';
import { RENTAL_EXPIRATION_NOTIFICATION } from 'BikeShare/notifications/constants/notificationTypes';
import clearNotification from 'BikeShare/notifications/actions/clearNotification';
import {
  BIKE_CHECKIN,
  BIKE_CHECKIN_SUCCESS,
  BIKE_CHECKIN_FAILED,
  CLEAR_BIKE_CHECKIN_STATUS,
} from '../constants/CheckInActionTypes';

const bikeCheckin = createAction(BIKE_CHECKIN);

const checkInSuccessAction = createAction(BIKE_CHECKIN_SUCCESS);

function checkInSuccess(data) {
  return dispatch => {
    dispatch(clearNotification(RENTAL_EXPIRATION_NOTIFICATION));
    dispatch(checkInSuccessAction(data));
    dispatch(disconnectFromSocket());
    dispatch(fetchBikeRacks());
  };
}

const checkInFailed = createAction(BIKE_CHECKIN_FAILED);

export const clearCheckInStatus = createAction(CLEAR_BIKE_CHECKIN_STATUS);

function getLocationAsync(dispatch) {
  dispatch(updateLocationPermission(PENDING));
  return Permissions.askAsync(Permissions.LOCATION).then(({ status }) => {
    dispatch(updateLocationPermission(status));
    if (status === 'granted') {
      return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
    }
    throw new Error('Location permission not granted');
  });
}

function getBikeRackByLocation(bikeRacks, { latitude, longitude, accuracy }) {
  const radiusInRadians = lengthToRadians(accuracy, 'meters');
  const locationArea = circle(point([longitude, latitude]), radiusInRadians, {
    units: 'radians',
  });
  return bikeRacks.find(({ checkInArea }) => {
    return (
      booleanOverlap(checkInArea, locationArea) ||
      booleanContains(checkInArea, locationArea)
    );
  });
}

export function checkInCurrentRentalByLocation() {
  return (dispatch, getState, api) => {
    const { currentRental, bikeRacks } = getState();
    dispatch(bikeCheckin());
    getLocationAsync(dispatch).then(({ coords }) => {
      const bikeRack = getBikeRackByLocation(bikeRacks, coords);
      if (!bikeRack) {
        dispatch(
          checkInFailed({
            message: 'No bike rack at current location.',
          })
        );
      } else {
        api.bike
          .checkIn(currentRental.bike, bikeRack.id)
          .then(
            data => dispatch(checkInSuccess(data)),
            error => dispatch(checkInFailed(error))
          )
          .done();
      }
    });
  };
}

export function checkInCurrentRentalByBikeRack(bikeRack) {
  return (dispatch, getState, api) => {
    const { currentRental } = getState();
    dispatch(bikeCheckin());
    api.bike
      .checkIn(currentRental.bike, bikeRack)
      .then(
        data => dispatch(checkInSuccess(data)),
        error => dispatch(checkInFailed(error))
      )
      .done();
  };
}
