import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

import 'oasisui/ODropdown.css';

function ODropdown({
  options,
  prompt,
  identifier,
}) {

  const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },
    { title: 'The Godfather: Part II', year: 1974 },
  ];

  return (
    <>
      <div className='odropdown__container' >
        <Autocomplete
          style={{fontSize: '16px'}}
          id={identifier}
          freeSolo
          options={options}
          renderInput={params => (
            <TextField {...params} label={prompt} margin="normal" variant="outlined" fullWidth />
          )}
        />
      </div>
    </>
  );
}
ODropdown.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  prompt: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
};


export default ODropdown;
