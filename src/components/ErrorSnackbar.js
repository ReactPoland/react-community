import React, { PropTypes } from 'react';
import Snackbar from 'material-ui/Snackbar';

const style = {
  height: 'auto',
  padding: '8px 24px',
  backgroundColor: 'red',
  lineHeight: 1.5
};

const ErrorSnackbar = ({ open, message, autoHideDuration }) => {
  return (
    <Snackbar
      open={open}
      message={message}
      autoHideDuration={autoHideDuration}
      bodyStyle={style}
    />
  );
};

ErrorSnackbar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  autoHideDuration: PropTypes.number
};

ErrorSnackbar.defaultProps = {
  autoHideDuration: 5000
};

export default ErrorSnackbar;
