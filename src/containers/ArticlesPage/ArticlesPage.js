import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

export default class ArticlesPage extends Component {
  render() {
    const styles = require('./ArticlesPage.scss');

    return (
      <Paper className={styles.container} zDepth={2}>
        <h1>Articles</h1>
      </Paper>
    );
  }
}
