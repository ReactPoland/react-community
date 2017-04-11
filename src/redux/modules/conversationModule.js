// --- ACTION TYPES ---
export const LOAD_CONVERSATION_REQUEST = 'LOAD_CONVERSATION_REQUEST';
export const LOAD_CONVERSATION_SUCCESS = 'LOAD_CONVERSATION_SUCCESS';
export const LOAD_CONVERSATION_FAIL = 'LOAD_CONVERSATION_FAIL';

const initialState = {
  id: null,
  comments: [],
  conversationLoaded: false,
  loadingConversation: false,
  loadConversationError: false
};

// --- ACTIONS ---
export const loadConversation = (articleId) => ({
  requestName: 'Load conversation',
  types: [LOAD_CONVERSATION_REQUEST, LOAD_CONVERSATION_SUCCESS, LOAD_CONVERSATION_FAIL],
  promise: (client) => client.post('/conversation/loadConversation', { data: { id: articleId } })
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
        loadConversationError: true
      };
    default:
      return state;
  }
};
