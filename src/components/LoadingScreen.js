import React, { Component, PropTypes } from 'react';
import { LoadingScreen as StyledLoadingScreen } from 'components/styled';
import CircularProgress from 'material-ui/CircularProgress';

export default class LoadingScreen extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
    loading: PropTypes.bool.isRequired,
    style: PropTypes.object
  };

  static defaultProps = {
    styles: {}
  };

  render() {
    const { loading, style, children } = this.props;

    // This will throw if there are many children
    if (!__SERVER__ && !loading) return React.Children.only(children);

    return (
      <StyledLoadingScreen style={style}>
        <CircularProgress size={60} thickness={7} />
      </StyledLoadingScreen>
    );
  }
}
