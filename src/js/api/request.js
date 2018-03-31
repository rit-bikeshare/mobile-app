/* eslint-disable no-throw-literal */

import Expo from 'expo';
import { AuthSession } from 'expo';

let doLoginPromise;
const baseApiUrl = 'http:/spin.se.rit.edu';

export async function doLogin() {
  const returnUrl = `${Expo.Constants.linkingUrl}expo-auth-session`;
  return AuthSession.startAsync({
    authUrl: `${baseApiUrl}/login/?expo=true`,
    returnUrl,
  });
}

function doAuthLogin() {
  if (!doLoginPromise) {
    doLoginPromise = doLogin();
  }
  return doLoginPromise;
}

function checkAuth(retryFetch) {
  return response => {
    if (!response.ok && response.status === 403) {
      return doAuthLogin().then(retryFetch());
    }
    return response;
  };
}

function buildGet(url) {
  return token => {
    // always add a trailing slash
    url = url.replace(/\/?$/, '/');

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: baseApiUrl,
    };

    if (token) {
      headers.Authorization = `JWT ${token}`;
    }

    return fetch(`${baseApiUrl}/${url}`, {
      method: 'GET',
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: headers,
    });
  };
}

function buildPost(url, body) {
  return token => {
    // always add a trailing slash
    url = url.replace(/\/?$/, '/');

    const headers = {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Origin: baseApiUrl,
    };

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

export function get(url) {
  const fetchFunction = buildGet(url);

  return fetchFunction()
    .then(checkAuth(fetchFunction))
    .then(async response => {
      if (response.ok) return response.json();

      const error = await response.json();
      return Promise.reject({
        code: response.status,
        message: error.detail,
      });
    });
}

export function post(url, body) {
  const fetchFunction = buildPost(url, body);

  return fetchFunction()
    .then(checkAuth(fetchFunction))
    .then(async response => {
      if (response.ok) return response.json();

      const error = await response.json();

      return Promise.reject({
        code: response.status,
        message: error.detail,
      });
    });
}

export function unAuthedGet(url, token = null) {
  return buildGet(url)(token).then(async response => {
    if (response.ok) return response.json();

    const error = await response.json();
    return Promise.reject({
      code: response.status,
      message: error.detail,
    });
  });
}
