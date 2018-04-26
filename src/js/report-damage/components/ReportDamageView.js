import React from 'react';
import { Map } from 'immutable';
import { connect } from 'react-redux';
import queryString from 'query-string';
import PropTypes from 'prop-types';
import {
  Container,
  Content,
  Form,
  View,
  Input,
  Item,
  Button,
  Icon,
  Label,
  Title,
  Text,
  Right,
} from 'native-base';
import { Modal } from 'react-native';
import CheckBox from 'react-native-check-box';

import { BikeScanner } from 'BikeShare/scanner';
import getDamageTypes from '../selectors/getDamageTypes';
import DamagePicker from './DamagePicker';
import {
  reportDamage as reportDamageAction,
  resetDamageReportStatus as resetDamageReportStatusAction,
} from '../actions/damageActions';
import RequestStatus from 'BikeShare/api/constants/RequestStatus';
import { LoadingView, SuccessView } from 'BikeShare/status';
import getDamageReportStatus from '../selectors/getDamageReportStatus';

const { SUCCESS, FAILED, PENDING } = RequestStatus;

class ReportDamageView extends React.Component {
  static propTypes = {
    history: PropTypes.object,
    reportDamage: PropTypes.func,
    damageTypes: PropTypes.instanceOf(Map),
    damageReportStatus: PropTypes.oneOf(Object.keys(RequestStatus)),
    resetDamageReportStatus: PropTypes.func,
    location: PropTypes.object,
  };

  constructor(props) {
    super(props);
    const { location: { search } } = props;
    const { bikeId } = queryString.parse(search);

    this.state = {
      damageTypeId: null,
      comments: '',
      critical: false,
      bikeId,
      showScanner: false,
      loading: false,
    };

    this.showScanner = this.showScanner.bind(this);
    this.closeScanner = this.closeScanner.bind(this);
    this.goBack = this.goBack.bind(this);
    this.handleSetBikeId = this.handleSetBikeId.bind(this);
    this.handleToggleCritical = this.handleToggleCritical.bind(this);
    this.handleDamageTypeSelect = this.handleDamageTypeSelect.bind(this);
    this.handleCommentsChanged = this.handleCommentsChanged.bind(this);
    this.handleSubmitDamageReport = this.handleSubmitDamageReport.bind(this);
  }

  componentWillMount() {
    const { resetDamageReportStatus } = this.props;
    resetDamageReportStatus();
  }

  componentWillReceiveProps(nextProps) {
    const { damageReportStatus: prevDamageReportStatus } = this.props;
    const { damageReportStatus } = nextProps;

    const requestWasLoading = prevDamageReportStatus === PENDING;
    const requestFinished =
      damageReportStatus === SUCCESS || damageReportStatus === FAILED;
    if (requestWasLoading && requestFinished) {
      this.setState({
        loading: false,
      });
    }
  }

  showScanner() {
    this.setState({
      showScanner: true,
    });
  }

  closeScanner() {
    this.setState({
      showScanner: false,
    });
  }

  getShouldForceCritical() {
    const { damageTypes } = this.props;
    const { damageTypeId } = this.state;
    if (!damageTypeId) return false;

    return damageTypes.get(damageTypeId).forceCritical;
  }

  goBack() {
    const { history } = this.props;
    history.goBack();
  }

  getIsValid() {
    const { bikeId, comments, damageTypeId } = this.state;
    return bikeId != null && comments && damageTypeId != null;
  }

  getDisabledStyle(disabled) {
    return { opacity: disabled ? 0.25 : 1 };
  }

  handleSetBikeId(bikeId) {
    this.closeScanner();
    this.setState({
      bikeId,
    });
  }

  handleCommentsChanged(comments) {
    this.setState({
      comments,
    });
  }

  handleDamageTypeSelect(damageTypeId) {
    this.setState({
      damageTypeId,
    });
  }

  handleSubmitDamageReport() {
    const { damageTypeId, comments, critical, bikeId } = this.state;
    const { reportDamage } = this.props;
    const data = {
      bikeId,
      damageType: damageTypeId,
      comments,
      critical,
    };
    reportDamage(data);
    this.setState({
      loading: true,
    });
  }

  handleToggleCritical() {
    const { critical } = this.state;
    this.setState({
      critical: !critical,
    });
  }

  renderDamageTypeField() {
    const { damageTypeId, bikeId } = this.state;
    const { damageTypes } = this.props;

    const disabled = bikeId == null;
    const disabledStyle = this.getDisabledStyle(disabled);

    return (
      <Item>
        <Label style={disabledStyle}>Damage Type</Label>
        <View style={{ flexGrow: 1, ...disabledStyle }}>
          <DamagePicker
            damageTypes={damageTypes}
            onSelect={this.handleDamageTypeSelect}
            damageTypeId={damageTypeId}
            enabled={!disabled}
          />
        </View>
      </Item>
    );
  }

  renderBikeIdField() {
    const { bikeId } = this.state;
    const textBikeId = bikeId == null ? 'Scan QR code for ID' : bikeId;

    return (
      <Item>
        <Label>Bike Id</Label>
        <Text style={{ marginLeft: 10 }}>{textBikeId}</Text>
        <Right>
          <Button transparent onPress={this.showScanner}>
            <Icon name="qrcode" type="MaterialCommunityIcons" />
          </Button>
        </Right>
      </Item>
    );
  }

  renderSubmitButton() {
    return (
      <Button
        style={{ marginTop: 20, marginLeft: 20 }}
        primary
        disabled={!this.getIsValid()}
        onPress={this.handleSubmitDamageReport}
      >
        <Text>Submit</Text>
      </Button>
    );
  }

  renderCommentsField() {
    const { damageTypeId } = this.state;
    const formDisabled = damageTypeId === null;

    return (
      <Item>
        <Input
          style={this.getDisabledStyle(formDisabled)}
          placeholder="Comments"
          disabled={formDisabled}
          onChangeText={this.handleCommentsChanged}
        />
      </Item>
    );
  }

  renderCriticalField() {
    const { critical, damageTypeId } = this.state;
    const formDisabled = damageTypeId === null;
    const forceCritical = this.getShouldForceCritical();
    const criticalChecked = forceCritical || critical;
    const checkboxDisabled = formDisabled || forceCritical;

    return (
      <View style={{ paddingLeft: 20, marginTop: 15 }}>
        <CheckBox
          leftText="Bike is Un-rideable"
          style={this.getDisabledStyle(checkboxDisabled)}
          disabled={checkboxDisabled}
          isChecked={criticalChecked}
          onClick={this.handleToggleCritical}
          leftTextStyle={{ fontSize: 17, color: '#575757' }}
        />
      </View>
    );
  }

  renderScannerModal() {
    const { showScanner } = this.state;
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={showScanner}
        onRequestClose={this.closeScanner}
      >
        <BikeScanner
          onClose={this.closeScanner}
          onSubmit={this.handleSetBikeId}
          manualEntryButtonText="Submit"
          manualEntryHeaderText="Enter Bike ID"
        />
      </Modal>
    );
  }

  renderContent() {
    const { damageReportStatus } = this.props;

    if (damageReportStatus === SUCCESS) {
      return (
        <SuccessView
          style={{ paddingTop: 50 }}
          title="Report Sent"
          text="Thanks for reporting bike damage. Maintenance will check the bike shortly."
        />
      );
    }

    return (
      <Form>
        {this.renderBikeIdField()}
        {this.renderDamageTypeField()}
        {this.renderCommentsField()}
        {this.renderCriticalField()}
        {this.renderSubmitButton()}
      </Form>
    );
  }

  render() {
    const { loading } = this.state;

    if (loading) {
      return <LoadingView text="Sending Report..." />;
    }

    return (
      <Container>
        <View
          style={{
            backgroundColor: '#F36E1F',
            flexDirection: 'row',
            alignItems: 'center',
            paddingTop: 5,
            paddingBottom: 5,
          }}
        >
          <Button transparent light onPress={this.goBack}>
            <Icon name="arrow-back" />
          </Button>
          <Title style={{ paddingLeft: 10 }}>Report Bike Damage</Title>
        </View>
        <Content style={{ paddingLeft: 10, paddingRight: 10, paddingTop: 10 }}>
          {this.renderContent()}
        </Content>
        {this.renderScannerModal()}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  damageTypes: getDamageTypes(state),
  damageReportStatus: getDamageReportStatus(state),
});

const mapDispatchToPros = {
  reportDamage: reportDamageAction,
  resetDamageReportStatus: resetDamageReportStatusAction,
};

export default connect(mapStateToProps, mapDispatchToPros)(ReportDamageView);
