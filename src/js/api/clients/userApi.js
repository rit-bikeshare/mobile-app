export default request => ({
  fetchUserData(token) {
    return request.unAuthedGet('user/info/', token);
  },
  doLogin() {
    return request.doLogin();
  },
});
