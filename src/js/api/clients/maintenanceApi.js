export default request => ({
  lookupBikeDamage(bikeId) {
    return request.get('admin/damage-reports', {
      bike: bikeId,
      acknowledged: false,
      resolved_by: '',
    });
  },

  lookupBike(bikeId) {
    return request.get(`admin/bikes/${bikeId}`);
  },

  fetchDamagedBikes() {
    return request.get('admin/damaged-bikes');
  },
});
