// --- ACTION TYPES ---
const LOAD_REQUEST = 'LOAD_REQUEST';
const LOAD_SUCCESS = 'LOAD_SUCCESS';
const LOAD_FAIL = 'LOAD_FAIL';
const LOGIN_REQUEST = 'LOGIN_REQUEST';
const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
const LOGOUT_FAIL = 'LOGOUT_FAIL';

// --- HELPERS ---
export const isLoaded = globalState => globalState.auth && globalState.auth.loaded;

// --- ACTIONS ---
export const load = () => ({
  reguestName: 'Load user',
  types: [LOAD_REQUEST, LOAD_SUCCESS, LOAD_FAIL],
  promise: client => client.get('/loadAuth')
});

export const login = () => ({ type: LOGIN_REQUEST });

export const logout = () => ({
  types: [LOGOUT_REQUEST, LOGOUT_SUCCESS, LOGOUT_FAIL],
  promise: client => client.get('/logout')
});

const initialState = {
  // User
  user: null, // Contains: id, firstName, lastName, pictureURL
  // Lodaing user data
  loading: false,
  loaded: false,
  loadError: false,
  // Logging in
  loggingIn: false,
  loggedIn: false,
  loginError: false,
  // Logging out
  loggingOut: false,
  loggedOut: false,
  logoutError: false
};

// --- REDUCER ---
export default (state = initialState, action = {}) => {
  switch (action.type) {
    case LOAD_REQUEST:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        loggedIn: action.result ? true : false,
        user: action.result
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        loadError: true
      };
    case LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true
      };
    case LOGOUT_REQUEST:
      return {
        ...state,
        loggingOut: true
      };
    case LOGOUT_SUCCESS:
      return {
        ...state,
        loggingOut: false,
        loggedIn: false,
        loggedOut: true,
        user: null
      };
    case LOGOUT_FAIL:
      return {
        ...state,
        loggingOut: false,
        logoutError: true
      };
    default:
      return state;
  }
};
