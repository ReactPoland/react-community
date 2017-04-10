import _sample from 'lodash/sample';

const debug = false;

// --- ACTION TYPES ---
// LOAD
const LOAD_ARTICLES_REQUEST = 'LOAD_ARTICLES_REQUEST';
const LOAD_ARTICLES_SUCCESS = 'LOAD_ARTICLES_SUCCESS';
const LOAD_ARTICLES_FAIL = 'LOAD_ARTICLES_FAIL';
// ADD
const ADD_ARTICLE_REQUEST = 'ADD_ARTICLE_REQUEST';
const ADD_ARTICLE_SUCCESS = 'ADD_ARTICLE_SUCCESS';
const ADD_ARTICLE_FAIL = 'ADD_ARTICLE_FAIL';
// EDIT
const EDIT_ARTICLE_REQUEST = 'EDIT_ARTICLE_REQUEST';
const EDIT_ARTICLE_SUCCESS = 'EDIT_ARTICLE_SUCCESS';
const EDIT_ARTICLE_FAIL = 'EDIT_ARTICLE_FAIL';
// REMOVE
const REMOVE_ARTICLE_REQUEST = 'REMOVE_ARTICLE_REQUEST';
const REMOVE_ARTICLE_SUCCESS = 'REMOVE_ARTICLE_SUCCESS';
const REMOVE_ARTICLE_FAIL = 'REMOVE_ARTICLE_FAIL';

// --- HELPERS ---
export function prepareContent(jsonString) {
  if (typeof jsonString === 'object') return jsonString;

  try {
    const obj = JSON.parse(JSON.parse(jsonString));

    if (obj && typeof obj === 'object') return obj;
  } catch (error) {
    if (debug) console.warn('ERROR: string cannot be parsed as JSON:', error);
    return {
      'nodes': [
        {
          'kind': 'block',
          'type': 'paragraph',
          'nodes': [
            {
              'kind': 'text',
              'ranges': [
                {
                  'text': `${jsonString}`
                }
              ]
            }
          ]
        }
      ]
    };
  }
}

const initialState = {
  // Loading all articles
  all: [],
  loadingArticles: false,
  articlesLoaded: false,
  loadArticlesError: false,
  // Adding new article
  addingArticle: false,
  articleAdded: null, // (Number) ID of an article that was just added
  addArticleError: false,
  // Editing article
  editingArticle: false,
  articleEdited: false,
  editArticleError: false,
  // Removing a article
  removingArticle: null, // (Number) ID of an article being removed
  articleRemoved: false,
  removeArticleError: false
};

// --- ACTIONS ---
// LOAD
export function loadArticles() {
  return {
    requestName: 'Load articles',
    types: [LOAD_ARTICLES_REQUEST, LOAD_ARTICLES_SUCCESS, LOAD_ARTICLES_FAIL],
    promise: (client) => client.get('/article/loadArticles')
  };
}

// ADD
export function addArticle(article) {
  const data = {
    ...article,
    content: JSON.stringify(article.content)
  };

  return {
    requestName: 'Add article',
    types: [ADD_ARTICLE_REQUEST, ADD_ARTICLE_SUCCESS, ADD_ARTICLE_FAIL],
    promise: (client) => client.post('/article/addArticle', { data })
  };
}

// EDIT
export function editArticle(article) {
  const data = {
    ...article,
    content: JSON.stringify(article.content)
  };

  return {
    requestName: 'Edit article',
    types: [EDIT_ARTICLE_REQUEST, EDIT_ARTICLE_SUCCESS, EDIT_ARTICLE_FAIL],
    // TODO: remove "article" below when API starts returning edited article
    payload: { articleId: article.id, article },
    promise: client => client.post('/article/updateArticle', { data })
  };
}

// REMOVE
export function removeArticle(articleId) {
  return {
    requestName: 'Remove article',
    types: [REMOVE_ARTICLE_REQUEST, REMOVE_ARTICLE_SUCCESS, REMOVE_ARTICLE_FAIL],
    payload: { articleId },
    promise: (client) => client.post('/article/removeArticle', { data: { id: articleId } })
  };
}

// --- REDUCER ---
export default function articlesModule(state = initialState, action = {}) {
  switch (action.type) {
    // LOAD
    case LOAD_ARTICLES_REQUEST:
      return {
        ...state,
        articlesLoaded: false,
        loadingArticles: true,
        loadArticlesError: false
      };
    case LOAD_ARTICLES_SUCCESS:
      const all = action.result.message.map(article => ({
        ...article,
        size: _sample([6, 12]), // TODO: this will be set on the page, and should be stored in the DB
        content: prepareContent(article.content)
      }));
      return {
        ...state,
        all: all,
        loadingArticles: false,
        articlesLoaded: true
      };
    case LOAD_ARTICLES_FAIL:
      return {
        ...state,
        loadingArticles: false,
        articlesLoaded: false,
        loadArticlesError: true
      };
    // ADD
    case ADD_ARTICLE_REQUEST:
      return {
        ...state,
        articleAdded: null,
        addingArticle: true,
        addArticleError: false
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
        addArticleError: true
      };
    // EDIT
    case EDIT_ARTICLE_REQUEST:
      return {
        ...state,
        articleEdited: false,
        editingArticle: true,
        editArticleError: false
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
        editArticleError: true
      };
    // REMOVE
    case REMOVE_ARTICLE_REQUEST:
      return {
        ...state,
        articleRemoved: false,
        removingArticle: action.payload.articleId,
        removeArticleError: false
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
        removeArticleError: true
      };
    default:
      return state;
  }
}
