// constants
const LOAD_STATES_REQUEST = 'LOAD_STATES_REQUEST';
const LOAD_STATES_SUCCESS = 'LOAD_STATES_SUCCESS';
const LOAD_STATES_FAILURE = 'LOAD_STATES_FAILURE';

const LOAD_CITIES_REQUEST = 'LOAD_CITIES_REQUEST';
const LOAD_CITIES_SUCCESS = 'LOAD_CITIES_SUCCESS';
const LOAD_CITIES_FAILURE = 'LOAD_CITIES_FAILURE';

const LOAD_DEVS_REQUEST = 'LOAD_DEVS_REQUEST';
const LOAD_DEVS_SUCCESS = 'LOAD_DEVS_SUCCESS';
const LOAD_DEVS_FAILURE = 'LOAD_DEVS_FAILURE';

// action creators
export const loadStates = () => ({
  requestName: 'Load states',
  types: [LOAD_STATES_REQUEST, LOAD_STATES_SUCCESS, LOAD_STATES_FAILURE],
  promise: client => client.get('/devs/getStates')
});

export const loadCities = stateCode => ({
  requestName: 'Load cities',
  types: [LOAD_CITIES_REQUEST, LOAD_CITIES_SUCCESS, LOAD_CITIES_FAILURE],
  promise: client => client.post('/devs/getCities', { data: { stateCode } })
});

export const loadDevs = slug => ({
  requestName: 'Load devs',
  types: [LOAD_DEVS_REQUEST, LOAD_DEVS_SUCCESS, LOAD_DEVS_FAILURE],
  promise: client => client.post('/devs/getDevs', { data: { slug } })
});

// handlers
const handlers = {
  [LOAD_STATES_REQUEST]: state => ({ ...state, statesLoading: true, statesLoadingError: false, statesLoaded: false }),
  [LOAD_STATES_SUCCESS]: (state, { result }) => ({
    ...state,
    statesLoading: false,
    states: result.message,
    statesLoaded: true
  }),
  [LOAD_CITIES_REQUEST]: state => ({ ...state, citiesLoading: true, citiesLoadingError: false, citiesLoaded: false }),
  [LOAD_CITIES_SUCCESS]: (state, { result }) => ({
    ...state,
    citiesLoading: false,
    cities: result.message,
    citiesLoaded: true
  }),
  [LOAD_DEVS_REQUEST]: state => ({ ...state, devsLoading: true, devsLoadingError: false, devsLoaded: false }),
  [LOAD_DEVS_SUCCESS]: (state, { result }) => ({
    ...state,
    devsLoading: false,
    devs: result.message,
    devsLoaded: true
  }),
};

// reducer
const initialState = {
  statesLoaded: false,
  statesLoading: false,
  statesLoadingError: false,
  states: [],
  citiesLoaded: false,
  citiesLoading: false,
  citiesLoadingError: false,
  cities: [],
  devsLoaded: false,
  devsLoading: false,
  devsLoadingError: false,
  devs: []
};

export default function reactDevelopersModule(state = initialState, action) {
  const handler = handlers[action.type];
  return handler ? handler(state, action) : state;
}
