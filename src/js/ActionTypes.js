import keyMirror from 'keymirror';

export default keyMirror({
  USER_AUTHENTICATED: null,
  SET_USER_DATA: null,

  SET_CAMERA_PERMISSION: null,
  SET_LOCATION_PERMISSION: null,

  SET_NETWORK_CONNECTION_STATUS: null,

  FETCH_BIKE_RACKS: null,
  FETCH_BIKE_RACKS_SUCCESS: null,
  FETCH_BIKE_RACKS_FAILED: null,

  BIKE_CHECKOUT: null,
  BIKE_CHECKOUT_SUCCESS: null,
  BIKE_CHECKOUT_FAILED: null,
  CLEAR_BIKE_CHECKOUT_STATUS: null,

  BIKE_CHECKIN: null,
  BIKE_CHECKIN_SUCCESS: null,
  BIKE_CHECKIN_FAILED: null,
  CLEAR_BIKE_CHECKIN_STATUS: null,

  FETCH_CURRENT_RENTAL: null,
  FETCH_CURRENT_RENTAL_SUCCESS: null,
  FETCH_CURRENT_RENTAL_FAILED: null,
});