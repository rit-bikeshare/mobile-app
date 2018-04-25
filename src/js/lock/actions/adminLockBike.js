import Toast from 'BikeShare/lib/Toast';

function bikeLockFailed(error) {
  return () => {
    const message = error.message || 'Could not connect to bike lock';
    Toast.show(message, Toast.LONG);
  };
}

function bikeLockSuccess() {
  return () => {
    Toast.show('Bike Locking', Toast.SHORT);
  };
}

export default function lockLock(bikeId) {
  return (dispatch, getState, api) => {
    api.lock
      .adminLock(bikeId)
      .then(
        () => dispatch(bikeLockSuccess()),
        error => dispatch(bikeLockFailed(error))
      )
      .done();
  };
}
