import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ToastAndroid, TouchableWithoutFeedback } from 'react-native';
import { Text, View } from 'native-base';
import moment from 'moment';

import BikeRental, { isCurrentlyRented } from 'BikeShare/data/records/BikeRental';
import Bike from 'BikeShare/components/svg/Bike';
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

    this.showOver24HourToast = this.showOver24HourToast.bind(this);
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
    const { timerValue } = this.state;

    const seconds = Math.floor(timerValue.asSeconds());

    return seconds % 2 === 0 ? 1 : 0.75;
  }

  showOver24HourToast() {
    ToastAndroid.show('You\'ve have your bike checked-out for longer than 24 hours. Please return it as soon as possible to avoid penalties.', ToastAndroid.LONG);
  }

  render24HourAlert() {
    const { over24 } = this.state;
    if (!over24) {
      return null;
    }

    const textStyle = {
      opacity: this.getTextOpacity()
    };

    return (
      <TouchableWithoutFeedback onPress={this.showOver24HourToast}>
        <View style={{ flexDirection: 'row', position: 'absolute', right: 8, alignItems: 'center', padding: 8 }}>
          <Icon style={[styles.icon, textStyle]} name="md-warning" />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { timerValue } = this.state;
    const { style, currentBike } = this.props;

    if (timerValue === 0) {
      return null;
    }

    return (
      <View style={[style, styles.timerContainer]}>
        <View style={{ flexDirection: 'row', position: 'absolute', left: 16, alignItems: 'center' }}>
          <Bike width={35} />
          <Text style={[styles.text, { paddingLeft: 8, alignSelf: 'flex-start' }]}>#</Text>
          <Text style={styles.timer}>{currentBike.bike}</Text>
        </View>
        <Icon style={styles.icon} name="md-stopwatch" />
        <Text style={styles.timer}>{timerValue.format('d:h:mm:ss')}</Text>
        {this.render24HourAlert()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentBike: state.currentBike
});

export default connect(mapStateToProps, null)(RentalTimer);
