import _sample from 'lodash/sample';

const debug = false;

// ---ACTION TYPES ---
// LOAD
const LOAD_TUTORIALS_REQUEST = 'LOAD_TUTORIALS_REQUEST';
const LOAD_TUTORIALS_SUCCESS = 'LOAD_TUTORIALS_SUCCESS';
const LOAD_TUTORIALS_FAIL = 'LOAD_TUTORIALS_FAIL';
// ADD
const ADD_TUTORIAL_REQUEST = 'ADD_TUTORIAL_REQUEST';
const ADD_TUTORIAL_SUCCESS = 'ADD_TUTORIAL_SUCCESS';
const ADD_TUTORIAL_FAIL = 'ADD_TUTORIAL_FAIL';
// EDIT
const EDIT_TUTORIAL_REQUEST = 'EDIT_TUTORIAL_REQUEST';
const EDIT_TUTORIAL_SUCCESS = 'EDIT_TUTORIAL_SUCCESS';
const EDIT_TUTORIAL_FAIL = 'EDIT_TUTORIAL_FAIL';
// REMOVE
const REMOVE_TUTORIAL_REQUEST = 'REMOVE_TUTORIAL_REQUEST';
const REMOVE_TUTORIAL_SUCCESS = 'REMOVE_TUTORIAL_SUCCESS';
const REMOVE_TUTORIAL_FAIL = 'REMOVE_TUTORIAL_FAIL';

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
  // Loading all tutorials
  all: [],
  loadingTutorials: false,
  tutorialsLoaded: false,
  loadTutorialsError: false,
  // Adding new tutorial
  addingTutorial: false,
  tutorialAdded: null, // (Number) ID of an tutorial that was just added
  addTutorialError: false,
  // Editing tutorial
  editingTutorial: false,
  tutorialEdited: false,
  editTutorialError: false,
  // Removing a tutorial
  removingTutorial: null, // (Number) ID of an tutorial being removed
  tutorialRemoved: false,
  removeTutorialError: false
};

// --- ACTIONS ---
// LOAD
export const loadTutorials = () => ({
  requestName: 'Load tutorials',
  types: [LOAD_TUTORIALS_REQUEST, LOAD_TUTORIALS_SUCCESS, LOAD_TUTORIALS_FAIL],
  promise: (client) => client.get('/learning/loadTutorials')
});

// ADD
export const addTutorial = (tutorial) => ({
  requestName: 'Add tutorial',
  types: [ADD_TUTORIAL_REQUEST, ADD_TUTORIAL_SUCCESS, ADD_TUTORIAL_FAIL],
  promise: (client) => client.post('/learning/addTutorial', { data: tutorial })
});

// EDIT
export const editTutorial = (tutorial) => ({
  requestName: 'Edit tutorial',
  types: [EDIT_TUTORIAL_REQUEST, EDIT_TUTORIAL_SUCCESS, EDIT_TUTORIAL_FAIL],
  payload: { tutorialId: tutorial.id, tutorial },
  promise: client => client.post('/learning/updateTutorial', { data: { ...tutorial, content: tutorial.content } })
});

// REMOVE
export const removeTutorial = (tutorialId) => ({
  requestName: 'Remove tutorial',
  types: [REMOVE_TUTORIAL_REQUEST, REMOVE_TUTORIAL_SUCCESS, REMOVE_TUTORIAL_FAIL],
  payload: { tutorialId },
  promise: (client) => client.post('/learning/removeTutorial', { data: { id: tutorialId } })
});

// --- REDUCER ---
export default function tutorialsModule(state = initialState, action = {}) {
  switch (action.type) {
    // LOAD
    case LOAD_TUTORIALS_REQUEST:
      return {
        ...state,
        tutorialsLoaded: false,
        loadingTutorials: true,
        loadTutorialsError: false
      };
    case LOAD_TUTORIALS_SUCCESS:
      const all = action.result.message.map(tutorial => ({
        ...tutorial,
        size: _sample([6, 12]), // TODO: this will be set on the page, and should be stored in the DB
        content: prepareContent(tutorial.content)
      }));
      return {
        ...state,
        all: all,
        loadingTutorials: false,
        tutorialsLoaded: true
      };
    case LOAD_TUTORIALS_FAIL:
      return {
        ...state,
        loadingTutorials: false,
        tutorialsLoaded: false,
        loadTutorialsError: true
      };
    // ADD
    case ADD_TUTORIAL_REQUEST:
      return {
        ...state,
        tutorialAdded: null,
        addingTutorial: true,
        addTutorialError: false
      };
    case ADD_TUTORIAL_SUCCESS:
      return {
        ...state,
        all: [
          ...state.all,
          action.result.message,
        ],
        addingTutorial: false,
        tutorialAdded: action.result.message
      };
    case ADD_TUTORIAL_FAIL:
      return {
        ...state,
        addingTutorial: false,
        tutorialAdded: null,
        addTutorialError: true
      };
    // EDIT
    case EDIT_TUTORIAL_REQUEST:
      return {
        ...state,
        tutorialEdited: false,
        editingTutorial: true,
        editTutorialError: false
      };
    case EDIT_TUTORIAL_SUCCESS:
      return {
        ...state,
        all: state.all.map(tutorial => tutorial.id === action.payload.tutorialId ? action.payload.tutorial : tutorial),
        editingTutorial: false,
        tutorialEdited: true
      };
    case EDIT_TUTORIAL_FAIL:
      return {
        ...state,
        editingTutorial: false,
        tutorialEdited: false,
        editTutorialError: true
      };
    // REMOVE
    case REMOVE_TUTORIAL_REQUEST:
      return {
        ...state,
        tutorialRemoved: false,
        removingTutorial: action.payload.tutorialId,
        removeTutorialError: false
      };
    case REMOVE_TUTORIAL_SUCCESS:
      return {
        ...state,
        all: state.all.filter(tutorial => tutorial.id !== action.payload.tutorialId),
        removingTutorial: null,
        tutorialRemoved: true
      };
    case REMOVE_TUTORIAL_FAIL:
      return {
        ...state,
        removingTutorial: null,
        tutorialRemoved: false,
        removeTutorialError: true
      };
    default:
      return state;
  }
}
