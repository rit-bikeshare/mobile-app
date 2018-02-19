import { createAction } from 'redux-actions';
import { Permissions, Location } from 'expo';
import * as turf from '@turf/turf';

import { hasNotFetchedCurrentRental } from 'BikeShare/selectors/bikeSelectors';
import ActionTypes from 'BikeShare/redux/ActionTypes';
import { PENDING } from 'BikeShare/constants/PermissionValues';
import { updateLocationPermission } from 'BikeShare/redux/actions/permissionActions';
import { fetchBikeRacks } from 'BikeShare/redux/actions/bikeRackActions';

const bikeCheckout = createAction(ActionTypes.BIKE_CHECKOUT);

const checkoutSuccessAction = createAction(ActionTypes.BIKE_CHECKOUT_SUCCESS);

const checkoutFailed = createAction(ActionTypes.BIKE_CHECKOUT_FAILED);

const rentalFetch = createAction(ActionTypes.FETCH_CURRENT_RENTAL);

const fetchRentalSuccess = createAction(ActionTypes.FETCH_CURRENT_RENTAL_SUCCESS);

const fetchRentalFailed = createAction(ActionTypes.FETCH_CURRENT_RENTAL_FAILED);

function fetchCurrentRental() {
  return (dispatch, getState, api) => {
    dispatch(rentalFetch());
    api.bike
      .fetchRentals()
      .then(
        data => dispatch(fetchRentalSuccess(data[0])),
        error => dispatch(fetchRentalFailed(error))
      )
      .done();
  };
}

export function fetchCurrentRentalIfNotAlready() {
  return (dispatch, getState) => {
    const hasNotFetched = hasNotFetchedCurrentRental(getState());
    if (hasNotFetched) {
      dispatch(fetchCurrentRental());
    }
  };
}

function checkoutSuccess(data) {
  return dispatch => {
    dispatch(checkoutSuccessAction(data));
    dispatch(fetchBikeRacks());
  };
}

export function checkoutBike(bikeId) {
  return (dispatch, getState, api) => {
    dispatch(bikeCheckout());
    api.bike
      .checkout(bikeId)
      .then(data => dispatch(checkoutSuccess(data)), error => dispatch(checkoutFailed(error)))
      .done();
  };
}

const bikeCheckin = createAction(ActionTypes.BIKE_CHECKIN);

const checkinSuccessAction = createAction(ActionTypes.BIKE_CHECKIN_SUCCESS);

function checkinSuccess(data) {
  return dispatch => {
    dispatch(checkinSuccessAction(data));
    dispatch(fetchBikeRacks());
  };
}

const checkinFailed = createAction(ActionTypes.BIKE_CHECKIN_FAILED);

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
  const locationArea = turf.circle(turf.point([longitude, latitude]), radiusInRadians, {
    units: 'radians'
  });
  return bikeRacks.find(({ checkInArea }) => {
    return (
      turf.booleanOverlap(checkInArea, locationArea) ||
      turf.booleanContains(checkInArea, locationArea)
    );
  });
}

export function checkinCurrentBikeByLocation() {
  return (dispatch, getState, api) => {
    const { currentBike, bikeRacks } = getState();
    dispatch(bikeCheckin());
    getLocationAsync(dispatch).then(({ coords }) => {
      const bikeRack = getBikeRackByLocation(bikeRacks, coords);
      if (!bikeRack) {
        dispatch(
          checkinFailed({
            message: 'No bike rack at current location.'
          })
        );
      } else {
        api.bike
          .checkin(currentBike.bike, bikeRack.id)
          .then(data => dispatch(checkinSuccess(data)), error => dispatch(checkinFailed(error)))
          .done();
      }
    });
  };
}

export function checkinCurrentBikeByBikeRack(bikeRack) {
  return (dispatch, getState, api) => {
    const { currentBike } = getState();
    dispatch(bikeCheckin());
    api.bike
      .checkin(currentBike.bike, bikeRack)
      .then(data => dispatch(checkinSuccess(data)), error => dispatch(checkinFailed(error)))
      .done();
  };
}

export function reportDamage() {
  return () => {
    console.log('damage');
  };
}

export function lockBike() {
  return () => {
    console.log('lock da bike');
  };
}
