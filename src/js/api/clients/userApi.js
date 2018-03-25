import { unAuthedGet, doLogin } from '../request';

export default {
  fetchUserData() {
    return unAuthedGet('user/info/');
  },
  doLogin() {
    return doLogin();
  },
};
