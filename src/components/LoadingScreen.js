import React, { Component, PropTypes } from 'react';
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
    const styles = require('./LoadingScreen.scss');

    // This will throw if there are many children
    if (!__SERVER__ && !loading) return React.Children.only(children);

    return (
      <div className={styles.LoadingScreen} style={style}>
        <CircularProgress size={60} thickness={7} />
      </div>
    );
  }
}
