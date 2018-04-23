export default request => ({
  lookupBikeDamage(bikeId) {
    return request.get('admin/damage-reports', {
      bike: bikeId,
      acknowledged: false,
    });
  },
  lookupBike(bikeId) {
    return request.get(`admin/bikes/${bikeId}`);
  },
});
