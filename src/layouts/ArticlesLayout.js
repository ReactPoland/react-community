import React, { Component, PropTypes } from 'react';

class ArticlesLayout extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired
  }

  render() {
    const styles = require('./ArticlesLayout.scss');

    return (
      <div className={styles.ArticlesLayout}>
        {this.props.children}
      </div>
    );
  }
}

export default ArticlesLayout;
