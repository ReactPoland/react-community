import React, { Component } from 'react';

export default class World extends Component {
  render() {
    const styles = require('./World.scss');
    return (
      <div className={styles.worldPage + ' container'}>
        <h1>World</h1>
        <p>Here will be the map component</p>
      </div>
    );
  }
}
