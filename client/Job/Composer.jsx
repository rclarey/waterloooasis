import React, { memo, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import OButton from 'oasisui/OButton.jsx';
import { post } from 'utils.js';

import 'Job/Composer.css';

function Composer({ jobId, companyId, patchComments }) {
  const inputRef = useRef(null);
  const [disabled, setDisabled] = useState(true);
  const [focussed, setFocussed] = useState(false);

  const onChange = useCallback(() => {
    if (inputRef.current.value.length > 0) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [setDisabled, inputRef.current]);

  const onSubmit = useCallback(async () => {
    try {
      const { comment } = await post('/comment', {
        jobId,
        companyId,
        text: inputRef.current.value,
      });
      inputRef.current.value = '';
      patchComments(comment);
    } catch (e) {
      // TODO: error handling
    }
  }, [inputRef.current]);

  return (
    <div
      className={classnames('composer__container', {
        'composer__container--active': focussed,
      })}
    >
      <textarea
        placeholder="What are your thoughts?"
        ref={inputRef}
        onChange={onChange}
        onFocus={setFocussed.bind(null, true)}
        onBlur={setFocussed.bind(null, false)}
        className="composer__textarea"
      />
      <div className="composer__buttons">
        <OButton text="Comment" disabled={disabled} onClick={onSubmit} />
      </div>
    </div>
  );
}
Composer.propTypes = {
  jobId: PropTypes.number.isRequired,
  companyId: PropTypes.number.isRequired,
  patchComments: PropTypes.func.isRequired,
};

export default memo(Composer);
