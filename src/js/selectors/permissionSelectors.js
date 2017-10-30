import { createSelector } from 'reselect';
import { getIn } from '@hs/transmute';
import {
  PENDING,
  DENIED,
  GRANTED
} from 'BikeShare/constants/PermissionValues';

function capatilize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * This creates a few selectors given the permission key.
 * 1. get[permissionKey]Permission - returns the permission value.
 * 2. [permissionKey]PermissionGranted - returns if the permission value is granted.
 * 3. [permissionKey]PermissionDenied
 * 4. [permissionKey]PermissionPending
 * @param  {string} permissionKey the key of the permission you want to get the selectors for
 * @return {object}             an object of reselect selectors.
 */
function createPermissionSelectors(permissionKey) {
  const getPermissionValue = getIn(['permissions', permissionKey]);
  return {
    [`get${capatilize(permissionKey)}Permission`]: getPermissionValue,
    [`${permissionKey}PermissionGranted`]: createSelector(
      getPermissionValue,
      permissionValue => permissionValue === GRANTED
    ),
    [`${permissionKey}PermissionDenied`]: createSelector(
      getPermissionValue,
      permissionValue => permissionValue === DENIED
    ),
    [`${permissionKey}PermissionPending`]: createSelector(
      getPermissionValue,
      permissionValue => permissionValue === PENDING
    )
  };
}

const selectors = {
  ...createPermissionSelectors('camera')
};

export default selectors;
