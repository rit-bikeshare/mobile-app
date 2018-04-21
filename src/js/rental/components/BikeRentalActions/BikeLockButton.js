import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';
import { Button, Icon } from 'native-base';
import { isIOS } from 'BikeShare/utils/platform';
import getLockState from 'BikeShare/lock/selectors/getLockState';
import lockBikeAction from 'BikeShare/lock/actions/lockBike';
import unlockBikeAction from 'BikeShare/lock/actions/unlockBike';
import { UNLOCKED, LOCKED, PENDING } from 'BikeShare/lock/constants/LockStates';

class BikeLockButton extends React.Component {
  static propTypes = {
    lockState: PropTypes.oneOf([UNLOCKED, LOCKED, PENDING]),
    style: PropTypes.object,
    unlockBike: PropTypes.func,
    lockBike: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.toggleLock = this.toggleLock.bind(this);
  }

  toggleLock() {
    const { lockBike, unlockBike, lockState } = this.props;

    if (lockState === PENDING) return null;

    if (lockState === UNLOCKED) lockBike();

    unlockBike();
  }

  getIcon() {
    const { lockState } = this.props;
    const prefix = isIOS() ? 'ios' : 'md';

    if (lockState === UNLOCKED) {
      return `${prefix}-unlock`;
    }

    return `${prefix}-lock`;
  }

  renderContent() {
    const { lockState } = this.props;
    if (lockState === PENDING) {
      return (
        <ActivityIndicator
          style={{
            paddingRight: 13.5,
            paddingLeft: 13.5,
            paddingBottom: 10,
            paddingTop: 16,
          }}
          size="small"
          color="#ffffff"
        />
      );
    }

    return <Icon name={this.getIcon()} type="Ionicons" />;
  }

  render() {
    const { style, lockState } = this.props;
    const disabled = lockState === PENDING;
    return (
      <Button style={style} onPress={this.toggleLock} disabled={disabled}>
        {this.renderContent()}
      </Button>
    );
  }
}

const mapStateToProps = state => ({
  lockState: getLockState(state),
});

export default connect(mapStateToProps, {
  unlockBike: unlockBikeAction,
  lockBike: lockBikeAction,
})(BikeLockButton);
