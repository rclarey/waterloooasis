import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';

import 'oasisui/OTextField.css';

function OTextField({
  prompt,
  identifier,
}) {
  return (
    <>
      <div className='otextfield__container' >
        <TextField
          id={identifier}
          label={prompt}
          fullWidth
          variant="outlined"
          style={{fontSize: '16px'}}
        />
      </div>
    </>
  );
}
OTextField.propTypes = {
  prompt: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
};

export default memo(OTextField);