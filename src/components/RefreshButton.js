import React, { PropTypes } from 'react';
import FlatButton from 'material-ui/FlatButton';
import RefreshIcon from 'material-ui/svg-icons/navigation/refresh';

const RefreshButton = (props) => (
  <FlatButton
    secondary
    icon={<RefreshIcon />}
    label={props.label}
    labelPosition="before"
    onClick={props.onClick}
  />
);

RefreshButton.propTypes = {
  label: PropTypes.string,
  onClick: PropTypes.func.isRequired
};

RefreshButton.defaultProps = {
  label: 'Refresh'
};

export default RefreshButton;
