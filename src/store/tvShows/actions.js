import moment from 'moment';
import _ from 'lodash';

import { createActions, handleActions, combineActions } from 'redux-actions';
import { dmAddTVShowData, 
  dmRefreshTVShowData,
  dmGetInitialData, 
  dmDeleteTVShow, 
  dmUpdateUserEpisodeData,
  dmUpdateAllUserFlags,
  dmUpdateTVPosterImage,
  dmAddTagName,
  dmUpdateTagPosition,
  dmUpdateShowPositionInTag,
  dmDeleteTagName,
  dmAddTagToShow,
  dmRemoveTagFromShow,
  dmAddLinkToShow,
  dmRemoveLinkFromShow, } from '../../dataModel';

// -- Init data Action Types
export const INIT_DATA = 'INIT_DATA';
// -- TV Show Action Types
export const ADD_TV_SHOW = 'ADD_TV_SHOW';
export const DELETE_TV_SHOW = 'DELETE_TV_SHOW';
export const SET_TV_SHOW_ERROR = 'SET_TV_SHOW_ERROR';
export const UPDATE_USER_EPISODE_DATA = 'UPDATE_USER_EPISODE_DATA';
export const UPDATE_ALL_USER_FLAGS = 'UPDATE_ALL_USER_FLAGS';
export const UPDATE_TV_IMAGE_POSTER = 'UPDATE_TV_IMAGE_POSTER';
export const REFRESH_TV_SHOW = 'REFRESH_TV_SHOW';
export const ADD_TAG_NAME = 'ADD_TAG_NAME';
export const DELETE_TAG_NAME = 'DELETE_TAG_NAME';
export const UPDATE_TAG_POSITION = 'UPDATE_TAG_POSITION';
export const ADD_TAG_TO_SHOW = 'ADD_TAG_TO_SHOW';
export const UPDATE_SHOW_POSITION_IN_TAG = 'UPDATE_SHOW_POSITION_IN_TAG';
export const REMOVE_TAG_FROM_SHOW = 'REMOVE_TAG_FROM_SHOW';
export const SET_TV_FILTER_AND_FLAG = 'SET_TV_FILTER_AND_FLAG';
export const ADD_TAG_TO_FILTER = 'ADD_TAG_TO_FILTER';
export const REMOVE_TAG_FROM_FILTER = 'REMOVE_TAG_FROM_FILTER';
export const ADD_EXCLUDE_TAG_TO_FILTER = 'ADD_EXCLUDE_TAG_TO_FILTER';
export const REMOVE_EXCLUDE_TAG_FROM_FILTER = 'REMOVE_EXCLUDE_TAG_FROM_FILTER';
export const ADD_LINK_TO_SHOW = 'ADD_LINK_TO_SHOW';
export const REMOVE_LINK_FROM_SHOW = 'REMOVE_LINK_FROM_SHOW';
// -- TV Show filters
export const SET_TV_SEARCHTERM = 'SET_TV_SEARCHTERM';
export const SET_TV_SORT = 'SET_TV_SORT';
// ************************************************
// - CREATE ACTION CREATORS
// ************************************************
export const {
  initData, // Passed the TVNode data
  addTvShow,
  refreshTvShow,
  deleteTvShow,
  setTvShowError,
  setTvSearchterm,
  setTvSort,
  setTvFilterAndFlag,
  addTagToFilter,
  removeTagFromFilter,
  addExcludeTagToFilter,
  removeExcludeTagFromFilter,
  updateUserEpisodeData,
  updateAllUserFlags,
  updateTvImagePoster,
  addTagName,
  deleteTagName,
  updateTagPosition,
  updateShowPositionInTag,
  addTagToShow,
  removeTagFromShow,
  addLinkToShow,
  removeLinkFromShow,
} = createActions(
  {},
    ADD_TV_SHOW,
    DELETE_TV_SHOW,
    INIT_DATA,
    SET_TV_SHOW_ERROR,
    SET_TV_SEARCHTERM,
    SET_TV_SORT,
    SET_TV_FILTER_AND_FLAG,
    ADD_TAG_TO_FILTER,
    REMOVE_TAG_FROM_FILTER,
    ADD_EXCLUDE_TAG_TO_FILTER,
    REMOVE_EXCLUDE_TAG_FROM_FILTER,
    UPDATE_USER_EPISODE_DATA,
    UPDATE_ALL_USER_FLAGS,
    UPDATE_TV_IMAGE_POSTER,
    REFRESH_TV_SHOW,
    ADD_TAG_NAME,
    DELETE_TAG_NAME,
    UPDATE_TAG_POSITION,
    UPDATE_SHOW_POSITION_IN_TAG,
    ADD_TAG_TO_SHOW,
    REMOVE_TAG_FROM_SHOW,
    ADD_LINK_TO_SHOW,
    REMOVE_LINK_FROM_SHOW,
  );
  
// ************************************************
// - THUNKS
// ************************************************
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- INITIALIZE DATA ( INIT_DATA )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
export const startInitializeData = () => {
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    return dmGetInitialData(uid)
      .then((resp) => {
        dispatch(initData(resp));
      })
      .catch((err) => {
        console.log(`Error in startInitializeData: ${err}`);
      });
  };
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- ADD TV SHOW ( ADD_TV_SHOW )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
export const startAddTVShow = (showId) => {
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    return dmAddTVShowData(uid, showId)
      .then((showObj) => {
        dispatch(addTvShow({ showId, showObj }));
        // Dispatch a couple of build link calls, but they are asynchronis
        // -- https://www.justwatch.com/us/search?q=van%20helsing
        let linkObj = {
          link: `https://www.justwatch.com/us/search?q=${showObj.showData.name}`,
          linkDescription: 'Just Watch Check'
        }
        dispatch(startAddLinkToShow(showId, linkObj))
      })
      .catch((err) => {
        dispatch(setTvShowError({err, showId}))
      });
  };
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- REFRESH TV SHOW ( REFRESH_TV_SHOW )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
export const startRefreshTvShow = (showId, showStatus, forceRefresh = false) => {
  return (dispatch, getState) => {
    // if the show is ended, do not update
    let lastRefresh = moment(getState().TV.showData[showId].lastRefresh);
    let today = moment(new Date());

    if ((showStatus === 'Ended' || lastRefresh.isSame(today, 'day')) && !forceRefresh) {
      return null;
    }
    let uid = getState().auth.uid;
    return dmRefreshTVShowData(uid, showId)
      .then((showObj) => {
        dispatch(refreshTvShow({ showId, showObj }));
      })
      .catch((err) => {
        dispatch(setTvShowError({err, showId}))
      });
  };
};
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- UPDATE TV SHOW POSTER IMAGE USER DATA ( UPDATE_TV_IMAGE_POSTER )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
export const startUpdateTVImagePoster = (showId, imageURL) => {
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    return dmUpdateTVPosterImage(uid, showId, imageURL)
      .then(() => {
        dispatch(updateTvImagePoster({ showId, imageURL }));
      })
      .catch((err) => {
        dispatch(setTvShowError({err, showId}))
      });
  };
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- DELETE TV SHOW ( DELETE_TV_SHOW )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
//export const deleteTVShow = (showId) => ({ type: DELETE_TV_SHOW, showId })
export const startDeleteTVShow = (showId) => {
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    // find tags with this show as a member
    let tagData = getState().TV.tagData;
    let tagKeys = [];
    Object.keys(tagData).forEach(tagKey => {
      let membersObj = tagData[tagKey].members;
      if(_.find(membersObj, member => member.showId === showId)) {
        tagKeys.push(tagKey);
      }
    });
    return dmDeleteTVShow(uid, showId, tagKeys)
      .then(() => dispatch(deleteTvShow(showId)))
      .catch((err) => dispatch(deleteTvShow(err, showId)));
  };
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- UPDATE USER DATA ( UPDATE_DOWNLOADED_DATA, UPDATE_WATCHED_DATA )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// ! userField passed in update Obj will contain 'WATCHED', 'DOWNLOADED'
export const startUpdateUserEpisodeData = (updateObj) => {
  // destructure fields from update Object
  let { showId, seasonId, episodeId, userField, checkboxState } = updateObj;
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    // Update data in firebase
    return dmUpdateUserEpisodeData(uid, showId, seasonId, episodeId, userField, checkboxState)
      .then(() => {
        dispatch(updateUserEpisodeData(updateObj));
      })
      .catch((err) => {
        console.log(`Error in startUpdateUserEpisodeData: ${err}`);
      });
  };
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- UPDATE USER DATA ( UPDATE_ALL_USER_FLAGS )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// ! userField passed in update Obj will contain 'WATCHED', 'DOWNLOADED'
export const startUpdateAllUserFlags = (updateObj) => {
  // destructure fields from update Object
  let { showId, seasonId, episodes, userField, checkboxState } = updateObj;

  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    // Update data in firebase
    return dmUpdateAllUserFlags(uid, showId, seasonId, episodes, userField, checkboxState)
      .then(() => {
        dispatch(updateAllUserFlags(updateObj));
      })
      .catch((err) => {
        console.log(`Error in startUpdateAllUserFlags: ${err}`);
      });
  };
};

//! --------------------------------------
//! Tag Actions
//! --------------------------------------
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- ADD TAG DATA TO TAG DATA ( ADD_TAG_NAME )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
export const startAddTagName = (tagName) => {
  // destructure fields from update Object
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    // push tag name into firebase (user/TV/tagData)
    // this will return the firebase Key created, use this in store
    let tagPosition = _.flatMap(getState().TV.tagData, 'tagName').length + 1 || 1
    
    return dmAddTagName(uid, tagName, tagPosition)
      .then((fbKey) => {
        dispatch(addTagName({ fbKey, tagName, tagPosition }));
      })
      .catch((err) => {
        console.log(`Error in startAddTagName: ${err}`);
      });
  };
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- UPDATE TAG POSITION TO TAG DATA ( UPDATE_TAG_POSITION )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
export const startUpdateTagPosition = (tagPosArray) => {
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    dispatch(updateTagPosition(tagPosArray))
    return dmUpdateTagPosition(uid, tagPosArray)
      .catch((err) => console.log(`Error in startUpdateTagPosition: ${err}`))
  }
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- DELETE TAG NAME from tagData ( DELETE_TAG_NAME )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// ! NOTE: need to also make sure to delete from any userData nodes if saving data there too.
export const startDeleteTagName = (tagKey) => {
  // destructure fields from update Object
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    // Update data in firebase
    console.log(tagKey)
    return dmDeleteTagName(uid, tagKey)
      .then(() => {
        dispatch(deleteTagName(tagKey));
      })
      .catch((err) => {
        console.log(`Error in startDeleteTagName: ${err}`);
      });
  };
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- ADD TAG TO SHOW in tagData.{showId}.members.[] ( ADD_TAG_TO_SHOW )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
export const startAddTagToShow = (showId, tagKey) => {
  // destructure fields from update Object
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    let showName = getState().TV.showData[showId].name;

    // Update data in firebase
    return dmAddTagToShow(uid, showId, showName, tagKey)
      .then(() => {
        dispatch(addTagToShow({ showId, showName, tagKey }));
      })
      .catch((err) => {
        console.log(`Error in startAddTagToShow: ${err}`);
      });
  };
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- UPDATE SHOW POSITION in tagData.{showId}.members.[] ( UPDATE_SHOW_POSITION_IN_TAG )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
export const startUpdateShowPositionInTag = (tagKey, positionMap) => {
  // destructure fields from update Object
  
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    // Update position in redux first otherwise we get a flicker 
    // since we are waiting for DB to load before updating redux store
    dispatch(updateShowPositionInTag({ tagKey, positionMap }));
    // Update data in firebase
    return dmUpdateShowPositionInTag(uid, tagKey, positionMap)
      .then(() => {
        // nothing to dispatch
      })
      .catch((err) => {
        console.log(`Error in startUpdateShowPositionInTag: ${err}`);
      });
  };
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- REMOVE TAG FROM SHOW in tagData.{showId}.members.[] ( REMOVE_TAG_FROM_SHOW )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
export const startRemoveTagFromShow = (showMemberKey, tagKey) => {
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    // Update data in firebase
    
    return dmRemoveTagFromShow(uid, showMemberKey, tagKey)
      .then(() => {
        dispatch(removeTagFromShow({ showMemberKey, tagKey }));
      })
      .catch((err) => {
        console.log(`Error in startRemoveTagFromShow: ${err}`);
      });
  };
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- ADD LINK TO SHOW in extraData.{showId}.members.[] ( ADD_LINK_TO_SHOW )
// -- linkObj: { link, linkDescription }
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
export const startAddLinkToShow = (showId, linkObj) => {
  // destructure fields from update Object
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    // Update data in firebase
    
    return dmAddLinkToShow(uid, showId, linkObj)
      .then((fbLinkKey) => {
        dispatch(addLinkToShow({ fbLinkKey, showId, linkObj }));
      })
      .catch((err) => {
        console.log(`Error in startAddLinkToShow: ${err}`);
      });
  };
};

// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
// -- REMOVE LINK FROM SHOW in extraData.{showId}.links.[] ( REMOVE_LINK_FROM_SHOW )
// -=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=
export const startRemoveLinkFromShow = (showId, linkKey) => {
  // destructure fields from update Object
  return (dispatch, getState) => {
    let uid = getState().auth.uid;
    // Update data in firebase
    return dmRemoveLinkFromShow(uid, showId, linkKey)
      .then(() => {
        dispatch(removeLinkFromShow({ showId, linkKey }));
      })
      .catch((err) => {
        console.log(`Error in startRemoveLinkFromShow: ${err}`);
      });
  };
};