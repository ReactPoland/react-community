import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import { descendingBy } from 'utils';
import { push } from 'react-router-redux';
// LAYOUT
import Row from 'react-bootstrap/lib/Row';
import Col from 'react-bootstrap/lib/Col';
import { MockCard } from 'components/mocked';
// STORE
import { loadArticles } from 'redux/modules/articlesModule';
// COMPONENTS
import { LoadingScreen } from 'components';

const mappedState = ({ articles }) => ({
  articles: articles.all,
  loadingArticles: articles.loadingArticles,
  articlesLoaded: articles.articlesLoaded,
});

const mappedActions = {
  loadArticles,
  pushState: push
};

@connect(mappedState, mappedActions)
class ArticlesGrid extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    loadArticles: PropTypes.func.isRequired,
    loadingArticles: PropTypes.bool.isRequired,
    articlesLoaded: PropTypes.bool.isRequired,
    pushState: PropTypes.func.isRequired
  }

  componentWillMount() {
    if (!this.props.articlesLoaded) this.props.loadArticles();
  }

  redirectToArticle = (articleId) => {
    this.props.pushState(`/article/${articleId}`);
  }

  render() {
    return (
      <LoadingScreen loading={this.props.loadingArticles}>
        <Row>
          {
            this.props.articles.sort(descendingBy('size')).map((article) => {
              const date = moment(article.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
              return (
                <Col key={article.id} md={article.size}>
                  <MockCard
                    title={article.title}
                    subtitle={date}
                    onClick={() => this.redirectToArticle(article.id)}
                    style={{ cursor: 'pointer' }}
                  />
                </Col>
              );
            })
          }
        </Row>
      </LoadingScreen>
    );
  }
}

export default ArticlesGrid;
