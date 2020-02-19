import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

function OCombobox({
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
          options={top100Films.map(option => option.title)}
          renderInput={params => (
            <TextField {...params} label={prompt} margin="normal" variant="outlined" fullWidth />
          )}
        />
      </div>
    </>
  );
}
OCombobox.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string.isRequired),
  prompt: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
};

export default OCombobox;