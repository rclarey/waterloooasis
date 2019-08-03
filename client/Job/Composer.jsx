import React, { Suspense, memo, useCallback, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

import OButton from 'oasisui/OButton.jsx';

import 'Job/Composer.css';

function Composer() {
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

  const onSubmit = useCallback(() => {
    alert(inputRef.current.value);
  }, [inputRef.current]);

  return (
    <div
      className={classnames('composer__container', {
        'composer__container--active': focussed,
      })}
    >
      <textarea
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

export default memo(Composer);
