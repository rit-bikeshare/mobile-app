const baseApiUrl = 'http://scottiepi.student.rit.edu:8071';

export function get(url) {
  // always add a trailing slash
  url = url.replace(/\/?$/, '/');
  return fetch(`${baseApiUrl}/${url}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(
    async response => {
      if (response.status === 200) return response.json();

      const error = await response.json();
      throw {
        code: response.status,
        message: error.detail
      };
    }
  );
}

export function post(url, body) {
  // always add a trailing slash
  url = url.replace(/\/?$/, '/');
  return fetch(`${baseApiUrl}/${url}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then(
    async response => {
      if (response.status === 200) return response.json();

      const error = await response.json();
      throw {
        code: response.status,
        message: error.detail
      };
    }
  );
}
