import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import 'oasisui/ODropdown.css';

function OCombobox({
  options,
  prompt,
  identifier,
}) {

  return (
    <>
      <div className='odropdown__container' >
        <Autocomplete
          style={{fontSize: '16px'}}
          id={identifier}
          options={options}
          renderInput={params => (
            <TextField {...params} label={prompt} margin="normal" variant="outlined" fullWidth />
          )}
        />
      </div>
    </>
  );
}
OCombobox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  prompt: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
};

export default memo(OCombobox);