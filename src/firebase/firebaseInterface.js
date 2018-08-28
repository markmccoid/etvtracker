import fbDatabase from './firebase';

/**
 * @typedef {Object} TV
 * @property {Object} tvShow Primary data for a tvShow
 * @property {Object} seasonData The season data for the tv show (Object Key)
 * @property {Object} extraData Additional data for the tv show (Object Key)
 */
/**
 * Returns the TV data for the passed uid.
 * 
 * @param {string} uid - firebase user id (uid)
 * @returns {promise} - Promise object resolve to TV Object {showData: {}, seasonData: {}, extraData: {}}
 */
export const fb_readTVData = (uid) => {
  return fbDatabase.ref(`users/${uid}/TV`).once('value')
    .then((snap) => {
      let data = snap.val();
      return data;
    })
    .catch((err) => {
      console.log(`Error in fb_readTVData: ${err}`);
    });
};

/** 
 * Updates the show data for the user in node TV/showData
 * 
 * @param {string} uid - firebase user id (uid)
 * @param {number} showId - showId from TMDB
 * @param {object} showData - showData object
 * @returns {promise} Promise resolves to ?
 */
export const fb_UpdateTVShow = (uid, showId, showData) => {
  return fbDatabase.ref(`users/${uid}/TV/showData`).update({
    [showId]: { ...showData }
  });
};

/**
 * Updates the season data in firebase for the user in node TV/seasonData
 * 
 * @param {string} uid 
 * @param {number} showId 
 * @param {object} seasonData 
 * 
 * @returns {promise} 
 */
export const fb_UpdateTVSeason = (uid, showId, seasonData) => {
  return fbDatabase.ref(`users/${uid}/TV/seasonData`).update({
    [showId]: { ...seasonData }
  });
};

/**
 * Updates the the showData, seasonData and extraData nodes in firebase.
 * This also acts as an Add operation.
 * 
 * @param {*} uid 
 * @param {*} showId 
 * @param {*} showObj 
 * 
 * @returns {promise}
 */
export const fb_UpdateTVAll = (uid, showId, showObj) => {
  let updates = {};
  updates[`users/${uid}/TV/showData/${showId}`] = { ...showObj.showData };
  updates[`users/${uid}/TV/seasonData/${showId}`] = showObj.seasonData;
  //updates[`users/${uid}/TV/userData/${showId}`] = showObj.userDataFB;
  updates[`users/${uid}/TV/extraData/${showId}`] = showObj.extraData;
  
  return fbDatabase.ref().update(updates);
}

/**
 * Deletes the the showData, seasonData and extraData nodes in firebase for uid and showId passed.
 * 
 * @param {*} uid 
 * @param {*} showId 
 * 
 * @returns {promise}
 */
export const fb_DeleteTVShow = (uid, showId) => {
  // Since we are removing multiple keys, we will use update setting to null
  let updates = {};
  updates[`users/${uid}/TV/showData/${showId}`] = null;
  updates[`users/${uid}/TV/seasonData/${showId}`] = null;
  updates[`users/${uid}/TV/extraData/${showId}`] = null;
  updates[`users/${uid}/TV/userData/${showId}`] = null;

  return fbDatabase.ref().update(updates);
}

/**
 * Deletes the showId from the members object in the passed tag
 * 
 * @param {*} uid 
 * @param {*} showId 
 * @param {*} tagKey 
 * 
 * @returns {promise}
 */
export const fb_DeleteTVShowFromTag = (uid, showId, tagKey) => {
  // build tag (deletes)
  return fbDatabase.ref(`users/${uid}/TV/tagData/${tagKey}/members/${showId}`).remove();
}

/** 
 * Updates the user downloaded data for the user in node TV/userData
 * 
 * @param string uid - firebase user id (uid)
 * @param number showId - showId from TMDB
 * @param number seasonId - seasonId from TMDB
 * @param number episodeId - episodeId from TMDB
 * @param boolean checkboxState - checkboxState object
 * @returns promise Promise resolves to ?
 */
export const fb_UpdateDownloadedFlag = (uid, showId, seasonId, episodeId, checkboxState) => {
  return fbDatabase.ref(`users/${uid}/TV/userData/${showId}/seasons/${seasonId}/episodes/${episodeId}`).update({ 
    downloaded: checkboxState 
  });
};

export const fb_UpdateWatchedFlag = (uid, showId, seasonId, episodeId, checkboxState) => {
  return fbDatabase.ref(`users/${uid}/TV/userData/${showId}/seasons/${seasonId}/episodes/${episodeId}`).update({ 
    watched: checkboxState 
  });
};


export const fb_UpdateAllUserFlags = (uid, showId, seasonId, episodeIdArray, userFieldKey, checkboxState) => {
  let updates = {};
  episodeIdArray.forEach(episodeId => {
    updates[`users/${uid}/TV/userData/${showId}/seasons/${seasonId}/episodes/${episodeId}/${userFieldKey}`] = checkboxState;
  })
  
  return fbDatabase.ref().update(updates);
};

export const fb_UpdateTVPoserImage = (uid, showId, imageURL) => {
  return fbDatabase.ref(`users/${uid}/TV/userData/${showId}`).update({
    posterPath: imageURL
  });
};

export const fb_AddTagName = (uid, tagName, tagPosition) => {
  return fbDatabase.ref(`users/${uid}/TV/tagData`).push({
    tagName,
    tagPosition
  });
};

export const fb_DeleteTagName = (uid, tagKey) => {
  return fbDatabase.ref(`users/${uid}/TV/tagData/${tagKey}`).remove();
};

export const fb_UpdateTagPosition = (uid, tagPosArray) => {
  let updates = {};
  tagPosArray.forEach(tag => {
    updates[`users/${uid}/TV/tagData/${tag.tagKey}/tagPosition`] = tag.tagPosition;
  });
  
  return fbDatabase.ref().update(updates);
}

export const fb_AddTagToShow = (uid, showId, showName, tagKey) => {
  return  fbDatabase.ref(`users/${uid}/TV/tagData/${tagKey}/members/${showId}`).update({
    showId, 
    showName
  });
};

export const fb_UpdateShowPositionInTag = (uid, tagKey, positionMap) => {
  // positionMap: [{ showId, position }, ...]
  let updateStmt = {};
  // loop through positionMap and create update statement
  for(const positionObj of positionMap) {
    updateStmt[`users/${uid}/TV/tagData/${tagKey}/members/${positionObj.showId}/position`] = positionObj.position
  }
  console.log('fb Update', updateStmt)
  return  fbDatabase.ref().update(updateStmt);
};

export const fb_RemoveTagFromShow = (uid, showMemberKey, tagKey) => {
  return  fbDatabase.ref(`users/${uid}/TV/tagData/${tagKey}/members/${showMemberKey}`).remove();
};

export const fb_AddLinkToShow = (uid, showId, linkObj) => {
  return fbDatabase.ref(`users/${uid}/TV/userData/${showId}/links`).push(linkObj);
}

export const fb_RemoveLinkFromShow = (uid, showId, linkKey) => {
  return  fbDatabase.ref(`users/${uid}/TV/userData/${showId}/links/${linkKey}`).remove();
};