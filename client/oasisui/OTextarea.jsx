import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';

import 'oasisui/OTextarea.css';

function OTextarea({
  rowsMin,
  prompt,
  identifier,
}) {

  return (
    <>
      <div className='otextarea__container' >
        <TextareaAutosize
          style={{width: '100%', fontSize: '16px'}}
          rowsMin={rowsMin}
          identifier={identifier}
          placeholder={prompt}
        />
      </div>
    </>
  );
}
OTextarea.propTypes = {
  rowsMin: PropTypes.number.isRequired,
  prompt: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
};

export default OTextarea;