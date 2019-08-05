import React, { memo } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';

import 'shared/Modal.css';

function blockClick(e) {
  e.stopPropagation();
}

function Modal({ children, close }) {
  return createPortal(
    <div
      className="modal__opaquer"
      onClick={() => {
        close();
      }}
    >
      <div className="modal__body" onClick={blockClick}>
        {children}
      </div>
    </div>,
    document.getElementById('app'),
  );
}
Modal.propTypes = {
  close: PropTypes.func.isRequired,
  children: PropTypes.node,
};

export default memo(Modal);
