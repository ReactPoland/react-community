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
// --- EDIT ---
const EDIT_ARTICLE_REQUEST = 'EDIT_ARTICLE_REQUEST';
const EDIT_ARTICLE_SUCCESS = 'EDIT_ARTICLE_SUCCESS';
const EDIT_ARTICLE_FAIL = 'EDIT_ARTICLE_FAIL';
const CLEAR_EDIT_ARTICLE_ERROR = 'CLEAR_EDIT_ARTICLE_ERROR';
// --- REMOVE ---
const REMOVE_ARTICLE_REQUEST = 'REMOVE_ARTICLE_REQUEST';
const REMOVE_ARTICLE_SUCCESS = 'REMOVE_ARTICLE_SUCCESS';
const REMOVE_ARTICLE_FAIL = 'REMOVE_ARTICLE_FAIL';
const CLEAR_REMOVE_ARTICLE_ERROR = 'CLEAR_REMOVE_ARTICLE_ERROR';

const initialState = {
  // Loading all articles
  all: [],
  loadingArticles: false,
  articlesLoaded: false,
  loadArticlesError: null,
  // Adding new article
  addingArticle: false,
  articleAdded: null, // (Number) ID of an article that was just added
  addArticleError: null,
  // Editing article
  editingArticle: false,
  articleEdited: false,
  editArticleError: null,
  // Removing a article
  removingArticle: null, // (Number) ID of an article being removed
  articleRemoved: false,
  removeArticleError: null
};

export default function articlesModule(state = initialState, action = {}) {
  switch (action.type) {
    // --- LOAD ---
    case LOAD_ARTICLES_REQUEST:
      return {
        ...state,
        articlesLoaded: false,
        loadingArticles: true,
        loadArticlesError: null
      };
    case LOAD_ARTICLES_SUCCESS:
      return {
        ...state,
        all: action.result.message.map(article => ({ ...article, content: JSON.parse(article.content) })),
        loadingArticles: false,
        articlesLoaded: true
      };
    case LOAD_ARTICLES_FAIL:
      return {
        ...state,
        loadingArticles: false,
        articlesLoaded: false,
        loadArticlesError: `Error while loading articles: ${action.error.message}`
      };
    case CLEAR_LOAD_ARTICLES_ERROR:
      return {
        ...state,
        loadArticlesError: null
      };
      // --- ADD ---
    // --- ADD ---
    case ADD_ARTICLE_REQUEST:
      return {
        ...state,
        articleAdded: null,
        addingArticle: true,
        addArticleError: null
      };
    case ADD_ARTICLE_SUCCESS:
      return {
        ...state,
        all: [
          ...state.all,
          {
            ...action.result.message,
            content: JSON.parse(action.result.message.content)
          }
        ],
        addingArticle: false,
        articleAdded: action.result.message.id
      };
    case ADD_ARTICLE_FAIL:
      return {
        ...state,
        addingArticle: false,
        articleAdded: null,
        addArticleError: `Error while adding an article: ${action.error.message}`
      };
    case CLEAR_ADD_ARTICLE_ERROR:
      return {
        ...state,
        addArticleError: null
      };
    // --- EDIT ---
    case EDIT_ARTICLE_REQUEST:
      return {
        ...state,
        articleEdited: false,
        editingArticle: true,
        editArticleError: null
      };
    case EDIT_ARTICLE_SUCCESS:
      return {
        ...state,
        // TODO: uncomment this line when API starts returning edited article
        // all: state.all.map(article => article.id === action.payload.articleId ? action.result.message : article),
        all: state.all.map(article => article.id === action.payload.articleId ? action.payload.article : article),
        editingArticle: false,
        articleEdited: true
      };
    case EDIT_ARTICLE_FAIL:
      return {
        ...state,
        editingArticle: false,
        articleEdited: false,
        editArticleError: `Error while editing an article: ${action.error.message}`
      };
    case CLEAR_EDIT_ARTICLE_ERROR:
      return {
        ...state,
        editArticleError: null
      };
    // --- REMOVE ---
    case REMOVE_ARTICLE_REQUEST:
      return {
        ...state,
        articleRemoved: false,
        removingArticle: action.payload.articleId,
        removeArticleError: null
      };
    case REMOVE_ARTICLE_SUCCESS:
      return {
        ...state,
        all: state.all.filter(article => article.id !== action.payload.articleId),
        removingArticle: null,
        articleRemoved: true
      };
    case REMOVE_ARTICLE_FAIL:
      return {
        ...state,
        removingArticle: null,
        articleRemoved: false,
        removeArticleError: `Error while deleting an article: ${action.error.message}`
      };
    case CLEAR_REMOVE_ARTICLE_ERROR:
      return {
        ...state,
        removeArticleError: null
      };
    default:
      return state;
  }
}

// --- LOAD ---
export function loadArticles() {
  return {
    types: [LOAD_ARTICLES_REQUEST, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_FAIL],
    promise: (client) => client.get('/article/loadArticles')
  };
}

export const clearLoadArticlesError = () => ({ type: CLEAR_LOAD_ARTICLES_ERROR });

// --- ADD ---
export function addArticle(article) {
  const data = {
    ...article,
    content: JSON.stringify(article.content)
  };

  return {
    types: [ADD_ARTICLE_REQUEST, ADD_ARTICLE_SUCCESS, ADD_ARTICLE_FAIL],
    promise: (client) => client.post('/article/addArticle', { data })
  };
}

export const clearAddArticleError = () => ({ type: CLEAR_ADD_ARTICLE_ERROR });

// --- EDIT ---
export function editArticle(article) {
  const data = {
    ...article,
    content: JSON.stringify(article.content)
  };

  return {
    types: [EDIT_ARTICLE_REQUEST, EDIT_ARTICLE_SUCCESS, EDIT_ARTICLE_FAIL],
    // TODO: remove "article" below when API starts returning edited article
    payload: { articleId: article.id, article },
    promise: client => client.post('/article/updateArticle', { data })
  };
}

export const clearEditArticleError = () => ({ type: CLEAR_EDIT_ARTICLE_ERROR });

// --- REMOVE ---
export function removeArticle(articleId) {
  return {
    types: [REMOVE_ARTICLE_REQUEST, REMOVE_ARTICLE_SUCCESS, REMOVE_ARTICLE_FAIL],
    payload: { articleId },
    promise: (client) => client.post('/article/removeArticle', { data: { id: articleId } })
  };
}

export const clearRemoveArticleError = () => ({ type: CLEAR_REMOVE_ARTICLE_ERROR });
