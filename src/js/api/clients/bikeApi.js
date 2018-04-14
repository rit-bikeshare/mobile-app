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

export default request => ({
  fetchRentals() {
    return request.get('rentals');
  },

  canCheckout(bikeId) {
    return request.post('can-checkout', {
      bike: bikeId,
    });
  },

  checkOut(bikeId) {
    return request.post('checkout', {
      bike: bikeId,
    });
  },

  checkIn(bike, bikerack) {
    const data = trimUndefinedKeys({
      bike,
      bikerack,
    });
    return request.post('checkin', data);
  },

  reportDamage({ bikeId, damageType, comments, critical }) {
    const data = trimUndefinedKeys({
      bike: bikeId,
      damageType,
      comments,
      critical,
    });

    return request.post('report-damage', data);
  },

  fetchDamageTypes() {
    return request.get('damage-types');
  },
});
