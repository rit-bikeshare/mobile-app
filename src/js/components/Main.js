import React from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, Tabs, Tab, TabHeading } from 'native-base';
import { ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import { getBikeRackFetchStatus } from 'BikeShare/selectors/bikeRackSelectors';
import { fetchBikeRacks as fetchBikeRacksAction } from 'BikeShare/redux/actions/bikeRackActions';
import Icon from 'BikeShare/components/lib/Icon';
import MapContainer from 'BikeShare/containers/MapContainer';
import Settings from 'BikeShare/components/Settings';
import getTheme from 'theme/components';
import materialIcons from 'theme/variables/materialIcons';

import RequestStatus from 'BikeShare/constants/RequestStatus';

const {
  SUCCESS,
  FAILED
} = RequestStatus;

class Main extends React.Component {
  static propTypes = {
    bikeRackFetchStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    fetchBikeRacks: PropTypes.func
  }
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false
    };

    this.handleRefreash = this.handleRefreash.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const { bikeRackFetchStatus } = nextProps;
    const { bikeRackFetchStatus: prevFetchStatus } = this.props;
    if (bikeRackFetchStatus !== prevFetchStatus
      && (bikeRackFetchStatus === SUCCESS || bikeRackFetchStatus === FAILED)) {
      this.setState({
        refreshing: false
      });
    }
  }

  handleRefreash() {
    const { fetchBikeRacks } = this.props;
    this.setState({
      refreshing: true
    });
    fetchBikeRacks();
  }

  renderTabHeading(icon, iconFamily) {
    return (
      <TabHeading>
        <Icon name={icon} iconFamily={iconFamily} />
      </TabHeading>
    );
  }

  render() {
    const { refreshing } = this.state;
    return (
      <StyleProvider style={getTheme(materialIcons)}>
        <ScrollView
          refreshControl={
            <RefreshControl
              onRefresh={this.handleRefreash}
              refreshing={refreshing}
            />
          }
          contentContainerStyle={{ flexGrow: 1 }}
        >
          <Tabs initialPage={0}>
            <Tab heading={this.renderTabHeading('bike', 'MaterialCommunityIcons')}>
              <MapContainer />
            </Tab>
            <Tab heading={this.renderTabHeading('more-horiz', 'MaterialIcons')}>
              <Settings />
            </Tab>
          </Tabs>
        </ScrollView>
      </StyleProvider>
    );
  }
}

const mapStateToProps = state => ({
  bikeRackFetchStatus: getBikeRackFetchStatus(state).status
});

export default connect(mapStateToProps, {
  fetchBikeRacks: fetchBikeRacksAction
})(Main);
