import Toast from 'BikeShare/lib/Toast';

function bikeUnlockSuccess() {
  return () => {
    Toast.show('Bike Unlocking', Toast.SHORT);
  };
}
function bikeUnlockFailed(error) {
  return () => {
    const message = error.message || 'Could not connect to bike lock';
    Toast.show(message, Toast.LONG);
  };
}

export default function unlockLock(bikeId) {
  return (dispatch, getState, api) => {
    api.lock
      .adminUnlock(bikeId)
      .then(
        () => dispatch(bikeUnlockSuccess()),
        error => dispatch(bikeUnlockFailed(error))
      )
      .done();
  };
}
