import React from 'react';
import PropTypes from 'prop-types';

function Company({ shortName }) {
  return <p>`Company: ${shortName}`</p>;
}
Company.propTypes = {
  shortName: PropTypes.string.isRequired,
};

export default Company;
