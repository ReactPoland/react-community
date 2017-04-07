import React, { Component } from 'react';
import { connect } from 'react-redux';
// STORE
import { clearLoadArticlesError, clearAddArticleError, clearEditArticleError, clearRemoveArticleError } from 'redux/modules/articlesModule';
import { clearLoadMapMarkersError, clearAddMapMarkerError, clearRemoveMarkerError } from 'redux/modules/mapModule';
import { clearLoadConversationError } from 'redux/modules/conversationModule';
import { clearLoadUsersError } from 'redux/modules/usersModule';
// COMPONENTS
import { ErrorSnackbar } from 'components';

const errorsArray = [
  { name: 'loadArticlesError', callback: 'clearLoadArticlesError' },
  { name: 'addArticleError', callback: 'clearAddArticleError' },
  { name: 'editArticleError', callback: 'clearEditArticleError' },
  { name: 'removeArticleError', callback: 'clearRemoveArticleError' },
  { name: 'loadConversationError' },
  { name: 'loadMapMarkersError', callback: 'clearLoadMapMarkersError' },
  { name: 'addMapMarkerError', callback: 'clearAddMapMarkerError' },
  { name: 'removeMapMarkerError', callback: 'clearRemoveMarkerError' },
  { name: 'loadUsersError', callback: 'clearLoadUsersError' }
];

const mappedState = ({ articles, conversation, map, users }) => ({
  loadArticlesError: articles.loadArticlesError,
  addArticleError: articles.addArticleError,
  editArticleError: articles.editArticleError,
  removeArticleError: articles.removeArticleError,
  loadConversationError: conversation.loadConversationError,
  loadMapMarkersError: map.loadMapMarkersError,
  addMapMarkerError: map.addMapMarkerError,
  removeMapMarkerError: map.removeMapMarkerError,
  loadUsersError: users.loadUsersError
});

const mappedActions = {
  clearLoadArticlesError,
  clearAddArticleError,
  clearEditArticleError,
  clearRemoveArticleError,
  clearLoadConversationError,
  clearLoadMapMarkersError,
  clearAddMapMarkerError,
  clearRemoveMarkerError,
  clearLoadUsersError
};

@connect(mappedState, mappedActions)
class ErrorHandler extends Component {
  state = {
    errorMessage: null,
    errorCallback: null
  }

  componentWillMount() {
    this.checkErrors(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkErrors(nextProps);
  }

  checkErrors = (props) => {
    // Show error snackbar if any of the errors from "errorsArray" is thrown
    errorsArray.forEach(({ name, callback }) => {
      if (props[name]) {
        this.setState({
          errorMessage: props[name],
          errorCallback: props[callback]
        });
      }
    });
  }

  clearErrors = () => {
    if (this.state.errorCallback) this.state.errorCallback();
    this.setState({ errorMessage: null, errorCallback: null });
  }

  render() {
    return (
      <ErrorSnackbar
        open={this.state.errorMessage !== null}
        message={this.state.errorMessage}
        onRequestClose={this.clearErrors}
      />
    );
  }
}

export default ErrorHandler;
