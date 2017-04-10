// --- ACTION TYPES ---
// LOAD
const LOAD_USERS_REQUEST = 'LOAD_USERS_REQUEST';
const LOAD_USERS_SUCCESS = 'LOAD_USERS_SUCCESS';
const LOAD_USERS_FAIL = 'LOAD_USERS_FAIL';
// ADD
const ADD_USER_REQUEST = 'ADD_USER_REQUEST';
const ADD_USER_SUCCESS = 'ADD_USER_SUCCESS';
const ADD_USER_FAIL = 'ADD_USER_FAIL';
// EDIT
const EDIT_USER_REQUEST = 'EDIT_USER_REQUEST';
const EDIT_USER_SUCCESS = 'EDIT_USER_SUCCESS';
const EDIT_USER_FAIL = 'EDIT_USER_FAIL';
// REMOVE
const REMOVE_USER_REQUEST = 'REMOVE_USER_REQUEST';
const REMOVE_USER_SUCCESS = 'REMOVE_USER_SUCCESS';
const REMOVE_USER_FAIL = 'REMOVE_USER_FAIL';

const initialState = {
  // Loading all users
  all: [],
  loadingUsers: false,
  usersLoaded: false,
  loadUsersError: false,
  // Adding new user
  addingUser: false,
  userAdded: null, // (Number) ID of an user that was just added
  addUserError: false,
  // Editing user
  editingUser: false,
  userEdited: false,
  editUserError: false,
  // Removing a user
  removingUser: null, // (Number) ID of an user being removed
  userRemoved: false,
  removeUserError: false
};

// --- ACTIONS ---
// LOAD
export function loadUsers() {
  return {
    requestName: 'Load users',
    types: [LOAD_USERS_REQUEST, LOAD_USERS_SUCCESS, LOAD_USERS_FAIL],
    promise: (client) => client.get('/user/x-loadUsers')
  };
}

// ADD
export function addUser(user) {
  const data = {
    ...user,
    content: JSON.stringify(user.content)
  };

  return {
    requestName: 'Add user',
    types: [ADD_USER_REQUEST, ADD_USER_SUCCESS, ADD_USER_FAIL],
    promise: (client) => client.post('/user/addUser', { data })
  };
}

// EDIT
export function editUser(user) {
  const data = {
    ...user,
    content: JSON.stringify(user.content)
  };

  return {
    requestName: 'Edit user',
    types: [EDIT_USER_REQUEST, EDIT_USER_SUCCESS, EDIT_USER_FAIL],
    // TODO: remove "user" below when API starts returning edited user
    payload: { userId: user.id, user },
    promise: client => client.post('/user/updateUser', { data })
  };
}

// REMOVE
export function removeUser(userId) {
  return {
    requestName: 'Remove user',
    types: [REMOVE_USER_REQUEST, REMOVE_USER_SUCCESS, REMOVE_USER_FAIL],
    payload: { userId },
    promise: (client) => client.post('/user/removeUser', { data: { id: userId } })
  };
}

// --- REDUCER ---
export default (state = initialState, action = {}) => {
  switch (action.type) {
    // LOAD
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
        all: action.result.message,
        loadingUsers: false,
        usersLoaded: true
      };
    case LOAD_USERS_FAIL:
      return {
        ...state,
        loadingUsers: false,
        usersLoaded: false,
        loadUsersError: true
      };
    // ADD
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
        addUserError: true
      };
    // EDIT
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
        editUserError: true
      };
    // REMOVE
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
        removeUserError: true
      };
    default:
      return state;
  }
};
