import React from 'react';
import PropTypes from 'prop-types';
import { StyleProvider, Tabs, Tab, TabHeading, Icon } from 'native-base';
import { connect } from 'react-redux';

import getTheme from 'theme/components';
import materialIcons from 'theme/variables/materialIcons';

import { fetchBikeRacks as fetchBikeRacksAction } from 'BikeShare/bike-rack/actions/bikeRackActions';
import { RentalView } from 'BikeShare/rental';
import { SettingsView } from 'BikeShare/settings';
import { MaintenanceView } from 'BikeShare/maintenance';

class Main extends React.Component {
  static propTypes = {
    fetchBikeRacks: PropTypes.func,
    pullToRefresh: PropTypes.bool,
    history: PropTypes.object,
    maintenanceMode: PropTypes.bool,
  };

  renderTabHeading(icon, iconFamily) {
    return (
      <TabHeading>
        <Icon name={icon} type={iconFamily} />
      </TabHeading>
    );
  }

  renderMapView() {
    const { maintenanceMode, history } = this.props;

    if (maintenanceMode) {
      return <MaintenanceView history={history} />;
    }

    return <RentalView history={history} />;
  }

  renderTabs() {
    const { history } = this.props;
    return (
      <Tabs initialPage={0}>
        <Tab heading={this.renderTabHeading('bike', 'MaterialCommunityIcons')}>
          {this.renderMapView()}
        </Tab>
        <Tab heading={this.renderTabHeading('more-horiz', 'MaterialIcons')}>
          <SettingsView history={history} />
        </Tab>
      </Tabs>
    );
  }

  render() {
    return (
      <StyleProvider style={getTheme(materialIcons)}>
        {this.renderTabs()}
      </StyleProvider>
    );
  }
}

const mapStateToProps = state => ({
  maintenanceMode: state.settings.maintenanceMode,
});

export default connect(mapStateToProps, {
  fetchBikeRacks: fetchBikeRacksAction,
})(Main);
