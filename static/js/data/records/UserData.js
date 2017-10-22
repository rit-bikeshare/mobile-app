import { Record } from 'immutable';

export default new Record({
  username: null,
  authToken: null,
  firstName: null,
  lastName: null
});

export function isEmpty({ username, authToken }) {
  return username === null
  && authToken === null;
}
