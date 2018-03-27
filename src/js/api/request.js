/* eslint-disable no-throw-literal */

import { AuthSession } from 'expo';

let doLoginPromise;
const baseApiUrl = 'http://spin.se.rit.edu';

function handleDoLogin() {
  return AuthSession.startAsync({
    authUrl: `${baseApiUrl}/login/`,
    returnUrl: '',
  });
}

export function doLogin() {
  if (!doLoginPromise) {
    doLoginPromise = handleDoLogin();
  }
  return doLoginPromise;
}

function checkAuth(retryFetch) {
  return response => {
    if (!response.ok && response.status === 403) {
      return doLogin().then(retryFetch());
    }
    return response;
  };
}

function buildGet(url) {
  return () => {
    // always add a trailing slash
    url = url.replace(/\/?$/, '/');
    return fetch(`${baseApiUrl}/${url}`, {
      method: 'GET',
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: baseApiUrl,
      },
    });
  };
}

function buildPost(url, body) {
  return () => {
    // always add a trailing slash
    url = url.replace(/\/?$/, '/');
    return fetch(`${baseApiUrl}/${url}`, {
      method: 'POST',
      credentials: 'same-origin',
      mode: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Origin: baseApiUrl,
      },
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

export function unAuthedGet(url) {
  return buildGet(url)().then(async response => {
    if (response.ok) return response.json();

    const error = await response.json();
    return Promise.reject({
      code: response.status,
      message: error.detail,
    });
  });
}
