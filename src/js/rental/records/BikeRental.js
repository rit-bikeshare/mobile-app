import { Record } from 'immutable';

const BikeRental = new Record({
  bike: null,
  id: null,
  rentedAt: null,
  renter: null,
  returnedAt: null,
  shouldReturnAt: null,
});

export default BikeRental;

/**
 * If the given user data record is empty
 * @param  {BikeRental}  data  an immutable BikeRental record.
 * @return {Boolean}           if the given BikeRental is empty.
 */
export function isEmpty(data) {
  if (!data) return true;
  if (!(data instanceof BikeRental)) return true;

  const { bike, id, rentedAt } = data;
  return bike === null && id === null && rentedAt === null;
}

export function isCurrentlyRented(data) {
  if (!data) return true;
  if (!(data instanceof BikeRental)) return true;

  const { bike, rentedAt, returnedAt } = data;
  return bike !== null && rentedAt !== null && returnedAt === null;
}
