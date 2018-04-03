import { Record } from 'immutable';

export default new Record(
  {
    username: null,
    authToken: null,
    firstName: null,
    lastName: null,
  },
  'UserData'
);

/**
 * If the given user data record is empty
 * @param  {UserData}  UserData  an immutable UserData record.
 * @return {Boolean}           if the given UserData is empty.
 */
export function isEmpty({ authToken }) {
  return authToken === null;
}
