import React from 'react';
import App from 'BikeShare/App';

import { shallow } from 'enzyme';

it('renders without crashing', () => {
  const rendered = shallow(<App />);
  expect(rendered).toMatchSnapshot();
});
