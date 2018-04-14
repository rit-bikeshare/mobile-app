import Expo from 'expo';
import { AuthSession } from 'expo';

const baseApiUrl = 'http://bikesharedev.rit.edu/api';

function getQueryString(params) {
  var esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
}

export default class RequestManager {
  constructor(getToken, setToken) {
    this.getToken = getToken;
    this.setToken = setToken;
  }

  doLogin() {
    const returnUrl = `${Expo.Constants.linkingUrl}expo-auth-session`;
    return AuthSession.startAsync({
      authUrl: `${baseApiUrl}/login/?expo=true`,
      returnUrl,
    }).then(result => {
      if (result.type === 'success') {
        const { token } = result.params;
        this.setToken(token);
      }
      return result;
    });
  }

  doAuthLogin() {
    if (!this.doLoginPromise) {
      this.doLoginPromise = this.doLogin();
    }
    return this.doLoginPromise;
  }

  checkAuth(retryFetch) {
    return response => {
      if (!response.ok && response.status === 403) {
        return this.doAuthLogin().then(retryFetch());
      }
      return response;
    };
  }

  buildGet(url, query) {
    return () => {
      // always add a trailing slash
      url = url.replace(/\/?$/, '/');

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: baseApiUrl,
      };

      const token = this.getToken();
      if (token) {
        headers.Authorization = `JWT ${token}`;
      }

      if (query) {
        url += `?${getQueryString(query)}`;
      }

      return fetch(`${baseApiUrl}/${url}`, {
        method: 'GET',
        credentials: 'same-origin',
        mode: 'same-origin',
        headers: headers,
      });
    };
  }

  buildPost(url, body) {
    return () => {
      // always add a trailing slash
      url = url.replace(/\/?$/, '/');

      const headers = {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: baseApiUrl,
      };

      const token = this.getToken();
      if (token) {
        headers.Authorization = `JWT ${token}`;
      }

      return fetch(`${baseApiUrl}/${url}`, {
        method: 'POST',
        credentials: 'same-origin',
        mode: 'same-origin',
        headers: headers,
        body: JSON.stringify(body),
      });
    };
  }

  get(url, queryData) {
    const fetchFunction = this.buildGet(url, queryData);

    return fetchFunction()
      .then(this.checkAuth(fetchFunction))
      .then(async response => {
        if (response.ok) return response.json();

        const error = await response.json();
        return Promise.reject({
          code: response.status,
          message: error.detail,
        });
      });
  }

  post(url, body) {
    const fetchFunction = this.buildPost(url, body);

    return fetchFunction()
      .then(this.checkAuth(fetchFunction))
      .then(async response => {
        if (response.ok) return response.json();

        const error = await response.json();

        return Promise.reject({
          code: response.status,
          message: error.detail,
        });
      });
  }

  unAuthedGet(url, token = null) {
    return this.buildGet(url)(token).then(async response => {
      if (response.ok) return response.json();

      const error = await response.json();
      return Promise.reject({
        code: response.status,
        message: error.detail,
      });
    });
  }
}
