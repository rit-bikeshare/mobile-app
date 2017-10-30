import { Record } from 'immutable';

export default new Record({
  username: null,
  authToken: null,
  firstName: null,
  lastName: null
});

/**
 * If the given user data record is empty
 * @param  {UserData}  UserData  an immutable UserData record.
 * @return {Boolean}           if the given UserData is empty.
 */
export function isEmpty({ username, authToken }) {
  return username === null
  && authToken === null;
}
