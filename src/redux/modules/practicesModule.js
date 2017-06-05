const debug = false;

// ---ACTION TYPES ---
// LOAD
const LOAD_PRACTICES_REQUEST = 'LOAD_PRACTICES_REQUEST';
const LOAD_PRACTICES_SUCCESS = 'LOAD_PRACTICES_SUCCESS';
const LOAD_PRACTICES_FAIL = 'LOAD_PRACTICES_FAIL';
// ADD
const ADD_PRACTICE_REQUEST = 'ADD_PRACTICE_REQUEST';
const ADD_PRACTICE_SUCCESS = 'ADD_PRACTICE_SUCCESS';
const ADD_PRACTICE_FAIL = 'ADD_PRACTICE_FAIL';
// EDIT
const EDIT_PRACTICE_REQUEST = 'EDIT_PRACTICE_REQUEST';
const EDIT_PRACTICE_SUCCESS = 'EDIT_PRACTICE_SUCCESS';
const EDIT_PRACTICE_FAIL = 'EDIT_PRACTICE_FAIL';
// REMOVE
const REMOVE_PRACTICE_REQUEST = 'REMOVE_PRACTICE_REQUEST';
const REMOVE_PRACTICE_SUCCESS = 'REMOVE_PRACTICE_SUCCESS';
const REMOVE_PRACTICE_FAIL = 'REMOVE_PRACTICE_FAIL';

// --- HELPERS ---

// Makes sure that the rich editor alwasy get's object as a content
const prepareContent = (jsonString) => {
  if (typeof jsonString === 'object') return jsonString;

  try {
    const obj = JSON.parse(jsonString);
    if (obj && typeof obj === 'object') return obj;
  } catch (error) {
    if (debug) console.warn('ERROR: string cannot be parsed as JSON:', error);
    return {
      kind: 'state',
      document: {
        data: {},
        kind: 'document',
        nodes: [
          {
            kind: 'block',
            type: 'paragraph',
            nodes: [{ kind: 'text', ranges: [{ text: `${jsonString}` }] }]
          }
        ]
      }
    };
  }
};
const initialState = {
  // Loading all practices
  all: [],
  loadingPractices: false,
  practicesLoaded: false,
  loadPracticesError: false,
  // Adding new practice
  addingPractice: false,
  practiceAdded: null, // (Number) ID of an practice that was just added
  addPracticeError: false,
  // Editing practice
  editingPractice: false,
  practiceEdited: false,
  editPracticeError: false,
  // Removing a practice
  removingPractice: null, // (Number) ID of an practice being removed
  practiceRemoved: false,
  removePracticeError: false
};

// --- ACTIONS ---
// LOAD
export const loadPractices = () => ({
  requestName: 'Load practices',
  types: [LOAD_PRACTICES_REQUEST, LOAD_PRACTICES_SUCCESS, LOAD_PRACTICES_FAIL],
  promise: (client) => client.get('/learning/loadPractices')
});

// ADD
export const addPractice = (practice) => ({
  requestName: 'Add practice',
  types: [ADD_PRACTICE_REQUEST, ADD_PRACTICE_SUCCESS, ADD_PRACTICE_FAIL],
  promise: (client) => client.post('/learning/addPractice', { data: practice })
});

// EDIT
export const editPractice = (practice) => ({
  requestName: 'Edit practice',
  types: [EDIT_PRACTICE_REQUEST, EDIT_PRACTICE_SUCCESS, EDIT_PRACTICE_FAIL],
  payload: { practiceId: practice.id, practice },
  promise: client => client.post('/learning/updatePractice', { data: { ...practice, content: practice.content } })
});

// REMOVE
export const removePractice = (practiceId) => ({
  requestName: 'Remove practice',
  types: [REMOVE_PRACTICE_REQUEST, REMOVE_PRACTICE_SUCCESS, REMOVE_PRACTICE_FAIL],
  payload: { practiceId },
  promise: (client) => client.post('/learning/removePractice', { data: { id: practiceId } })
});

// --- REDUCER ---
export default function practicesModule(state = initialState, action = {}) {
  switch (action.type) {
    // LOAD
    case LOAD_PRACTICES_REQUEST:
      return {
        ...state,
        practicesLoaded: false,
        loadingPractices: true,
        loadPracticesError: false
      };
    case LOAD_PRACTICES_SUCCESS:
      const all = action.result.message.map(practice => ({
        ...practice,
        content: prepareContent(practice.content)
      }));
      return {
        ...state,
        all: all,
        loadingPractices: false,
        practicesLoaded: true
      };
    case LOAD_PRACTICES_FAIL:
      return {
        ...state,
        loadingPractices: false,
        practicesLoaded: false,
        loadPracticesError: true
      };
    // ADD
    case ADD_PRACTICE_REQUEST:
      return {
        ...state,
        practiceAdded: null,
        addingPractice: true,
        addPracticeError: false
      };
    case ADD_PRACTICE_SUCCESS:
      return {
        ...state,
        all: [
          ...state.all,
          action.result.message,
        ],
        addingPractice: false,
        practiceAdded: action.result.message
      };
    case ADD_PRACTICE_FAIL:
      return {
        ...state,
        addingPractice: false,
        practiceAdded: null,
        addPracticeError: true
      };
    // EDIT
    case EDIT_PRACTICE_REQUEST:
      return {
        ...state,
        practiceEdited: false,
        editingPractice: true,
        editPracticeError: false
      };
    case EDIT_PRACTICE_SUCCESS:
      return {
        ...state,
        all: state.all.map(practice => practice.id === action.payload.practiceId ? action.payload.practice : practice),
        editingPractice: false,
        practiceEdited: true
      };
    case EDIT_PRACTICE_FAIL:
      return {
        ...state,
        editingPractice: false,
        practiceEdited: false,
        editPracticeError: true
      };
    // REMOVE
    case REMOVE_PRACTICE_REQUEST:
      return {
        ...state,
        practiceRemoved: false,
        removingPractice: action.payload.practiceId,
        removePracticeError: false
      };
    case REMOVE_PRACTICE_SUCCESS:
      return {
        ...state,
        all: state.all.filter(practice => practice.id !== action.payload.practiceId),
        removingPractice: null,
        practiceRemoved: true
      };
    case REMOVE_PRACTICE_FAIL:
      return {
        ...state,
        removingPractice: null,
        practiceRemoved: false,
        removePracticeError: true
      };
    default:
      return state;
  }
}
