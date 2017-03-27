import React from 'react';
import CircularProgress from 'material-ui/CircularProgress';

const Spinner = () => {
  const styles = require('./Spinner.scss');

  return (
    <div className={styles.container}>
      <CircularProgress size={60} thickness={7} />
    </div>
  );
};

export default Spinner;
