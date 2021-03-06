import React, { memo, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import OButton from 'oasisui/OButton.jsx';
import { maskSetState, post } from 'utils.js';

import 'Job/Composer.css';

function Composer({
  jobId,
  companyId,
  parentId = null,
  patchComments,
  width = 978,
}) {
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
        parentId,
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
        style={{ width: `${width}px` }}
        placeholder="What are your thoughts?"
        ref={inputRef}
        onChange={onChange}
        onFocus={maskSetState.bind(null, setFocussed, true)}
        onBlur={maskSetState.bind(null, setFocussed, false)}
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
  parentId: PropTypes.number,
  width: PropTypes.number,
};

export default memo(Composer);
