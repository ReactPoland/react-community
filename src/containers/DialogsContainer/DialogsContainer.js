import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import * as dialogActions from 'redux/modules/dialogModule';
import { LoginDialog } from 'containers';

const mappedState = ({ dialog }) => ({
  openedDialog: dialog.openedDialog,
  dialogProps: dialog.dialogProps,
});

@connect(mappedState, dialogActions)
class DialogsContainer extends Component {
  static propTypes = {
    openedDialog: PropTypes.string,
    dialogProps: PropTypes.object,
    openDialog: PropTypes.func.isRequired,
    closeDialog: PropTypes.func.isRequired
  }

  state = {
    open: false
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.openedDialog && (!this.props.openedDialog || nextProps.openedDialog !== this.props.openedDialog)) {
      setTimeout(() => { this.setState({ open: true }); });
    }
  }

  handleClose = () => {
    this.setState({ open: false });
    setTimeout(this.props.closeDialog, 500);
  }

  render() {
    const { openedDialog, dialogProps } = this.props;

    switch (openedDialog) {
      case 'LoginDialog': return <LoginDialog dialogProps={dialogProps} dialogOpened={this.state.open} closeDialog={this.handleClose} />;
      default: return null;
    }
  }
}

export default DialogsContainer;
