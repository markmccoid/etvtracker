import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import freeze from 'redux-freeze';

import tvShowReducer from './tvShows';
import authReducer from './auth';
//import searchReducer from './search';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  TV: {
    showData: {},
    seasonData: {},
    extraData: {},
    userData: {},
    tagData: {},
    errorData: {},
    searchData: {
      searchTerm: undefined,
      andFlag: false,
      tagFilters: [],
      sortBy: 'name',
    }
  },
  auth: {
    uid: undefined,
    email: undefined,
    status: undefined,
    message: undefined
  },
  
  // search: {
  //   searchTerm: undefined,
  //   status: undefined,
  // }
}
export default () => {
  //store creation
  const store = createStore(
    combineReducers({
      TV: tvShowReducer,
      auth: authReducer,
      // search: searchReducer,
    }),
    initialState,
    composeEnhancers(applyMiddleware(thunk, freeze))
  );
  return store;
};
