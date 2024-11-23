import React from 'react';
import PropTypes from 'prop-types';

function Scrollbar({ children, height }) {
  return (
    <div style={{ minHeight: '90vh', maxHeight: height ? height : '65vh', overflow: 'scroll', margin: 0, padding: 0 }}>{children}</div>
  );
}

Scrollbar.propTypes = {
  children: PropTypes.node,
  height: PropTypes.string
};

export default Scrollbar;
