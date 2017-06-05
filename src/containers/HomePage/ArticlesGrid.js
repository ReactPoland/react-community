import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';
import { descendingBy } from 'utils';
import { push } from 'react-router-redux';
import _startsWith from 'lodash/startsWith';
// STORE
import { loadArticles } from 'redux/modules/articlesModule';
// COMPONENTS
import { LoadingScreen } from 'components';
// LAYOUT
import { Card, CardTitle, CardText, CardMedia } from 'material-ui/Card';
import styles from './ArticlesGrid.scss';

const mappedState = ({ articles }) => ({
  articles: articles.all,
  loadingArticles: articles.loadingArticles,
  articlesLoaded: articles.articlesLoaded
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
  };

  componentWillMount() {
    if (!this.props.articlesLoaded) this.props.loadArticles();
  }

  redirectToArticle = article => {
    if (article.type === 'external') {
      const link = _startsWith(article.link, 'http')
        ? article.link
        : 'http://' + article.link;
      const win = window.open(link, '_blank');
      win.focus();
    } else {
      this.props.pushState(`/article/${article.id}/${article.slug}`);
    }
  };

  render() {
    return (
      <LoadingScreen loading={this.props.loadingArticles}>
        <div className={styles.ArticlesGrid}>
          {this.props.articles.sort(descendingBy('size')).map(article => {
            const date = moment(article.createdAt).format('MMMM Do YYYY');

            return (
              <div
                key={article.id}
                className={styles.GridItem}
                style={{ width: article.previewSize[0] * 50 + '%' }}
              >
                <Card
                  style={{ cursor: 'pointer', marginBottom: 16 }}
                  onClick={() => this.redirectToArticle(article)}
                >
                  {article.coverImageUrl &&
                    <CardMedia
                      className={styles.MediaOverlay}
                      overlay={
                        <CardTitle title={article.title} subtitle={date} />
                      }
                    >
                      <img src={article.coverImageUrl} />
                    </CardMedia>}
                  <CardText>
                    <p>{article.description}</p>
                    {article.link &&
                      <p>
                        Go to: {article.link}
                        {' '}<i className="fa fa-external-link" />
                      </p>}
                  </CardText>
                </Card>
              </div>
            );
          })}
        </div>
      </LoadingScreen>
    );
  }
}

export default ArticlesGrid;
