import React, { memo, useState } from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';

function ORadioButton({
  options,
  identifier,
}) {

  const [value, setValue] = useState('1');

  const handleChange = event => {
    setValue(event.target.value);
  };


  return (
    <>
      <div className='otextarea__container' >
        <FormControl component="fieldset">
          <RadioGroup defaultValue={value} name="customized-radios" onChange={handleChange}>
            {options.map(option => (
              <FormControlLabel
                value={option.value}
                control={<Radio color="primary" />}
                label={option.label}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </div>
    </>
  );
}
ORadioButton.propTypes = {
  options: PropTypes.arrayOf(PropTypes.object).isRequired,
  identifier: PropTypes.string.isRequired,
};

export default ORadioButton;