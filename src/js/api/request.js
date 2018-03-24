/* eslint-disable no-throw-literal */

const baseApiUrl = 'http://spin.se.rit.edu';

export function get(url) {
  // always add a trailing slash
  url = url.replace(/\/?$/, '/');
  return fetch(`${baseApiUrl}/${url}`, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  }).then(async response => {
    if (response.ok) return response.json();

    const error = await response.json();
    return Promise.reject({
      code: response.status,
      message: error.detail,
    });
  });
}

export function post(url, body) {
  // always add a trailing slash
  url = url.replace(/\/?$/, '/');
  return fetch(`${baseApiUrl}/${url}`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  }).then(async response => {
    if (response.ok) return response.json();

    const error = await response.json();

    return Promise.reject({
      code: response.status,
      message: error.detail,
    });
  });
}
