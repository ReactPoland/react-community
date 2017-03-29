// --- LOAD ---
const LOAD_ARTICLES_REQUEST = 'LOAD_ARTICLES_REQUEST';
const LOAD_ARTICLES_SUCCESS = 'LOAD_ARTICLES_SUCCESS';
const LOAD_ARTICLES_FAIL = 'LOAD_ARTICLES_FAIL';
const CLEAR_LOAD_ARTICLES_ERROR = 'CLEAR_LOAD_ARTICLES_ERROR';
// --- ADD ---
const ADD_ARTICLE_REQUEST = 'ADD_ARTICLE_REQUEST';
const ADD_ARTICLE_SUCCESS = 'ADD_ARTICLE_SUCCESS';
const ADD_ARTICLE_FAIL = 'ADD_ARTICLE_FAIL';
const CLEAR_ADD_ARTICLE_ERROR = 'CLEAR_ADD_ARTICLE_ERROR';
// --- REMOVE ---
const REMOVE_ARTICLE_REQUEST = 'REMOVE_ARTICLE_REQUEST';
const REMOVE_ARTICLE_SUCCESS = 'REMOVE_ARTICLE_SUCCESS';
const REMOVE_ARTICLE_FAIL = 'REMOVE_ARTICLE_FAIL';
const CLEAR_REMOVE_ARTICLE_ERROR = 'CLEAR_REMOVE_ARTICLE_ERROR';

const initialState = {
  // Loading all articles
  articles: [],
  loadingArticles: false,
  articlesLoaded: false,
  loadArticlesError: '',
  // Adding new article
  addingArticle: false,
  articleAdded: false,
  addArticleError: '',
  // Removing a article
  removingArticle: null, // ID of an article being removed
  articleRemoved: false,
  removeArticleError: ''
};

export default function articleModule(state = initialState, action = {}) {
  switch (action.type) {
    // --- LOAD ---
    case LOAD_ARTICLES_REQUEST:
      return {
        ...state,
        articlesLoaded: false,
        loadingArticles: true,
        loadArticlesError: ''
      };
    case LOAD_ARTICLES_SUCCESS:
      return {
        ...state,
        loadingArticles: false,
        articlesLoaded: true,
        articles: action.result.message
      };
    case LOAD_ARTICLES_FAIL:
      return {
        ...state,
        loadingArticles: false,
        articlesLoaded: false,
        loadArticlesError: action.error
      };
    case CLEAR_LOAD_ARTICLES_ERROR:
      return {
        ...state,
        loadArticlesError: ''
      };
      // --- ADD ---
    // --- ADD ---
    case ADD_ARTICLE_REQUEST:
      return {
        ...state,
        articleAdded: false,
        addingArticle: true,
        addArticleError: ''
      };
    case ADD_ARTICLE_SUCCESS:
      return {
        ...state,
        articles: [
          ...state.articles,
          action.result.message
        ],
        addingArticle: false,
        articleAdded: true
      };
    case ADD_ARTICLE_FAIL:
      return {
        ...state,
        addingArticle: false,
        articleAdded: false,
        addArticleError: action.error
      };
    case CLEAR_ADD_ARTICLE_ERROR:
      return {
        ...state,
        addArticleError: ''
      };
    // --- REMOVE ---
    case REMOVE_ARTICLE_REQUEST:
      return {
        ...state,
        articleRemoved: false,
        removingArticle: action.payload.articleId,
        removeArticleError: ''
      };
    case REMOVE_ARTICLE_SUCCESS:
      return {
        ...state,
        articles: state.articles.filter(article => article.id !== action.payload.articleId),
        removingArticle: null,
        articleRemoved: true
      };
    case REMOVE_ARTICLE_FAIL:
      return {
        ...state,
        removingArticle: null,
        articleRemoved: false,
        removeArticleError: action.error
      };
    case CLEAR_REMOVE_ARTICLE_ERROR:
      return {
        ...state,
        removeArticleError: ''
      };
    default:
      return state;
  }
}

// --- LOAD ---
export function loadArticles() {
  return {
    types: [LOAD_ARTICLES_REQUEST, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_FAIL],
    promise: (client) => client.get('/map/loadArticles')
  };
}

export const clearLoadArticlesError = () => ({ type: CLEAR_LOAD_ARTICLES_ERROR });

// --- ADD ---
export function addArticle(article) {
  return {
    types: [ADD_ARTICLE_REQUEST, ADD_ARTICLE_SUCCESS, ADD_ARTICLE_FAIL],
    promise: (client) => client.post('/map/addArticle', { data: article })
  };
}

export const clearAddArticleError = () => ({ type: CLEAR_ADD_ARTICLE_ERROR });

// --- REMOVE ---
export function removeArticle(articleId) {
  return {
    types: [REMOVE_ARTICLE_REQUEST, REMOVE_ARTICLE_SUCCESS, REMOVE_ARTICLE_FAIL],
    payload: { articleId },
    promise: (client) => client.post('/map/removeArticle', { data: { id: articleId } })
  };
}

export const clearRemoveArticleError = () => ({ type: CLEAR_REMOVE_ARTICLE_ERROR });
