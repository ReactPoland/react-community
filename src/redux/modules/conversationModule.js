// --- LOAD ---
const LOAD_CONVERSATION_REQUEST = 'LOAD_CONVERSATION_REQUEST';
const LOAD_CONVERSATION_SUCCESS = 'LOAD_CONVERSATION_SUCCESS';
const LOAD_CONVERSATION_FAIL = 'LOAD_CONVERSATION_FAIL';
const CLEAR_LOAD_CONVERSATION_ERROR = 'CLEAR_LOAD_CONVERSATION_ERROR';

const initialState = {
  id: null,
  comments: [],
  conversationLoaded: false,
  loadingConversation: false,
  loadConversationError: ''
};

export default function articlesModule(state = initialState, action = {}) {
  switch (action.type) {
    // --- LOAD ---
    case LOAD_CONVERSATION_REQUEST:
      return {
        ...state,
        id: null,
        comments: [],
        conversationLoaded: false,
        loadingConversation: true,
        loadConversationError: ''
      };
    case LOAD_CONVERSATION_SUCCESS:
      const conversation = action.result.message;

      return {
        ...state,
        id: conversation.id,
        comments: conversation.comments,
        loadingConversation: false,
        conversationLoaded: true
      };
    case LOAD_CONVERSATION_FAIL:
      return {
        ...state,
        loadingConversation: false,
        conversationLoaded: false,
        loadConversationError: `Load conversation error: ${action.error.message}`
      };
    case CLEAR_LOAD_CONVERSATION_ERROR:
      return {
        ...state,
        loadConversationError: ''
      };
    default:
      return state;
  }
}

// --- LOAD ---
export function loadConversation(articleId) {
  return {
    types: [LOAD_CONVERSATION_REQUEST, LOAD_CONVERSATION_SUCCESS, LOAD_CONVERSATION_FAIL],
    promise: (client) => client.post('/conversation/loadConversation', { data: { id: articleId } })
  };
}

export const clearLoadConversationError = () => ({ type: CLEAR_LOAD_CONVERSATION_ERROR });
