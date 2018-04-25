import { createSelector } from 'reselect';
import { get, getIn } from '@hs/transmute';

import MapMarker from 'BikeShare/rental/records/MapMarker';

export const getBikeRackFetchStatus = getIn([
  'requestStatuses',
  'bikeRackFetchStatus',
]);
const getBikeRacks = get('bikeRacks');

export const getBikeRackCoords = createSelector(getBikeRacks, bikeRacks =>
  bikeRacks.map(
    ({ lat, lon, id, bikeCount }) =>
      new MapMarker({
        latitude: lat,
        longitude: lon,
        id,
        data: bikeCount,
      })
  )
);

export const getBikeRackNameMap = createSelector(getBikeRacks, bikeRacks =>
  bikeRacks.map(({ name }) => name)
);
