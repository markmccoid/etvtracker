import _ from 'lodash';
import { combineReducers } from 'redux';
import { handleActions } from 'redux-actions'

import {  SET_TV_SHOW_ERROR } from './actions';
import {  INIT_DATA, ADD_TV_SHOW, DELETE_TV_SHOW} from './actions';

import { getNextEpisode } from './helpers';

// Shape of this reducer node:
// TV: {
//   showData: {},  //showDataReducer
//   seasonData: {},  //seasonDataReducer
//   extraData: {},  //extraDataReducer
//   errorData: {}, //errorDataReducer
// }

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// - showData reducer
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const showDataDefault = {};

const showDataReducer = handleActions({
  INIT_DATA: (state, action) => {
    return action.payload.showData;
  },
  ADD_TV_SHOW: (state, action) => {
  let { showId, showObj } = action.payload;
  let nextEpisodeObj = getNextEpisode(showId, showObj.seasonData, showObj.showData);
    return { ...state, [showId]: { ...showObj.showData, ...nextEpisodeObj } };
  },
  REFRESH_TV_SHOW: (state, action) => {
    let { showId, showObj } = action.payload;
    let nextEpisodeObj = getNextEpisode(showId, showObj.seasonData, showObj.showData);
    
    return { ...state, [showId]: { ...action.payload.showObj.showData, ...nextEpisodeObj } };
  },
  DELETE_TV_SHOW: (state, action) => {
    // filter removed the show object we want to delete, 
    // keyBy converts the array of objects returned by filter to an "Objects of Objects"
    return { ..._.keyBy(_.filter(state, (show) => show.showId !== action.payload), 'showId') }
  },
  AUTH_LOGOUT: (state, action) => {
    return {}; // clear TV Shows
  }
}, showDataDefault)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// - seasonData reducer
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const seasonDataDefault = {};

const seasonDataReducer = handleActions({
  INIT_DATA: (state, action) => {
    return action.payload.seasonData;
  },
  ADD_TV_SHOW: (state, action) => { 
    return { ...state, [action.payload.showId]: action.payload.showObj.seasonData };
  },
  REFRESH_TV_SHOW: (state, action) => { 
    console.log('season refresh')
    return { ...state, [action.payload.showId]: action.payload.showObj.seasonData };
  },
  DELETE_TV_SHOW: (state, action) => {
    // filter removed the show object we want to delete, 
    // keyBy converts the array of objects returned by filter to an "Objects of Objects"
    return { ..._.keyBy(_.filter(state, (show) => show.showId !== action.payload), 'showId') }
  },
  AUTH_LOGOUT: (state, action) => {
    return {}; // clear TV seasons
  },
}, seasonDataDefault);

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// - userData reducer
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const userDataDefault = {};

const userDataReducer = handleActions({
  INIT_DATA: (state, action) => {
    return action.payload.userData;
  },
  DELETE_TV_SHOW: (state, action) => {
    return _.omit(state, [action.payload])
  },
  UPDATE_TV_IMAGE_POSTER: (state, action) => {
    return { ...state, [action.payload.showId]: { ...state[action.payload.showId], posterPath: action.payload.imageURL }}
  },
  ADD_LINK_TO_SHOW: (state, action) => {
    let { fbLinkKey, showId, linkObj } = action.payload;
    let currShowLinks = state[showId] ? { ...state[showId].links } : {};
    currShowLinks[fbLinkKey] = linkObj;
    return { ...state, 
      [showId]: { 
        ...state[showId], 
        links: currShowLinks 
      } 
    };
  },
  REMOVE_LINK_FROM_SHOW: (state, action) => {
    // filter removed the show object we want to delete, 
    // keyBy converts the array of objects returned by filter to an "Objects of Objects"
    //return { ..._.keyBy(_.filter(state, (show) => show.showId !== action.payload), 'showId') }
    let newState = { ...state }
    let showStateLinks = { ...newState[action.payload.showId].links }
    delete showStateLinks[action.payload.linkKey];

    return { ...newState, [action.payload.showId]: { links: {...showStateLinks}} }
  },
  UPDATE_USER_EPISODE_DATA: (state, action) => {
    // Update the download state action.payload = { showId, seasonId, EpisodeId, checkboxState }
    let { showId, seasonId, episodeId, userField, checkboxState } = action.payload;
    let userFieldKey = userField === 'WATCHED' ? 'watched' : 'downloaded';
    // Set flags for if show and season exist. Use to determine what we have to build
    const showExists = !!state[showId];
    const seasonExists = (showExists ? state[showId].seasons : false) ? !!state[showId].seasons[seasonId] : false;
    let newState = {};
    if (seasonExists) {
      newState = { ...state, 
        [showId]: { 
          ...state[showId], 
          seasons: { 
            ...state[showId].seasons, 
            [seasonId]: {
              episodes: {
                ...state[showId].seasons[seasonId].episodes,
                [episodeId]: {
                  ...state[showId].seasons[seasonId].episodes[episodeId],
                  [userFieldKey]: checkboxState
                }
              }
            }
          } 
        } 
      };
    } else if (showExists) {
      newState = { ...state, 
        [showId]: {
          ...state[showId], 
          seasons: {
            ...state[showId].seasons,
            [seasonId]: {
              episodes: {
                [episodeId]: {
                  [userFieldKey]: checkboxState
                }
              } 
            }
          }
        }
      };
    } else {
      newState = { ...state, 
        [showId]: { 
          seasons: {
            [seasonId]: {
              episodes: {
                [episodeId]: {
                  [userFieldKey]: checkboxState
                }
              } 
            }
          }
        }
      };
    }      
    return newState;
  },
  UPDATE_ALL_USER_FLAGS: (state, action) => {
    // Called when user updates ALL watched or downloaded flags in a season.
    // Update the user flags state action.payload = { showId, seasonId, episodes, userField, checkboxState }
    let { showId, seasonId, episodes, userField, checkboxState } = action.payload;
    let userFieldKey = userField === 'WATCHED' ? 'watched' : 'downloaded';
    // Set flags for if show and season exist. Use to determine what we have to build
    const showExists = !!state[showId];
    const seasonExists = (showExists ? state[showId].seasons : false) ? !!state[showId].seasons[seasonId] : false;
    let newState = {};
    if (seasonExists) {
      newState = { ...state, 
        [showId]: { 
          ...state[showId], 
          seasons: { 
            ...state[showId].seasons, 
            [seasonId]: {
              episodes: {
                ...state[showId].seasons[seasonId].episodes,
              }
            }
          } 
        } 
      };
    } else if (showExists) {
      newState = { ...state, 
        [showId]: {
          ...state[showId], 
          seasons: {
            ...state[showId].seasons,
            [seasonId]: {
              episodes: {} 
            }
          }
        }
      };
    } else {
      newState = { ...state, 
        [showId]: { 
          seasons: {
            [seasonId]: {
              episodes: {} 
            }
          }
        }
      };
    }  
    
    let episodesObj = {};
    
    if (seasonExists) {
      episodesObj = newState[showId].seasons[seasonId].episodes;
    }

    let newEpisodeObj = {};
    episodes.forEach(episode => {
      newEpisodeObj = { ...newEpisodeObj, [episode.id]: { ...episodesObj[episode.id], [userFieldKey]: checkboxState } }
    });
    
    // Create a copy of state so we don't mutate 
    ;
    // set the new episode array
    newState[showId].seasons[seasonId].episodes = newEpisodeObj;

    return newState;
  },
  AUTH_LOGOUT: (state, action) => {
    return {}; // clear TV seasons
  },
}, userDataDefault);


// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// - extraData reducer
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const extraDataDefault = {};

const extraDataReducer = handleActions({
  INIT_DATA: (state, action) => {
    return action.payload.extraData;
  },
  ADD_TV_SHOW: (state, action) => {
    return { ...state, [action.payload.showId]: action.payload.showObj.extraData };
  },
  REFRESH_TV_SHOW: (state, action) => {
    return { ...state, [action.payload.showId]: action.payload.showObj.extraData };
  },
  DELETE_TV_SHOW: (state, action) => {
    // filter removed the show object we want to delete, 
    // keyBy converts the array of objects returned by filter to an "Objects of Objects"
    return { ..._.keyBy(_.filter(state, (show) => show.showId !== action.payload), 'showId') }
  },
  AUTH_LOGOUT: (state, action) => {
    return {}; // clear TV extra data
  },
}, extraDataDefault);

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// - tagData reducer
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const tagDataDefault = {};

const tagDataReducer = handleActions({
  INIT_DATA: (state, action) => {
    return action.payload.tagData;
  },
  DELETE_TV_SHOW: (state, action) => {
    // Loop through members in each tag and remove show being deleted from members list
    let newMembers = {};
    let newState = {};
    Object.keys(state).forEach(tagKey => {
      newState = { ...newState,  
        [tagKey]: {
          ...state[tagKey],
          members: { ..._.omit(state[tagKey].members, action.payload)}
        }
      }
    });
    return newState;
  },
  ADD_TAG_NAME: (state, action) => {
    return { ...state,
      [action.payload.fbKey]: {
        tagName: action.payload.tagName,
        tagPosition: action.payload.tagPosition,
        members: {}
      }

    }
  },
  DELETE_TAG_NAME: (state, action) => {
    let newTags = { ...state };
    delete newTags[action.payload];
    return { ...newTags }
  },
  UPDATE_TAG_POSITION: (state, action) => {
    let tagPosArray = action.payload;
    let newTags = { ...state };
    tagPosArray.forEach(tag => {
      newTags[tag.tagKey] = { ...newTags[tag.tagKey], tagPosition: tag.tagPosition }
    });
    return { ...newTags }
  },
  ADD_TAG_TO_SHOW: (state, action) => {
    let { showId, showName, tagKey } = action.payload;
    let tagKeyData = { ...state[tagKey] };
    let members = { ...tagKeyData.members, [showId]: { showId, showName } };
    tagKeyData.members = { ...members }
    return { ...state, [tagKey]: { ...tagKeyData }};
  },
  UPDATE_SHOW_POSITION_IN_TAG:(state, action) => {
    // positionMap: [{ showId, position }, ...]
    let { tagKey, positionMap } = action.payload;
    let tagToModify = { ...state[tagKey] };
    let tagMembers = { ...tagToModify.members }
    for(const positionObj of positionMap) {
      tagMembers[positionObj.showId] = { ...tagMembers[positionObj.showId], position: positionObj.position}
    }
    tagToModify.members = tagMembers;   
    return { ...state, [tagKey]: { ...tagToModify }};
  },
  REMOVE_TAG_FROM_SHOW: (state, action) => {
    let { showMemberKey, tagKey } = action.payload;
    let newState = { ...state };
    let newMembers = { ...state[tagKey].members };
    delete newMembers[showMemberKey];
    return { ...newState, [tagKey]: { ...state[tagKey], members: { ...newMembers } }}
  },
  AUTH_LOGOUT: (state, action) => {
    return {}; // clear TV tag data
  },
}, tagDataDefault)

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// - error reducer
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const errorDataDefault = {};

const errorDataReducer = (state = errorDataDefault, action) => {
  switch (action.type) {
    case SET_TV_SHOW_ERROR: 
      return { ...state, error: true, message: action.payload }
    default:
      // I'm sure this is not the best idea, but didn't want to clear error on all other calls
      // Will continute to look for a better way.  Obviously, this means that any other redux action 
      // will clear the error.
      return { ...state, error: false, message: undefined};
  }
}

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
// - search reducer
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
const searchDataDefault = {
  searchTerm: undefined,
  andFlag: false,
  tagFilters: []
};

const searchDataReducer = handleActions({
  SET_TV_SEARCHTERM: (state, action) => {
    return { ...state, searchTerm: action.payload }
  },
  SET_TV_FILTER_ARRAY: (state, action) => {
    return { ...state, tagFilter: action.payload.tagFilter, andFlag: action.payload.andFlag }
  },
  ADD_TAG_TO_FILTER: (state, action) => {
    let newTagFilters = state.tagFilters ? [ ...state.tagFilters ] : [];
    newTagFilters.push(action.payload)
    return { ...state, tagFilters: newTagFilters}; // clear TV tag data
  },
  REMOVE_TAG_FROM_FILTER: (state, action) => {
    let newTagFilters = [];
    // only remove if tag is passed, otherwise we will clear the tagFilters
    if (action.payload) {
      newTagFilters = [...state.tagFilters]
      _.remove(newTagFilters, (tagKey) => tagKey === action.payload);
    }
    return { ...state, tagFilters: newTagFilters}; // clear TV tag data
  },
  ADD_EXCLUDE_TAG_TO_FILTER: (state, action) => {
    let newTagFilters = state.excludeTagFilters ? [ ...state.excludeTagFilters ] : [];
    newTagFilters.push(action.payload)
    return { ...state, excludeTagFilters: newTagFilters}; // clear TV tag data
  },
  REMOVE_EXCLUDE_TAG_FROM_FILTER: (state, action) => {
    let newTagFilters = [];
    // only remove if tag is passed, otherwise we will clear the tagFilters
    if (action.payload) {
      newTagFilters = [...state.excludeTagFilters]
      _.remove(newTagFilters, (tagKey) => tagKey === action.payload);
    }
    return { ...state, excludeTagFilters: newTagFilters}; // clear TV tag data
  },
}, searchDataDefault)

const reducer = combineReducers({
  showData: showDataReducer,
  seasonData: seasonDataReducer,
  extraData: extraDataReducer,
  userData: userDataReducer,
  tagData: tagDataReducer,
  errorData: errorDataReducer,
  searchData: searchDataReducer
});

export default reducer;