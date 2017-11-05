import React from 'react';
import PropTypes from 'prop-types';
import { Svg } from 'expo';

const {
  G,
  Ellipse,
  Text,
  Path,
  Circle
} = Svg;

export default class BikeRackMarker extends React.Component {
  static propTypes = {
    availableBikes: PropTypes.node
  };

  renderText(availableBikes) {
    if (availableBikes === null) return null;

    return (
      <Text textAnchor="middle" id="12" fill="#FFFFFF" fontSize="10" y="15" x="14">
        {availableBikes}
      </Text>
    );
  }

  renderSvg(availableBikes) {
    return (
      <Svg width="30" height="30" viewBox="0 0 30 30">
        <G id="BikeRackMarker">
          <G id="Pin" fillRule="nonzero" fill="#F36E1F">
            <Circle id="Oval" cx="15" cy="15" r="15" />
          </G>
          <G id="Bike" x="6" y="3">
            <Ellipse fill="none" id="FrontWheel" stroke="#FFFFFF" strokeWidth="0.75" cx="3.2409846" cy="8.50489784" rx="3.22570056" ry="3.46849525" />
            <Ellipse fill="none" id="RearWheel" stroke="#FFFFFF" strokeWidth="0.75" cx="14.7613438" cy="8.44026748" rx="3.22570056" ry="3.46849525" />
            <Path d="M7.53826614,0.0268423461 C4.88224308,0.0546781232 5.33267967,-0.268215484 3.90370812,4.66983098 C2.73960065,8.61532645 2.86640018,8.18505572 2.86031193,8.46181089 C2.85604527,8.67681925 3.01745619,8.84729034 3.22028673,8.86188212 C3.64210428,8.81602099 3.46467828,8.91093606 4.92711414,4.02775532 C10.2708007,10.0891256 8.26598325,9.10621724 11.1417598,9.22931261 C14.9212862,9.19034286 15.2284808,9.4408638 15.2733518,8.84518064 C15.2681744,8.64290779 15.180158,8.52228669 12.5862641,2.31493407 L12.8347805,1.58007237 L13.6890573,1.56337091 L13.6579925,0.795106626 L10.4738711,0.795106626 C10.1925638,1.20893032 10.5877748,1.20707437 12.0115689,1.54666979 L11.7630521,2.29823226 L5.41034115,2.31493407 C5.83834221,0.707888444 5.59672887,0.808096541 7.52273412,0.811808094 L7.53826614,0.0268423461 Z M5.22677685,3.13864293 L11.4430301,3.12679144 L9.64648899,8.31766838 L5.22677685,3.13864293 Z M12.1925072,3.44677689 L14.286635,8.43618158 L10.4290311,8.42433044 L12.1925072,3.44677689 Z" id="Frame" fill="#FFFFFF" fillRule="nonzero" />
          </G>
          {this.renderText(availableBikes)}
        </G>
      </Svg>
    );
  }
  render() {
    const { availableBikes } = this.props;
    return this.renderSvg(availableBikes);
  }
}
