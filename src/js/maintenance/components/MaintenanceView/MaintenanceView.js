import React from 'react';
import PropTypes from 'prop-types';
import { List } from 'immutable';
import { getIn } from '@hs/transmute';
import { connect } from 'react-redux';
import { MapView as ExpoMapView } from 'expo';
import { Modal, ActivityIndicator } from 'react-native';
import { View, Button, Text, Icon } from 'native-base';

import MapView from 'BikeShare/lib/components/MapView';

import fetchDamagedBikesAction from '../../actions/fetchDamagedBikes';
import BikeLookupView from '../BikeLookupView';
import styles from './MaintenanceViewStyles';

class MaintenanceView extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    fetchDamagedBikes: PropTypes.func,
    damagedBikes: PropTypes.instanceOf(List),
  };

  constructor(props) {
    super(props);
    this.state = {
      showLookup: false,
      loading: false,
    };
    this.handleClickLookup = this.handleClickLookup.bind(this);
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

  handleClickLookup() {
    this.setState({ showLookup: true });
  }

  closeModal() {
    this.setState({
      showLookup: false,
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
    const { showLookup } = this.state;

    if (showLookup) {
      return <BikeLookupView history={history} onClose={this.closeModal} />;
    }

    return <View />;
  }

  renderModal() {
    const { showLookup } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLookup}
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
        <Button style={styles.lookupButton} onPress={this.handleClickLookup}>
          <Icon name="qrcode" type="MaterialCommunityIcons" />
          <Text style={styles.lookupText} uppercase={false}>
            Bike Info
          </Text>
        </Button>
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
