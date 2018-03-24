import { post, get } from '../request';

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
    return get('user/rentals');
  },

  canCheckout(bikeId) {
    return post('can-checkout', {
      bike: bikeId,
    });
  },

  checkOut(bikeId) {
    return post('checkout', {
      bike: bikeId,
    });
  },

  checkIn(bike, bikerack) {
    const data = trimUndefinedKeys({
      bike,
      bikerack,
    });
    return post('checkin', data);
  },
};
