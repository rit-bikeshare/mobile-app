import { Record } from 'immutable';

const DEFAULT_LOCATION = { lat: 43.08447438334887, lng: -77.67920080572367 };

export default Record(
  {
    id: undefined,
    lock: null,
    visible: true,
    currentRental: null,
    previousRental: null,
    lat: DEFAULT_LOCATION.lat,
    lon: DEFAULT_LOCATION.lng,
    previousRenterUsername: null,
    currentRenterUsername: null,
  },
  'Bike'
);
