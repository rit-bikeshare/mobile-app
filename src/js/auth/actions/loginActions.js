export function doLogin() {
  return (dispatch, getState, api) => {
    return api.user.doLogin();
  };
}
