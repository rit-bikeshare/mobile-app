import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { getIn } from '@hs/transmute';
import { connect } from 'react-redux';
import { MapView as ExpoMapView } from 'expo';
import { Modal, ActivityIndicator } from 'react-native';
import { View } from 'native-base';

import MapView from 'BikeShare/lib/components/MapView';

import fetchDamagedBikesAction from '../../actions/fetchDamagedBikes';
import CheckOutView from '../CheckOut';
import CheckInContainer from '../CheckIn';
import MaintenanceActions from '../MaintenanceActions';
import style from './MaintenanceViewStyles';

class MaintenanceView extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    fetchDamagedBikes: PropTypes.func,
    damagedBikes: PropTypes.instanceOf(List),
  };

  constructor(props) {
    super(props);
    this.state = {
      showCheckout: false,
      showCheckin: false,
      loading: false,
    };
    this.handleClickCheckout = this.handleClickCheckout.bind(this);
    this.handleClickCheckin = this.handleClickCheckin.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentWillMount() {
    const { fetchDamagedBikes } = this.props;
    fetchDamagedBikes();
    this.pollInterval = setInterval(() => fetchDamagedBikes(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.pollInterval);
  }

  handleClickCheckout() {
    this.setState({ showCheckout: true });
  }

  handleClickCheckin() {
    this.setState({ showCheckin: true });
  }

  closeModal() {
    this.setState({
      showCheckout: false,
      showCheckin: false,
    });
  }

  renderLoading() {
    const { loading } = this.state;
    if (!loading) {
      return null;
    }

    return <ActivityIndicator />;
  }

  renderModalContent() {
    const { history } = this.props;
    const { showCheckout, showCheckin } = this.state;

    if (showCheckout) {
      return <CheckOutView onClose={this.closeModal} />;
    }

    if (showCheckin) {
      return <CheckInContainer history={history} onClose={this.closeModal} />;
    }

    return <View />;
  }

  renderModal() {
    const { showCheckout, showCheckin } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showCheckout || showCheckin}
        onRequestClose={this.closeModal}
      >
        {this.renderModalContent()}
      </Modal>
    );
  }

  renderMarkers() {
    const { damagedBikes } = this.props;
    return damagedBikes.map(({ id, lat, lon }) => (
      <ExpoMapView.Marker
        key={id}
        title={`Bike ${id}`}
        coordinate={{
          latitude: lat,
          longitude: lon,
        }}
      />
    ));
  }

  render() {
    return (
      <View style={{ flexGrow: 1 }}>
        {this.renderModal()}
        <MapView>{this.renderMarkers()}</MapView>
        <MaintenanceActions
          style={style.actionsWrapper}
          checkOutBike={this.handleClickCheckout}
          checkInBike={this.handleClickCheckin}
        />
      </View>
    );
  }
}

const mapStateToProps = state => ({
  damagedBikes: getIn(['maintenance', 'damagedBikes'])(state),
});

export default connect(mapStateToProps, {
  fetchDamagedBikes: fetchDamagedBikesAction,
})(MaintenanceView);
