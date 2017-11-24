import { createAction } from 'redux-actions';
import { Permissions, Location } from 'expo';

import { hasNotFetchedCurrentRental } from 'BikeShare/selectors/bikeSelectors';
import ActionTypes from 'BikeShare/redux/ActionTypes';
import { PENDING } from 'BikeShare/constants/PermissionValues';
import { updateLocationPermission } from 'BikeShare/redux/actions/permissionActions';
import { fetchBikeRacks } from 'BikeShare/redux/actions/bikeRackActions';

const bikeCheckout = createAction(
  ActionTypes.BIKE_CHECKOUT
);

const checkoutSuccessAction = createAction(
  ActionTypes.BIKE_CHECKOUT_SUCCESS
);

const checkoutFailed = createAction(
  ActionTypes.BIKE_CHECKOUT_FAILED
);

const rentalFetch = createAction(
  ActionTypes.FETCH_CURRENT_RENTAL
);

const fetchRentalSuccess = createAction(
  ActionTypes.FETCH_CURRENT_RENTAL_SUCCESS
);

const fetchRentalFailed = createAction(
  ActionTypes.FETCH_CURRENT_RENTAL_FAILED
);

function fetchCurrentRental() {
  return (dispatch, getState, api) => {
    dispatch(rentalFetch());
    api.bike.fetchRentals()
      .then(data => dispatch(fetchRentalSuccess(data[0])))
      .catch(error => dispatch(fetchRentalFailed(error)))
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
    api.bike.checkout(bikeId)
      .then(data => dispatch(checkoutSuccess(data)))
      .catch(error => dispatch(checkoutFailed(error)))
      .done();
  };
}

const bikeCheckin = createAction(
  ActionTypes.BIKE_CHECKIN
);

const checkinSuccessAction = createAction(
  ActionTypes.BIKE_CHECKIN_SUCCESS
);

function checkinSuccess(data) {
  return dispatch => {
    dispatch(checkinSuccessAction(data));
    dispatch(fetchBikeRacks());
  };
}

const checkinFailed = createAction(
  ActionTypes.BIKE_CHECKIN_FAILED
);

function getLocationAsync(dispatch) {
  dispatch(updateLocationPermission(PENDING));
  return Permissions.askAsync(Permissions.LOCATION)
    .then(({ status }) => {
      dispatch(updateLocationPermission(status));
      if (status === 'granted') {
        return Location.getCurrentPositionAsync({ enableHighAccuracy: true });
      }
      throw new Error('Location permission not granted');
    });
}

export function checkinCurrentBikeByLocation() {
  return (dispatch, getState, api) => {
    const { currentBike } = getState();
    dispatch(bikeCheckin());
    getLocationAsync(dispatch)
      .then(({ coords }) => {
        const { latitude, longitude } = coords;
        api.bike.checkin(currentBike.bike, { lat: latitude, lon: longitude })
          .then(data => dispatch(checkinSuccess(data)))
          .catch(error => dispatch(checkinFailed(error)))
          .done();
      });
  };
}

export function checkinCurrentBikeByBikeRack(bikeRack) {
  return (dispatch, getState, api) => {
    const { currentBike } = getState();
    dispatch(bikeCheckin());
    api.bike.checkin(currentBike.bike, null, bikeRack)
      .then(data => dispatch(checkinSuccess(data)))
      .catch(error => dispatch(checkinFailed(error)))
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
