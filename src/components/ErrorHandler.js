import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// STORE
import { clearLoadArticlesError, clearAddArticleError, clearEditArticleError, clearRemoveArticleError } from 'redux/modules/articlesModule';
import { clearLoadConversationError } from 'redux/modules/conversationModule';
// COMPONENTS
import { ErrorSnackbar } from 'components';

const errorsArray = [
  { name: 'loadArticlesError', callback: 'clearLoadArticlesError' },
  { name: 'addArticleError', callback: 'clearAddArticleError' },
  { name: 'editArticleError', callback: 'clearEditArticleError' },
  { name: 'removeArticleError', callback: 'clearRemoveArticleError' },
  { name: 'loadConversationError' }
];

const mappedState = ({ articles, conversation }) => ({
  loadArticlesError: articles.loadArticlesError,
  addArticleError: articles.addArticleError,
  editArticleError: articles.editArticleError,
  removeArticleError: articles.removeArticleError,
  loadConversationError: conversation.loadConversationError
});

const mappedActions = {
  clearLoadArticlesError,
  clearAddArticleError,
  clearEditArticleError,
  clearRemoveArticleError,
  clearLoadConversationError
};

@connect(mappedState, mappedActions)
class ErrorHandler extends Component {
  static propTypes = {
    loadArticlesError: PropTypes.string,
    addArticleError: PropTypes.string,
    editArticleError: PropTypes.string,
    removeArticleError: PropTypes.string,
    loadConversationError: PropTypes.string,
    clearLoadArticlesError: PropTypes.func.isRequired,
    clearAddArticleError: PropTypes.func.isRequired,
    clearEditArticleError: PropTypes.func.isRequired,
    clearRemoveArticleError: PropTypes.func.isRequired,
    clearLoadConversationError: PropTypes.func.isRequired
  }

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
      // if (props[name] && !this.props[name]) {
      if (props[name]) {
        console.warn('show error', name);
        this.setState({
          errorMessage: props[name],
          errorCallback: props[callback]
        });
      }
    });
  }

  clearErrors = () => {
    console.warn('hide error', this.state.errorMessage);
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
