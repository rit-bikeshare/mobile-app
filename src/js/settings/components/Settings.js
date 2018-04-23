import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, List, Body, Switch, Right, Text, View } from 'native-base';
import { connect } from 'react-redux';

import { reportDamage, login } from 'BikeShare/constants/urls';

import { setSetting as setSettingAction } from '../actions/settingsActions';
import { clearUserData as clearUserDataAction } from 'BikeShare/auth/actions/userDataActions';

class Settings extends React.Component {
  static propTypes = {
    setSetting: PropTypes.func,
    showCheckInAreas: PropTypes.bool,
    history: PropTypes.object,
    clearUserData: PropTypes.func,
    maintenanceMode: PropTypes.bool,
    hasMaintenanceAccess: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.setDebugMode = this.setDebugMode.bind(this);
    this.routeToDamageReport = this.routeToDamageReport.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    this.toggleMaintenanceMode = this.toggleMaintenanceMode.bind(this);
  }

  routeToDamageReport() {
    const { history } = this.props;
    history.push(reportDamage);
  }

  handleLogout() {
    const { history, clearUserData } = this.props;
    clearUserData();
    history.push(login);
  }

  setDebugMode(value) {
    const { setSetting } = this.props;
    setSetting('showCheckInAreas', value);
  }

  toggleMaintenanceMode(value) {
    const { setSetting } = this.props;
    setSetting('maintenanceMode', value);
  }

  renderMaintenanceModeToggle() {
    const { maintenanceMode, hasMaintenanceAccess } = this.props;
    if (!hasMaintenanceAccess) return null;
    return (
      <ListItem>
        <Body>
          <Text>Enable Maintenance Mode</Text>
        </Body>
        <Right>
          <Switch
            value={maintenanceMode}
            onValueChange={this.toggleMaintenanceMode}
          />
        </Right>
      </ListItem>
    );
  }

  render() {
    const { showCheckInAreas } = this.props;
    return (
      <View style={{ flexGrow: 1 }}>
        <List>
          <ListItem onPress={this.routeToDamageReport}>
            <Body>
              <Text>Report Damage</Text>
            </Body>
          </ListItem>
          <ListItem onPress={this.handleLogout}>
            <Body>
              <Text>Logout</Text>
            </Body>
          </ListItem>
          <ListItem itemDivider={true}>
            <Text>Settings</Text>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Show Check In Areas</Text>
            </Body>
            <Right>
              <Switch
                value={showCheckInAreas}
                onValueChange={this.setDebugMode}
              />
            </Right>
          </ListItem>
          {this.renderMaintenanceModeToggle()}
        </List>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  maintenanceMode: state.settings.maintenanceMode,
  showCheckInAreas: state.settings.showCheckInAreas,
  hasMaintenanceAccess: state.userData.isStaff,
});

export default connect(mapStateToProps, {
  setSetting: setSettingAction,
  clearUserData: clearUserDataAction,
})(Settings);
