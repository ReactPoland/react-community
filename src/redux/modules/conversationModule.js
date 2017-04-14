// --- ACTION TYPES ---
export const LOAD_CONVERSATION_REQUEST = 'LOAD_CONVERSATION_REQUEST';
export const LOAD_CONVERSATION_SUCCESS = 'LOAD_CONVERSATION_SUCCESS';
export const LOAD_CONVERSATION_FAIL = 'LOAD_CONVERSATION_FAIL';

export const SUBMIT_COMMENT_REQUEST = 'SUBMIT_COMMENT_REQUEST';
export const SUBMIT_COMMENT_SUCCESS = 'SUBMIT_COMMENT_SUCCESS';
export const SUBMIT_COMMENT_FAIL = 'SUBMIT_COMMENT_FAIL';

const initialState = {
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

// --- HELPERS ---
const groupComments = (rawComments) => {
  if (!rawComments) return [];

  const comments = [...rawComments];

  // Take every comment...
  comments.forEach(comment => {
    // Check if it's a reply (nested) comment
    if (comment.parentCommentId !== null && comment.depth > 0) {
      // If it is, find index of its parent comment
      const index = comments.findIndex(com => com.id === comment.parentCommentId);
      // If we have it, add current reply to parent component's "replies" array
      if (index >= 0) {
        if (comments[index].replies) comments[index].replies.push(comment);
        if (!comments[index].replies) comments[index].replies = [comment];
      }
    }
  });

  // Get only comments without replies and return them
  return comments.filter(comment => !comment.depth);
};

// --- ACTIONS ---
export const loadConversation = (articleId) => ({
  requestName: 'Load conversation',
  types: [LOAD_CONVERSATION_REQUEST, LOAD_CONVERSATION_SUCCESS, LOAD_CONVERSATION_FAIL],
  promise: (client) => client.post('/article/loadComments/', { data: { articleId } })
});

export const submitComment = ({ articleId, parentCommentId, body }) => ({
  requestName: 'Submit comment',
  types: [SUBMIT_COMMENT_REQUEST, SUBMIT_COMMENT_SUCCESS, SUBMIT_COMMENT_FAIL],
  promise: (client) => client.post('/self/newComment/', { data: { articleId, parentCommentId, body } })
});

// -- REDUCER --
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_CONVERSATION_REQUEST:
      return {
        ...state,
        comments: [],
        conversationLoaded: false,
        loadingConversation: true,
        loadConversationError: false
      };
    case LOAD_CONVERSATION_SUCCESS:
      return {
        ...state,
        comments: groupComments(action.result.message),
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
