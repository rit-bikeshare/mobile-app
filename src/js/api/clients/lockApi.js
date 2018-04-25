export default request => ({
  getChannel(rentalId) {
    return request.get(`ws/lock-state/${rentalId}`);
  },

  lock(bikeId) {
    return request.post(`lock`, {
      bike: bikeId,
      command: 'lock',
    });
  },

  unlock(bikeId) {
    return request.post(`lock`, {
      bike: bikeId,
      command: 'unlock',
    });
  },

  adminLock(bikeId) {
    return request.post(`admin/lock`, {
      bike: bikeId,
      command: 'lock',
    });
  },

  adminUnlock(bikeId) {
    return request.post(`admin/lock`, {
      bike: bikeId,
      command: 'unlock',
    });
  },
});
