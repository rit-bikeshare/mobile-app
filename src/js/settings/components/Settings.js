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
    tigerMode: PropTypes.bool,
    pullToRefresh: PropTypes.bool,
    history: PropTypes.object,
    clearUserData: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.setTigerMode = this.setTigerMode.bind(this);
    this.setDebugMode = this.setDebugMode.bind(this);
    this.setPullToRefresh = this.setPullToRefresh.bind(this);
    this.routeToDamageReport = this.routeToDamageReport.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
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

  setTigerMode(value) {
    const { setSetting } = this.props;
    setSetting('tigerMode', value);
  }

  setDebugMode(value) {
    const { setSetting } = this.props;
    setSetting('showCheckInAreas', value);
  }

  setPullToRefresh(value) {
    const { setSetting } = this.props;
    setSetting('pullToRefresh', value);
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
        </List>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  showCheckInAreas: state.settings.showCheckInAreas,
  tigerMode: state.settings.tigerMode,
  pullToRefresh: state.settings.pullToRefresh,
});

export default connect(mapStateToProps, {
  setSetting: setSettingAction,
  clearUserData: clearUserDataAction,
})(Settings);
