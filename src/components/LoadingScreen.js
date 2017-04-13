import React, { PropTypes } from 'react';
import { Spinner } from 'components';

const LoadingScreen = (props) => (
  !__SERVER__ && !props.loading
    ? React.Children.only(props.children) // This will throw if there are many children
    : <Spinner style={props.style} />
);

LoadingScreen.propTypes = {
  children: PropTypes.element.isRequired,
  loading: PropTypes.bool.isRequired,
  style: PropTypes.object
};

LoadingScreen.defaultProps = {
  style: {}
};

export default LoadingScreen;
