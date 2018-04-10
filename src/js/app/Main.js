import React from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, Tabs, Tab, TabHeading, Icon } from 'native-base';
import { ScrollView, RefreshControl } from 'react-native';
import { connect } from 'react-redux';

import getTheme from 'theme/components';
import materialIcons from 'theme/variables/materialIcons';

import { getBikeRackFetchStatus } from 'BikeShare/bike-rack/selectors/bikeRackSelectors';
import { fetchBikeRacks as fetchBikeRacksAction } from 'BikeShare/bike-rack/actions/bikeRackActions';
import { RentalView } from 'BikeShare/rental';
import { SettingsView } from 'BikeShare/settings';
import RequestStatus from 'BikeShare/api/constants/RequestStatus';

const { SUCCESS, FAILED } = RequestStatus;

class Main extends React.Component {
  static propTypes = {
    bikeRackFetchStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    fetchBikeRacks: PropTypes.func,
    pullToRefresh: PropTypes.bool,
    history: PropTypes.object,
  };
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
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
        refreshing: false,
      });
    }
  }

  handleRefreash() {
    const { fetchBikeRacks } = this.props;
    this.setState({
      refreshing: true,
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
    const { history } = this.props;
    return (
      <Tabs initialPage={0}>
        <Tab heading={this.renderTabHeading('bike', 'MaterialCommunityIcons')}>
          <RentalView history={history} />
        </Tab>
        <Tab heading={this.renderTabHeading('more-horiz', 'MaterialIcons')}>
          <SettingsView history={history} />
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
        refreshControl={
          <RefreshControl
            onRefresh={this.handleRefreash}
            refreshing={refreshing}
          />
        }
        contentContainerStyle={{ flexGrow: 1 }}
      >
        {this.renderTabs()}
      </ScrollView>
    );
  }

  render() {
    return (
      <StyleProvider style={getTheme(materialIcons)}>
        {this.renderContent()}
      </StyleProvider>
    );
  }
}

const mapStateToProps = state => ({
  bikeRackFetchStatus: getBikeRackFetchStatus(state).status,
  pullToRefresh: state.settings.pullToRefresh,
});

export default connect(mapStateToProps, {
  fetchBikeRacks: fetchBikeRacksAction,
})(Main);
