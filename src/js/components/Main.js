import React from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, Tabs, Tab, TabHeading, Icon } from 'native-base';
import { ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import { getBikeRackFetchStatus } from 'BikeShare/selectors/bikeRackSelectors';
import { fetchBikeRacks as fetchBikeRacksAction } from 'BikeShare/redux/actions/bikeRackActions';
import MapContainer from 'BikeShare/containers/MapContainer';
import Settings from 'BikeShare/components/Settings';
import getTheme from 'theme/components';
import materialIcons from 'theme/variables/materialIcons';

import RequestStatus from 'BikeShare/constants/RequestStatus';

const { SUCCESS, FAILED } = RequestStatus;

class Main extends React.Component {
  static propTypes = {
    bikeRackFetchStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    fetchBikeRacks: PropTypes.func,
    pullToRefresh: PropTypes.bool
  };
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
    if (
      bikeRackFetchStatus !== prevFetchStatus &&
      (bikeRackFetchStatus === SUCCESS || bikeRackFetchStatus === FAILED)
    ) {
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
        <Icon name={icon} type={iconFamily} />
      </TabHeading>
    );
  }

  renderTabs() {
    return (
      <Tabs initialPage={0}>
        <Tab heading={this.renderTabHeading('bike', 'MaterialCommunityIcons')}>
          <MapContainer />
        </Tab>
        <Tab heading={this.renderTabHeading('more-horiz', 'MaterialIcons')}>
          <Settings />
        </Tab>
      </Tabs>
    );
  }

  renderContent() {
    const { refreshing } = this.state;
    const { pullToRefresh } = this.props;

    if (!pullToRefresh) {
      return this.renderTabs();
    }

    return (
      <ScrollView
        refreshControl={<RefreshControl onRefresh={this.handleRefreash} refreshing={refreshing} />}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {this.renderTabs()}
      </ScrollView>
    );
  }

  render() {
    return <StyleProvider style={getTheme(materialIcons)}>{this.renderContent()}</StyleProvider>;
  }
}

const mapStateToProps = state => ({
  bikeRackFetchStatus: getBikeRackFetchStatus(state).status,
  pullToRefresh: state.settings.pullToRefresh
});

export default connect(mapStateToProps, {
  fetchBikeRacks: fetchBikeRacksAction
})(Main);
