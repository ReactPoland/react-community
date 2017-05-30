import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
// import _isEmpty from 'lodash/isEmpty';
// import _startsWith from 'lodash/startsWith';
// import AddLocationForm from './AddLocationForm';

class ProposeTopicBody extends Component {
  static propTypes = {
    // open: PropTypes.bool.isRequired,
    closePopup: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  state = {
    topicName: '',
    validate: false
  }

  onChangeTopic = (ev) => {
    this.setState({
      topicName: ev.target.value,
      validate: this.check({ topicName: ev.target.value })
    });
  }

  onSubmit = () => {
    this.props.onSubmit(this.state.topicName);
  }

  check = ({ topicName }) => {
    if (topicName.length > 0) return true;
    return false;
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        key="cancel"
        primary
        onTouchTap={this.props.closePopup}
      />,
      <FlatButton
        label="Propose"
        key="propose"
        disabled={!this.state.validate}
        style={{ marginLeft: 8 }}
        primary
        onTouchTap={this.onSubmit}
      />
    ];

    return (
      <div>
        <div style={{margin: 15, display: 'flex', flexDirection: 'column'}}>
          <label>Please type topic:</label>
          <input style={{flex: 1}} type="text" onChange={this.onChangeTopic} value={this.state.topicName} />
        </div>
        <div style={{float: 'right'}}>
          {actions}
        </div>
      </div>
    );
  }
}

export default ProposeTopicBody;
