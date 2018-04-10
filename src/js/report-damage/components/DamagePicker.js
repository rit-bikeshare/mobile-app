import React from 'react';
import { Map } from 'immutable';
import PropTypes from 'prop-types';
import { Item } from 'native-base';
import { connect } from 'react-redux';
import { ActivityIndicator } from 'react-native';

import PickerWithPlaceholder from 'BikeShare/lib/components/PickerWithPlaceholder';
import getDamageTypeFetchStatus from '../selectors/getDamageTypeFetchStatus';
import { fetchDamageTypes as fetchDamageTypesAction } from '../actions/damageActions';
import RequestStatus from 'BikeShare/api/constants/RequestStatus';

const { UNINITIALIZED, SUCCESS, FAILED, PENDING } = RequestStatus;

class DamagePicker extends React.Component {
  static propTypes = {
    onSelect: PropTypes.func,
    damageTypeId: PropTypes.string,
    fetchDamageTypes: PropTypes.func,
    damageTypes: PropTypes.instanceOf(Map),
    damageTypeFetchStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    enabled: PropTypes.bool,
  };

  constructor(props) {
    super(props);
    this.state = {
      loading: false,
    };
  }

  componentWillMount() {
    const { fetchDamageTypes, damageTypeFetchStatus, damageTypes } = this.props;

    if (damageTypes.isEmpty() && damageTypeFetchStatus === UNINITIALIZED) {
      this.setState({
        loading: true,
      });
      fetchDamageTypes();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { damageTypeFetchStatus: prevDamageTypeFetchStatus } = this.props;
    const { damageTypeFetchStatus } = nextProps;

    const requestWasLoading = prevDamageTypeFetchStatus === PENDING;
    const requestFinished =
      damageTypeFetchStatus === SUCCESS || damageTypeFetchStatus === FAILED;
    if (requestWasLoading && requestFinished) {
      this.setState({
        loading: false,
      });
    }
  }

  renderPickerItem(damageType) {
    return (
      <Item key={damageType.id} label={damageType.name} value={damageType.id} />
    );
  }

  renderPickerItems() {
    const { damageTypes } = this.props;
    return damageTypes
      .toList()
      .map(damageType => this.renderPickerItem(damageType))
      .toJS();
  }

  render() {
    const { loading } = this.state;
    const { onSelect, damageTypeId, enabled } = this.props;

    if (loading) {
      return <ActivityIndicator size="small" />;
    }

    return (
      <PickerWithPlaceholder
        mode="dropdown"
        placeholder="Select Damage Type"
        selectedValue={damageTypeId}
        onValueChange={onSelect}
        enabled={enabled}
      >
        {this.renderPickerItems()}
      </PickerWithPlaceholder>
    );
  }
}

const mapToStateToProps = state => ({
  damageTypeFetchStatus: getDamageTypeFetchStatus(state),
});

const mapDispatchToProps = {
  fetchDamageTypes: fetchDamageTypesAction,
};

export default connect(mapToStateToProps, mapDispatchToProps)(DamagePicker);
