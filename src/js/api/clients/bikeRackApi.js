export default request => ({
  fetch() {
    return request.get('bike-racks/');
  },
});
