export default request => ({
  lookupBikeDamage(bikeId) {
    return request.get('admin/damage-reports', {
      bike: bikeId,
      is_open: true,
    });
  },

  lookupBike(bikeId) {
    return request.get(`admin/bikes/${bikeId}`);
  },

  fetchDamagedBikes() {
    return request.get('admin/damaged-bikes');
  },

  updateDamageReport(damageReport) {
    return request.put(`admin/damage-reports/${damageReport.id}`, damageReport);
  },
});
