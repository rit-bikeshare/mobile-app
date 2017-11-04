const baseApiUrl = 'http://scottiepi.student.rit.edu:8071';

export function get(url) {
  return fetch(`${baseApiUrl}/${url}`, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  }).then(response => response.json());
}

export function post(url, body) {
  return fetch(`${baseApiUrl}/${url}`, {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body)
  }).then(response => response.json());
}
