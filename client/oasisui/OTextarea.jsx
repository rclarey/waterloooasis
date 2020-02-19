import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Autocomplete from '@material-ui/lab/Autocomplete';

import 'oasisui/OTextarea.css';

function OTextarea({
  rowsMin,
  prompt,
  identifier,
  maxLength,
}) {

  const [charStr, setCharStr] = useState( '' + maxLength + ' characters remaining' );

  const handleInput = event => {
    setCharStr('' + (maxLength - event.currentTarget.value.length) + ' characters remaining' );
  };

  return (
    <>
      <div className='otextarea__container' >
        <TextareaAutosize
          style={{width: '100%', fontSize: '16px'}}
          rowsMin={rowsMin}
          identifier={identifier}
          placeholder={prompt}
          maxLength= { "" + maxLength }
          onInput={handleInput}
        />
        <p className="otextarea__charlimit">{charStr} </p>
      </div>
    </>
  );
}
OTextarea.propTypes = {
  rowsMin: PropTypes.number.isRequired,
  prompt: PropTypes.string.isRequired,
  identifier: PropTypes.string.isRequired,
  maxLength:PropTypes.number.isRequired,
};

export default OTextarea;