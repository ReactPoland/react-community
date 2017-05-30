import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Dialog from 'material-ui/Dialog';
// import FlatButton from 'material-ui/FlatButton';
// import _isEmpty from 'lodash/isEmpty';
// import _startsWith from 'lodash/startsWith';
import ProposeTopicBody from './ProposeTopicBody';

class ProposeTopicDialog extends Component {
  static propTypes = {
    open: PropTypes.bool.isRequired,
    closePopup: PropTypes.func.isRequired,
    onSubmit: PropTypes.func.isRequired
  }

  render() {
    const { open } = this.props;
    // const { validationErrors } = this.state;
    // const actions = [
    //   <FlatButton
    //     label="Cancel"
    //     primary
    //     onTouchTap={this.props.closePopup}
    //   />,
    //   <FlatButton
    //     label="Propose"
    //     style={{ marginLeft: 8 }}
    //     primary
    //     onTouchTap={this.addMarker}
    //   />
    // ];

    return (
      <Dialog
        contentStyle={{ maxWidth: 500 }}
        titleStyle={{ paddingBottom: 0 }}
        title="Propose Topic"
        open={open}
        onRequestClose={this.closePopup}
        autoScrollBodyContent
      >
        { open && <ProposeTopicBody
          closePopup={this.props.closePopup}
          onSubmit={this.props.onSubmit}/> }
      </Dialog>
    );
  }
}

export default ProposeTopicDialog;
