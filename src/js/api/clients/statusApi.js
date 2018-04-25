export default request => ({
  fetch() {
    return request.get('status');
  },
});
