import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
// COMPONENTS
import { SuccessSnackbar } from 'components';

const mappedState = ({ articles }) => ({
  articleAdded: articles.articleAdded,
  articleEdited: articles.articleEdited,
  articleRemoved: articles.articleRemoved
});

const mappedActions = {
  pushState: push
};

@connect(mappedState, mappedActions)
class SuccessHandler extends Component {
  static propTypes = {
    articleAdded: PropTypes.number,
    articleEdited: PropTypes.bool.isRequired,
    articleRemoved: PropTypes.bool.isRequired,
    pushState: PropTypes.func.isRequired
  }

  state = { successMessage: null }

  componentWillReceiveProps(nextProps) {
    // When article was successfully added...
    if (nextProps.articleAdded !== null && nextProps.articleAdded !== this.props.articleAdded) {
      this.setState({ successMessage: 'Article added' });
      this.props.pushState(`/article/${nextProps.articleAdded}`);
    }

    // When article was successfully updated...
    if (nextProps.articleEdited !== this.props.articleEdited) {
      this.setState({ successMessage: 'Article updated' });
    }

    // When article was removed...
    if (nextProps.articleRemoved === true && nextProps.articleRemoved !== this.props.articleRemoved) {
      this.setState({ successMessage: 'Article removed' });
      this.props.pushState('/articles');
    }
  }

  clearSuccessMessage = () => {
    this.setState({ successMessage: null });
  }

  render() {
    return (
      <SuccessSnackbar
        open={this.state.successMessage !== null}
        message={this.state.successMessage}
        onRequestClose={this.clearSuccessMessage}
      />
    );
  }
}

export default SuccessHandler;
