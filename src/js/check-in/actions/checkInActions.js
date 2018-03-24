import { createAction } from 'redux-actions';
import { Permissions, Location } from 'expo';
import * as turf from '@turf/turf';

import { fetchBikeRacks } from 'BikeShare/bike-rack/actions/bikeRackActions';
import { updateLocationPermission } from 'BikeShare/permissions/actions/permissionActions';
import { PENDING } from 'BikeShare/permissions/constants/PermissionValues';

import {
  BIKE_CHECKIN,
  BIKE_CHECKIN_SUCCESS,
  BIKE_CHECKIN_FAILED,
  CLEAR_BIKE_CHECKIN_STATUS,
} from '../constants/CheckInActionTypes';

const bikeCheckin = createAction(BIKE_CHECKIN);

const checkinSuccessAction = createAction(BIKE_CHECKIN_SUCCESS);

function checkinSuccess(data) {
  return dispatch => {
    dispatch(checkinSuccessAction(data));
    dispatch(fetchBikeRacks());
  };
}

const checkinFailed = createAction(BIKE_CHECKIN_FAILED);

export const clearCheckinStatus = createAction(CLEAR_BIKE_CHECKIN_STATUS);

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
  const radiusInRadians = turf.lengthToRadians(accuracy, 'meters');
  const locationArea = turf.circle(
    turf.point([longitude, latitude]),
    radiusInRadians,
    {
      units: 'radians',
    }
  );
  return bikeRacks.find(({ checkInArea }) => {
    return (
      turf.booleanOverlap(checkInArea, locationArea) ||
      turf.booleanContains(checkInArea, locationArea)
    );
  });
}

export function checkincurrentRentalByLocation() {
  return (dispatch, getState, api) => {
    const { currentRental, bikeRacks } = getState();
    dispatch(bikeCheckin());
    getLocationAsync(dispatch).then(({ coords }) => {
      const bikeRack = getBikeRackByLocation(bikeRacks, coords);
      if (!bikeRack) {
        dispatch(
          checkinFailed({
            message: 'No bike rack at current location.',
          })
        );
      } else {
        api.bike
          .checkin(currentRental.bike, bikeRack.id)
          .then(
            data => dispatch(checkinSuccess(data)),
            error => dispatch(checkinFailed(error))
          )
          .done();
      }
    });
  };
}

export function checkincurrentRentalByBikeRack(bikeRack) {
  return (dispatch, getState, api) => {
    const { currentRental } = getState();
    dispatch(bikeCheckin());
    api.bike
      .checkin(currentRental.bike, bikeRack)
      .then(
        data => dispatch(checkinSuccess(data)),
        error => dispatch(checkinFailed(error))
      )
      .done();
  };
}
