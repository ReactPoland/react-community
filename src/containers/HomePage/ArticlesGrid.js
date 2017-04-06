import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
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

const mappedActions = { loadArticles };

@connect(mappedState, mappedActions)
class ArticlesGrid extends Component {
  static propTypes = {
    articles: PropTypes.array.isRequired,
    loadArticles: PropTypes.func.isRequired,
    loadingArticles: PropTypes.bool.isRequired,
    articlesLoaded: PropTypes.bool.isRequired
  }

  componentWillMount() {
    if (!this.props.articlesLoaded) this.props.loadArticles();
  }

  render() {
    return (
      <LoadingScreen loading={this.props.loadingArticles}>
        <Row>
          {
            this.props.articles.map((article) => {
              const date = moment(article.createdAt).format('dddd, MMMM Do YYYY, h:mm:ss a');
              return (
                <Col key={article.id} md={6}>
                  <MockCard
                    title={article.size + ' ' + article.title}
                    subtitle={date}
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
