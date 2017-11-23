import { post, get } from 'BikeShare/data/api/request';

function trimUndefinedKeys(obj) {
  const propNames = Object.getOwnPropertyNames(obj);
  for (let i = 0; i < propNames.length; i++) {
    const propName = propNames[i];
    if (typeof obj[propName] === 'undefined') {
      delete obj[propName];
    }
  }
  return obj;
}

export default {
  fetchRentals() {
    return get('rentals');
  },

  canCheckout(bikeId) {
    return post('can-checkout', {
      bike: bikeId
    });
  },

  checkout(bikeId) {
    return post('checkout', {
      bike: bikeId
    });
  },

  checkin(bikeId, location, bikeRackId) {
    const data = trimUndefinedKeys({
      bikeId,
      location,
      bikeRackId
    });
    return post('checkin', data);
  }
};
