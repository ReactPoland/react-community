import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// COMPONENTS
import { SuccessSnackbar } from 'components';

const mappedState = ({ articles }) => ({
  articleAdded: articles.articleAdded,
  articleEdited: articles.articleEdited,
  articleRemoved: articles.articleRemoved
});

const mappedActions = { redirect: push };

@connect(mappedState, mappedActions)
export default class SuccessHandler extends Component {
  static propTypes = {
    articleAdded: PropTypes.object,
    articleEdited: PropTypes.bool.isRequired,
    articleRemoved: PropTypes.bool.isRequired,
    redirect: PropTypes.func.isRequired
  }

  state = { successMessage: null }

  componentWillReceiveProps(nextProps) {
    // When article was successfully added...
    if (nextProps.articleAdded !== null && nextProps.articleAdded !== this.props.articleAdded) {
      this.setState({ successMessage: 'Article added' });
      this.props.redirect(`/article/${nextProps.articleAdded.id}/${nextProps.articleAdded.slug}`);
    }

    // When article was successfully updated...
    if (nextProps.articleEdited !== this.props.articleEdited) {
      this.setState({ successMessage: 'Article updated' });
    }

    // When article was removed...
    if (nextProps.articleRemoved === true && nextProps.articleRemoved !== this.props.articleRemoved) {
      this.setState({ successMessage: 'Article removed' });
      this.props.redirect('/articles');
    }
  }

  clearSuccessMessage = () => {
    this.setState({ successMessage: null });
  }

  render = () => (
    <SuccessSnackbar
      open={this.state.successMessage !== null}
      message={this.state.successMessage}
      onRequestClose={this.clearSuccessMessage}
    />
  )
}
