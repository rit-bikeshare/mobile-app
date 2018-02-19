import { createSelector } from 'reselect';
import { get, getIn } from '@hs/transmute';

import RequestStatusTypes from 'BikeShare/constants/RequestStatus';
import MapMarker from 'BikeShare/data/records/MapMarker';

const { UNINITIALIZED } = RequestStatusTypes;

export const getBikeRackFetchStatus = getIn(['requestStatuses', 'bikeRackFetchStatus']);
const getBikeRacks = get('bikeRacks');

export const hasNotFetchedBikeRacks = createSelector(
  getBikeRackFetchStatus,
  bikeRackFetchStatus => bikeRackFetchStatus.status === UNINITIALIZED
);

export const getBikeRackCoords = createSelector(getBikeRacks, bikeRacks =>
  bikeRacks.map(
    ({ lat, lon, id, bikeCount }) =>
      new MapMarker({
        latitude: lat,
        longitude: lon,
        id,
        data: bikeCount
      })
  )
);

export const getBikeRackNameMap = createSelector(getBikeRacks, bikeRacks =>
  bikeRacks.map(({ name }) => name)
);
