import React from 'react';
import PropTypes from 'prop-types';
import MainComponent from 'BikeShare/components/Main';

const MainContainer = ({ history }) => {
  return (
    <MainComponent history={history} />
  );
};

MainContainer.propTypes = {
  history: PropTypes.object
};

export default MainContainer;
