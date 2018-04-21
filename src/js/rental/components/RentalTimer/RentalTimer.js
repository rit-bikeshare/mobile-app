import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TouchableWithoutFeedback } from 'react-native';
import { Text, View, Icon } from 'native-base';
import moment from 'moment';

import Toast from 'BikeShare/lib/Toast';
import Bike from 'BikeShare/svg/Bike';

import BikeRental, { isCurrentlyRented } from '../../records/BikeRental';
import styles from './RentalTimerStyles';

import 'moment-duration-format';

class RentalTimer extends React.Component {
  static propTypes = {
    currentRental: PropTypes.instanceOf(BikeRental),
    style: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      over24: false,
      timerValue: 0,
    };

    if (isCurrentlyRented(props.currentRental)) {
      this.state = this.getTimerState(props);
    }

    this.showOver24HourToast = this.showOver24HourToast.bind(this);
  }

  componentDidMount() {
    const { currentRental } = this.props;
    if (isCurrentlyRented(currentRental)) {
      this.setTimerInterval(this.props);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { currentRental: prevBike } = this.props;
    const { currentRental } = nextProps;
    if (isCurrentlyRented(currentRental) && !isCurrentlyRented(prevBike)) {
      this.setTimerInterval(nextProps);
    }
    if (!isCurrentlyRented(currentRental) && isCurrentlyRented(prevBike)) {
      this.resetTimer();
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerInterval);
  }

  resetTimer() {
    clearInterval(this.timerInterval);
    this.setState({
      timerValue: 0,
      over24: false,
    });
  }

  setTimerInterval(props) {
    this.timerInterval = setInterval(() => this.updateTimerValue(props), 1000);
  }

  updateTimerValue(props) {
    this.setState(this.getTimerState(props));
  }

  getTimerState(props) {
    const { currentRental: { rentedAt } } = props;
    const duration = moment.duration(moment().diff(moment(rentedAt)));
    return {
      over24: duration.asHours() >= 24,
      timerValue: duration,
    };
  }

  getTextOpacity() {
    const { timerValue } = this.state;

    const seconds = Math.floor(timerValue.asSeconds());

    return seconds % 2 === 0 ? 1 : 0.75;
  }

  showOver24HourToast() {
    Toast.show(
      "You've have your bike checked-out for longer than 24 hours. Please return it as soon as possible to avoid penalties.",
      Toast.LONG
    );
  }

  render24HourAlert() {
    const { over24 } = this.state;
    if (!over24) {
      return null;
    }

    const textStyle = {
      opacity: this.getTextOpacity(),
    };

    return (
      <TouchableWithoutFeedback onPress={this.showOver24HourToast}>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: 8,
            alignItems: 'center',
            padding: 8,
          }}
        >
          <Icon
            type="Ionicons"
            style={[styles.icon, textStyle]}
            name="md-warning"
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }

  render() {
    const { timerValue } = this.state;
    const { style, currentRental } = this.props;

    if (timerValue === 0) {
      return null;
    }

    return (
      <View style={[style, styles.timerContainer]}>
        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            left: 16,
            alignItems: 'center',
          }}
        >
          <Bike width={35} />
          <Text
            style={[styles.text, { paddingLeft: 8, alignSelf: 'flex-start' }]}
          >
            #
          </Text>
          <Text style={styles.timer}>{currentRental.bike}</Text>
        </View>
        <Icon type="Ionicons" style={styles.icon} name="md-stopwatch" />
        <Text style={styles.timer}>{timerValue.format('d:h:mm:ss')}</Text>
        {this.render24HourAlert()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  currentRental: state.currentRental,
});

export default connect(mapStateToProps, null)(RentalTimer);
