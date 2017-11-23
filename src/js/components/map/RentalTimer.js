import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Text, View } from 'native-base';
import moment from 'moment';

import BikeRental, { isCurrentlyRented } from 'BikeShare/data/records/BikeRental';
import Icon from 'BikeShare/components/lib/Icon';
import styles from 'BikeShare/styles/rentalTimer';

import 'moment-duration-format';

class RentalTimer extends React.Component {
  static propTypes = {
    currentBike: PropTypes.instanceOf(BikeRental),
    style: PropTypes.object
  }

  constructor(props) {
    super(props);

    this.state = {
      over24: false,
      timerValue: 0
    };

    if (isCurrentlyRented(props.currentBike)) {
      this.state = this.getTimerState(props);
    }
  }

  componentDidMount() {
    const { currentBike } = this.props;
    if (isCurrentlyRented(currentBike)) {
      this.setTimerInterval(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentBike: prevBike } = this.props;
    const { currentBike } = nextProps;
    if (isCurrentlyRented(currentBike) && !isCurrentlyRented(prevBike)) {
      this.setTimerInterval(nextProps);
    }
    if (!isCurrentlyRented(currentBike) && isCurrentlyRented(prevBike)) {
      clearInterval(this.timerInterval);
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  setTimerInterval(props) {
    this.timerInterval = setInterval(() => this.updateTimerValue(props), 1000);
  }

  updateTimerValue(props) {
    this.setState(this.getTimerState(props));
  }

  getTimerState(props) {
    const { currentBike: { rentedAt } } = props;
    const duration = moment.duration(moment().diff(moment(rentedAt)));
    return {
      over24: duration.asHours() >= 24,
      timerValue: duration
    };
  }

  getTextOpacity() {
    const { timerValue, over24 } = this.state;
    if (!over24) {
      return 1;
    }

    const seconds = Math.floor(timerValue.asSeconds());

    return seconds % 2 === 0 ? 1 : 0.75;
  }

  render() {
    const { timerValue } = this.state;
    const { style } = this.props;
    const textStyle = [styles.timer, {
      opacity: this.getTextOpacity()
    }];

    if (timerValue === 0) {
      return null;
    }

    return (
      <View style={[style, styles.timerContainer]}>
        <Icon style={styles.icon} name="md-stopwatch" />
        <Text style={textStyle}>{timerValue.format('d:h:mm:ss')}</Text>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentBike: state.currentBike
});

export default connect(mapStateToProps, null)(RentalTimer);
