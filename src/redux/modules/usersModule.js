// --- LOAD ---
const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
const LOAD_USERS_FAIL = 'LOAD_USERS_FAIL';
const CLEAR_LOAD_USERS_ERROR = 'CLEAR_LOAD_USERS_ERROR';
// --- ADD ---
const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
const ADD_USER_FAIL = 'ADD_USER_FAIL';
const CLEAR_ADD_USER_ERROR = 'CLEAR_ADD_USER_ERROR';
// --- EDIT ---
const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
const EDIT_USER_FAIL = 'EDIT_USER_FAIL';
const CLEAR_EDIT_USER_ERROR = 'CLEAR_EDIT_USER_ERROR';
// --- REMOVE ---
const REMOVE_USER_REQUEST = 'REMOVE_USER_REQUEST';
const REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS';
const REMOVE_USER_FAIL = 'REMOVE_USER_FAIL';
const CLEAR_REMOVE_USER_ERROR = 'CLEAR_REMOVE_USER_ERROR';

const initialState = {
  // Loading all users
  all: [],
  loadingUsers: false,
  usersLoaded: false,
  loadUsersError: null,
  // Adding new user
  addingUser: false,
  userAdded: null, // (Number) ID of an user that was just added
  addUserError: null,
  // Editing user
  editingUser: false,
  userEdited: false,
  editUserError: null,
  // Removing a user
  removingUser: null, // (Number) ID of an user being removed
  userRemoved: false,
  removeUserError: null
};

export default function usersModule(state = initialState, action = {}) {
  switch (action.type) {
    // --- LOAD ---
    case LOAD_USERS_REQUEST:
      return {
        ...state,
        usersLoaded: false,
        loadingUsers: true,
        loadUsersError: null
      };
    case LOAD_USERS_SUCCESS:
      return {
        ...state,
        all: action.result.message.map(user => ({ ...user, content: JSON.parse(user.content) })),
        loadingUsers: false,
        usersLoaded: true
      };
    case LOAD_USERS_FAIL:
      return {
        ...state,
        loadingUsers: false,
        usersLoaded: false,
        loadUsersError: `Error while loading users: ${action.error.message}`
      };
    case CLEAR_LOAD_USERS_ERROR:
      return {
        ...state,
        loadUsersError: null
      };
      // --- ADD ---
    // --- ADD ---
    case ADD_USER_REQUEST:
      return {
        ...state,
        userAdded: null,
        addingUser: true,
        addUserError: null
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        all: [
          ...state.all,
          {
            ...action.result.message,
            content: JSON.parse(action.result.message.content)
          }
        ],
        addingUser: false,
        userAdded: action.result.message.id
      };
    case ADD_USER_FAIL:
      return {
        ...state,
        addingUser: false,
        userAdded: null,
        addUserError: `Error while adding an user: ${action.error.message}`
      };
    case CLEAR_ADD_USER_ERROR:
      return {
        ...state,
        addUserError: null
      };
    // --- EDIT ---
    case EDIT_USER_REQUEST:
      return {
        ...state,
        userEdited: false,
        editingUser: true,
        editUserError: null
      };
    case EDIT_USER_SUCCESS:
      return {
        ...state,
        // TODO: uncomment this line when API starts returning edited user
        // all: state.all.map(user => user.id === action.payload.userId ? action.result.message : user),
        all: state.all.map(user => user.id === action.payload.userId ? action.payload.user : user),
        editingUser: false,
        userEdited: true
      };
    case EDIT_USER_FAIL:
      return {
        ...state,
        editingUser: false,
        userEdited: false,
        editUserError: `Error while editing an user: ${action.error.message}`
      };
    case CLEAR_EDIT_USER_ERROR:
      return {
        ...state,
        editUserError: null
      };
    // --- REMOVE ---
    case REMOVE_USER_REQUEST:
      return {
        ...state,
        userRemoved: false,
        removingUser: action.payload.userId,
        removeUserError: null
      };
    case REMOVE_USER_SUCCESS:
      return {
        ...state,
        all: state.all.filter(user => user.id !== action.payload.userId),
        removingUser: null,
        userRemoved: true
      };
    case REMOVE_USER_FAIL:
      return {
        ...state,
        removingUser: null,
        userRemoved: false,
        removeUserError: `Error while deleting an user: ${action.error.message}`
      };
    case CLEAR_REMOVE_USER_ERROR:
      return {
        ...state,
        removeUserError: null
      };
    default:
      return state;
  }
}

// --- LOAD ---
export function loadUsers() {
  return {
    types: [LOAD_USERS_REQUEST, LOAD_USERS_SUCCESS, LOAD_USERS_FAIL],
    promise: (client) => client.get('/user/loadUsers')
  };
}

export const clearLoadUsersError = () => ({ type: CLEAR_LOAD_USERS_ERROR });

// --- ADD ---
export function addUser(user) {
  const data = {
    ...user,
    content: JSON.stringify(user.content)
  };

  return {
    types: [ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAIL],
    promise: (client) => client.post('/user/addUser', { data })
  };
}

export const clearAddUserError = () => ({ type: CLEAR_ADD_USER_ERROR });

// --- EDIT ---
export function editUser(user) {
  const data = {
    ...user,
    content: JSON.stringify(user.content)
  };

  return {
    types: [EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAIL],
    // TODO: remove "user" below when API starts returning edited user
    payload: { userId: user.id, user },
    promise: client => client.post('/user/updateUser', { data })
  };
}

export const clearEditUserError = () => ({ type: CLEAR_EDIT_USER_ERROR });

// --- REMOVE ---
export function removeUser(userId) {
  return {
    types: [REMOVE_USER_REQUEST, REMOVE_USER_SUCCESS, REMOVE_USER_FAIL],
    payload: { userId },
    promise: (client) => client.post('/user/removeUser', { data: { id: userId } })
  };
}

export const clearRemoveUserError = () => ({ type: CLEAR_REMOVE_USER_ERROR });
