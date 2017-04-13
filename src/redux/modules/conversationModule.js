// --- ACTION TYPES ---
export const LOAD_CONVERSATION_REQUEST = 'LOAD_CONVERSATION_REQUEST';
export const LOAD_CONVERSATION_SUCCESS = 'LOAD_CONVERSATION_SUCCESS';
export const LOAD_CONVERSATION_FAIL = 'LOAD_CONVERSATION_FAIL';

export const SUBMIT_COMMENT_REQUEST = 'SUBMIT_COMMENT_REQUEST';
export const SUBMIT_COMMENT_SUCCESS = 'SUBMIT_COMMENT_SUCCESS';
export const SUBMIT_COMMENT_FAIL = 'SUBMIT_COMMENT_FAIL';

const initialState = {
  id: null,
  comments: [],
  // Loading conversation
  loadingConversation: false,
  conversationLoaded: false,
  loadConversationError: false,
  // Adding comment
  addingComment: false,
  commentAdded: false,
  addCommentError: false
};

// --- ACTIONS ---
export const loadConversation = (articleId) => ({
  requestName: 'Load conversation',
  types: [LOAD_CONVERSATION_REQUEST, LOAD_CONVERSATION_SUCCESS, LOAD_CONVERSATION_FAIL],
  promise: (client) => client.post('/article/loadComments/', { data: { articleId } })
});

export const submitComment = ({ articleId, body }) => ({
  requestName: 'Submit comment',
  types: [SUBMIT_COMMENT_REQUEST, SUBMIT_COMMENT_SUCCESS, SUBMIT_COMMENT_FAIL],
  promise: (client) => client.post('/self/newComment/', { data: { articleId, body } })
});

// -- REDUCER --
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_CONVERSATION_REQUEST:
      return {
        ...state,
        id: null,
        comments: [],
        conversationLoaded: false,
        loadingConversation: true,
        loadConversationError: false
      };
    case LOAD_CONVERSATION_SUCCESS:
      const conversation = action.result.message[0] || [];

      return {
        ...state,
        id: conversation.id,
        comments: action.result.message,
        loadingConversation: false,
        conversationLoaded: true
      };
    case LOAD_CONVERSATION_FAIL:

      return {
        ...state,
        loadingConversation: false,
        conversationLoaded: false,
        loadConversationError: true
      };
    case SUBMIT_COMMENT_REQUEST:
      return {
        ...state,
        addingComment: true,
        commentAdded: false,
        addCommentError: false
      };
    case SUBMIT_COMMENT_SUCCESS:
      return {
        ...state,
        addingComment: false,
        commentAdded: true,
        addCommentError: false
      };
    case SUBMIT_COMMENT_FAIL:
      return {
        ...state,
        addingComment: false,
        commentAdded: false,
        addCommentError: true
      };
    default:
      return state;
  }
};
