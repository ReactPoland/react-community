import React, { PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';

const style = {
  height: 'auto',
  padding: '8px 24px',
  backgroundColor: 'green',
  lineHeight: 1.5
};

const ErrorSnackbar = ({ open, message, autoHideDuration, onRequestClose }) => {
  return (
    <Snackbar
      open={open}
      message={message}
      autoHideDuration={autoHideDuration}
      onRequestClose={onRequestClose}
      bodyStyle={style}
    />
  );
};

ErrorSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number,
  onRequestClose: PropTypes.func
};

ErrorSnackbar.defaultProps = {
  autoHideDuration: 5000,
  onRequestClose: () => {}
};

export default ErrorSnackbar;
