export default request => ({
  fetchUserData(token) {
    return request.unAuthedGet('user/info/', token);
  },

  fetchRideHistory(page = 1) {
    return request.get('user/history', {
      page,
    });
  },

  doLogin() {
    return request.doLogin();
  },
});
