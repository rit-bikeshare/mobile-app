import { unAuthedGet, doLogin } from '../request';

export default {
  fetchUserData(token) {
    return unAuthedGet('user/info/', token);
  },
  doLogin() {
    return doLogin();
  },
};
