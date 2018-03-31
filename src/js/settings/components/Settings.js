import React from 'react';
import PropTypes from 'prop-types';
import { ListItem, List, Body, Switch, Right, Text, View } from 'native-base';
import { connect } from 'react-redux';

import { setSetting as setSettingAction } from '../actions/settingsActions';

class Settings extends React.Component {
  static propTypes = {
    setSetting: PropTypes.func,
    debug: PropTypes.bool,
    tigerMode: PropTypes.bool,
    pullToRefresh: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    this.setTigerMode = this.setTigerMode.bind(this);
    this.setDebugMode = this.setDebugMode.bind(this);
    this.setPullToRefresh = this.setPullToRefresh.bind(this);
  }

  setTigerMode(value) {
    const { setSetting } = this.props;
    setSetting('tigerMode', value);
  }

  setDebugMode(value) {
    const { setSetting } = this.props;
    setSetting('debug', value);
  }

  setPullToRefresh(value) {
    const { setSetting } = this.props;
    setSetting('pullToRefresh', value);
  }

  render() {
    const { debug, pullToRefresh } = this.props;
    return (
      <View style={{ flexGrow: 1 }}>
        <List>
          <ListItem itemDivider={true}>
            <Text>Settings</Text>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Debug Mode</Text>
            </Body>
            <Right>
              <Switch value={debug} onValueChange={this.setDebugMode} />
            </Right>
          </ListItem>
          <ListItem>
            <Body>
              <Text>Pull to refresh on main view</Text>
            </Body>
            <Right>
              <Switch
                value={pullToRefresh}
                onValueChange={this.setPullToRefresh}
              />
            </Right>
          </ListItem>
        </List>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  debug: state.settings.debug,
  tigerMode: state.settings.tigerMode,
  pullToRefresh: state.settings.pullToRefresh,
});

export default connect(mapStateToProps, {
  setSetting: setSettingAction,
})(Settings);
