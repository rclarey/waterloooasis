import PropTypes from 'prop-types';
import React, { memo, useCallback, useContext, useMemo, useState } from 'react';

import 'public/Form.css';

const DEBOUNCE_TIMEOUT = 500;

const FormContext = React.createContext({
  info: {},
  onChange() {
    return;
  },
});

export function Form({ children, cta, names, onSubmit, noDisable = false }) {
  // initially all names are unvalidated
  const initialInfo = useMemo(() => {
    const map = {};
    for (const name of names) {
      map[name] = {
        valid: null,
        value: '',
      };
    }
    return map;
  }, [names]);

  // map of names to field info
  const [info, setInfo] = useState(initialInfo);
  // map of names to debounce timeouts
  const [, setDebounce] = useState({});

  const onChange = useCallback(
    (name, value, validator) => {
      setInfo(old => ({ ...old, [name]: { value, valid: null } }));

      if (!validator) {
        return;
      }

      const tid = setTimeout(async () => {
        const isValid = await validator(value);

        // another promise may have been started while we were waiting
        // so check current value is the same we validated
        setInfo(old => {
          if (value === old[name].value) {
            return { ...old, [name]: { value, valid: isValid } };
          } else {
            return old;
          }
        });
      }, DEBOUNCE_TIMEOUT);

      setDebounce(old => {
        clearTimeout(old[name]);
        return { ...old, [name]: tid };
      });
    },
    [names],
  );

  const guardSubmit = useCallback(
    e => {
      e.preventDefault();
      if (noDisable || names.every(name => !!info[name].valid)) {
        onSubmit(info);
      }
    },
    [names, info, onSubmit],
  );

  const buttonDisabled = !noDisable && !names.every(name => !!info[name].valid);

  return (
    <form onSubmit={guardSubmit}>
      <FormContext.Provider value={{ info, onChange }}>
        {children}
        <div className="form__row">
          <input
            className="form__submit"
            type="submit"
            disabled={buttonDisabled}
            value={cta}
          />
        </div>
      </FormContext.Provider>
    </form>
  );
}
Form.propTypes = {
  children: PropTypes.node.isRequired,
  cta: PropTypes.string.isRequired,
  names: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  onSubmit: PropTypes.func.isRequired,
  noDisable: PropTypes.bool,
};

function Row({ children, className = '' }) {
  return <div className={`form__row ${className}`}>{children}</div>;
}
Row.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
};

export const FormRow = memo(Row);

function FieldInner({ name, placeholder, setRef, type, validate }) {
  const { onChange, info } = useContext(FormContext);
  const { valid, value } = info[name];

  const handleChange = useCallback(
    e => {
      onChange(e.target.name, e.target.value, validate);
    },
    [validate],
  );

  const validityClass =
    valid === null ? '' : valid ? 'form__input--valid' : 'form__input--invalid';

  return (
    <input
      className={`form__input ${validityClass}`}
      type={type || 'text'}
      ref={setRef}
      name={name}
      onChange={handleChange}
      placeholder={placeholder}
      value={value}
    />
  );
}
FieldInner.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  setRef: PropTypes.func,
  type: PropTypes.string,
  validate: PropTypes.func,
};

export const Field = memo(FieldInner);
