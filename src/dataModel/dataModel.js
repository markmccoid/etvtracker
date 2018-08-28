import _ from 'lodash';
import moment from 'moment';
import { getConfig, 
  getShowImages, 
  getShowDetails, 
  getEpisodes,
  getExternalIds } from '../api';
import { fb_DeleteTagName, 
  fb_AddTagName, 
  fb_UpdateTVAll,
  fb_DeleteTVShow,
  fb_DeleteTVShowFromTag,
  fb_UpdateDownloadedFlag,
  fb_UpdateWatchedFlag,
  fb_UpdateAllUserFlags,
  fb_UpdateTVPoserImage,
  fb_AddTagToShow,
  fb_UpdateShowPositionInTag,
  fb_RemoveTagFromShow,
  fb_AddLinkToShow,
  fb_RemoveLinkFromShow, 
  fb_UpdateTagPosition} from '../firebase/firebaseInterface';

import { formatDateStringForStorage } from '../utils/dates';



// -- Currently not using, but could be used to wrap async/await functions
// -- and catch their errors.
// -- export const dmFetchTVShowData = catchErrors(main_dmFetchTVShowData);
// function catchErrors(fn) {
//   return function (...arg) {
//     return fn(...arg).catch((err) => {
//       console.log(`Error in ${fn.name}.  Error: ${err}`);
//     });
//   };
// };

//--SYNCHRONOUS Image Functions --------------------------------------------------------------------
/**
 * Returns the full URL to an image.
 * 
 * @param {(string|string[])} imgFileName - file name of the image or Array of filenames.
 * @param {string} [size=m] - 's', *'m', 'l', 'original'.
 * @param {boolean} [secureURL=true] - return the https or http - *true
 * @returns {string[]} full URL to the image 
 */
export const getImageURLSync = (imgFileName, size = 'm', secureURL=true) => {
  
  // Hardcoding s, m, l for now
  switch (size) {
    case 's': 
      size = 'w185';
      break;
    case 'm': 
      size = 'w300';
      break;      
    case 'l': 
      size = 'w500';
      break;
    case 'original': 
      size = 'original';
      break;
    default:
      size = 'w300';
  }
  let baseURL = secureURL ? 'https://image.tmdb.org/t/p/' : 'http://image.tmdb.org/t/p/';
  // Get rid of any preceding '/'  in the passed imgFileName
  let regEx = /[^\/].*/;
  // If imgFileName IS NOT an array, then process as single file, but still return array
  if (!Array.isArray(imgFileName)) {
    return imgFileName ? [`${baseURL}${size}/${imgFileName.match(regEx)[0]}`] : [''];
  }
  // Process as an array and return an array, also make sure some value exists in each array slot.
  return imgFileName.map(file => file ? `${baseURL}${size}/${file.match(regEx)[0]}` : '');
};

/**
 * Returns an array of image URLs. Filters and gives only 'en' English images
 * 
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @param {string} [imageType=posters] - *'posters', 'backdrops'
 * @returns {string[]} Array of URLs to the images
 */
export const getImagesForShowSync = (showId, imageType = 'posters') => {
  return getShowImages(showId)
    .then((resp) => {
      // Get array of file_paths
      let imgFilePaths = resp.data[imageType].filter((imgObj) => imgObj.iso_639_1 === 'en')
        .map((imgObj) => {
        return imgObj.file_path;
      });
      // Get the full image URLs
      return getImageURLSync(imgFilePaths, 'm', true);
    });
};
//----------------------------------------------------------------------

/**
 * Returns the full URL to an image.
 * 
 * @param {(string|string[])} imgFileName - file name of the image or Array of filenames.
 * @param {string} [size=m] - 's', *'m', 'l', 'original'.
 * @param {boolean} [secureURL=true] - return the https or http - *true
 * @returns {string[]} full URL to the image
 */
export const getImageURL = async (imgFileName, size = 'm', secureURL=true) => {
  // Hardcoding s, m, l for now
  switch (size) {
    case 's': 
      size = 'w185';
      break;
    case 'm': 
      size = 'w300';
      break;      
    case 'l': 
      size = 'w500';
      break;
    case 'original': 
      size = 'original';
      break;
    default:
      size = 'w300';
  }
  let baseURL;
  let resp = await getConfig();
  // Get rid of any preceding '/'  in the passed imgFileName
  let regEx = /[^\/].*/;
  baseURL = resp.data.images[secureURL ? 'secure_base_url' : 'base_url'];
  // If imgFileName IS NOT an array, then process as single file, but still return array
  if (!Array.isArray(imgFileName)) {
    return imgFileName ? [`${baseURL}${size}/${imgFileName.match(regEx)[0]}`] : [''];
  }
  // Process as an array and return an array, also make sure some value exists in each array slot.
  return imgFileName.map(file => file ? `${baseURL}${size}/${file.match(regEx)[0]}` : '');
};

/**
 * Returns an array of image URLs. Filters and gives only 'en' English images
 * 
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @param {string} [imageType=posters] - *'posters', 'backdrops'
 * @returns {string[]} Array of URLs to the images
 */
export const getImagesForShow = (showId, imageType = 'posters') => {
  return getShowImages(showId)
    .then((resp) => {
      // Get array of file_paths
      let imgFilePaths = resp.data[imageType].filter((imgObj) => imgObj.iso_639_1 === 'en')
        .map((imgObj) => {
        return imgObj.file_path;
      });
      // Get the full image URLs
      return getImageURL(imgFilePaths, 'm', true);
    });
};

/**
 * @typedef {Object} TV
 * @property {Object} tvShow Primary data for a tvShow
 * @property {Object} seasonData The season data for the tv show (Object Key)
 * @property {Object} extraData Additional data for the tv show (Object Key)
 * @property {Object} userData User data for the tv show (Object Key)
 */
/**
 * First retrieves data from TMDb API and stores in Firebase
 * Then format the data and returns and object for the reducer to store in redux
 * Returns an object of objects -> tvShow: {}, seasonData: {}, extraData: {}
 * 
 * @param {(string)} uid - user id for firebase.
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @returns {TV} TV Object
 */
export const dmAddTVShowData = async (uid, showId) => {
  const showObj = await dmFetchTVShowData(showId, false);
  const { showData, seasonData, extraData, userDataLinks } = showObj
  await fb_UpdateTVAll(uid, showId, {showData, seasonData, extraData});
  
  return {showData, seasonData, extraData};
};

/**
 * @typedef {Object} TV
 * @property {Object} tvShow Primary data for a tvShow
 * @property {Object} seasonData The season data for the tv show (Object Key)
 * @property {Object} extraData Additional data for the tv show (Object Key)
 * @property {Object} userData User data for the tv show (Object Key)
 */
/**
 * First retrieves data from TMDb API and stores in Firebase
 * Then format the data and returns and object for the reducer to store in redux
 * Returns an object of objects -> tvShow: {}, seasonData: {}, extraData: {}
 * 
 * @param {(string)} uid - user id for firebase.
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @returns {TV} TV Object
 */
export const dmRefreshTVShowData = async (uid, showId) => {
  const showObj = await dmFetchTVShowData(showId, true);
  const { showData, seasonData, extraData, userDataLinks } = showObj
  await fb_UpdateTVAll(uid, showId, {showData, seasonData, extraData});

  return {showData, seasonData, extraData};
};

/**
 * @typedef {Object} TV
 * @property {Object} tvShow Primary data for a tvShow
 * @property {Object} seasonData The season data for the tv show (Object Key)
 * @property {Object} extraData Additional data for the tv show (Object Key)
 */
/**
 * First retrieves data from TMDb API and stores in Firebase
 * Then format the data and returns and object for the reducer to store in redux
 * Returns an object of objects -> tvShow: {}, seasonData: {}, extraData: {}
 * 
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @param {boolean} updateFlag - Flag to determine if we are adding or updating
 * @returns {TV} TV Object
 */
export const dmFetchTVShowData = async (showId, updateFlag) => {
  let resp = await getShowDetails(showId);
  let respShowData = resp.data; 
  // Format and hydrate showData
  let images = getImageURLSync([respShowData.backdrop_path, respShowData.poster_path], 'm', true);
  let genres = respShowData.genres.map(genre => genre.name);
  // set data
  let showData = {
    showId: showId,
    name: respShowData.name,
    backdropPath: images[0],
    posterPath: images[1],
    status: respShowData.status,
    genres,
    firstAirDate: formatDateStringForStorage(respShowData.first_air_date),
    lastAirDate: formatDateStringForStorage(respShowData.last_air_date),
    totalEpisodes: respShowData.number_of_episodes,
    totalSeasons: respShowData.number_of_seasons,
    overview: respShowData.overview,
    lastRefresh: moment(new Date()).valueOf()
  };
  // Format and hydrate season data
  let seasonData = await createSeasonData(showId, respShowData.seasons);
  // Build userData
  // let userData = buildUserData(showId, seasonData);
  // Format and hydrate extraData
  let extraData = await createExtraData(showId, showData.name);
  // Extract the links because we will use that in user data
  let userDataLinks = { ...extraData.links };

  // remove links from extraData
  extraData = _.omit(extraData, 'links');
  
  // Build showObj that will be returned.
  //let showObj = { showData, seasonData, userData: userData.seasonUserObj, userDataFB: userData.seasonUserObjFB, extraData }
// Test without userData
  let showObj = { showData, seasonData, extraData, userDataLinks }
//TODO - Need to pass the userData, which is just links: imdb link now and load into firebase on adding of show.
  // Add show object to Firebase
  return showObj;
};

/**
 * Part of the dmFetchTVShowData functions actions
 * takes the array of seasons and returns formatted object with 
 * seasons and episode data for each season
 * Returns an object -> { name: , ... episodes: {}}
 * 
 * @param {(string)} showId - showId from TMDb API Show Search.
 * @param {object[]} season array
 * @returns {object} seasonsObj
 */
const createSeasonData = async (showId, seasons) => {
  // create an array of season but exclude any season_number = 0
  let seasonArray = await Promise.all(seasons.filter((season) => season.season_number !== 0)
    .map(async (season, idx) => {
      return await createSeasonEpisodeData(showId, idx+1);
    })
    );
   
    // Prepending an S for each season number in key
    // This is because of firebase's behaviour of treating any integer keys as arrays
    // It would return an array, so this is making it return an object
    // BUT instead decided to use the season id as the object key
    let seasonsObj = {
      showId: showId,
    };
    seasonArray.forEach((season) => {
      seasonsObj = {
        ...seasonsObj,
        [`${season.id}`]: season
      };
    });
  return seasonsObj;
};

const createSeasonEpisodeData = async (showId, seasonNum) => {
  let resp = await getEpisodes(showId, seasonNum);
  let seasonObj = resp.data;
  let episodeArray = seasonObj.episodes;
  let posterImage = getImageURLSync(seasonObj.poster_path, 'm', true);
  let episodes = await formatEpisodes(episodeArray);

  return {
    id: seasonObj.id,
    number: seasonObj.season_number,
    name: seasonObj.name,
    airDate: formatDateStringForStorage(seasonObj.air_date),
    overview: seasonObj.overview,
    posterPath: posterImage[0],
    episodes: episodes
  };
};

const formatEpisodes = (episodeArray) => {
  return episodeArray.map((episode) => {
      return {
        id: episode.id,
        number: episode.episode_number,
        airDate: formatDateStringForStorage(episode.air_date),
        name: episode.name,
        stillPath: getImageURLSync(episode.still_path, 'm', true)[0], 
        overview: episode.overview
      };
    });

};

//!! NOTE: don't call this any more only update user data one piece at a time
const buildUserData = (showId, seasonData) => {
  let seasonArray = Object.keys(seasonData).filter(key => key !== 'showId').map((season, idx) => {

    let userEpisodes = seasonData[season].episodes.map(episode => ({ id: episode.id, downloaded: false, watched: false }))
    
    return {
      id: seasonData[season].id,
      // Create episode array 
      episodes: userEpisodes
    }
  });

// Start creating the seasonUserObj, it will be in format of
/* {
      showId: 21213,
        seasons: {
          123123: { //seasonId
            episodes: []
          },
          323455: {
            episodes: []
          },
          ...    
        }
    }
}
*/ 
  let seasonUserObj = {};
  seasonArray.forEach(season => {
    seasonUserObj.seasons = { ...seasonUserObj.seasons, [season.id]: { episodes: season.episodes }}
  });
  seasonUserObj = {
    ...seasonUserObj,
    showId: showId,
  };
  // seasonUserObj is for redux
  // Now create seasonUserObjFB for firebase which converts array of object to object of objects

  let seasonUserObjFB = {};  

  seasonArray.forEach(season => {
    seasonUserObjFB.seasons = { ...seasonUserObjFB.seasons, [season.id]: { episodes: _.keyBy(season.episodes, 'id') }}
  });

  seasonUserObjFB = {
    ...seasonUserObjFB,
    showId: showId,
  }
  
// return both redux object and Firebase object
  return {seasonUserObj, seasonUserObjFB};
}

const createExtraData = async (showId, showName) => {
  let { data: extData } = await getExternalIds(showId);
  let externalIds = {
    imdbId: extData.imdb_id,
    tvRageId: extData.tvrage_id
  };
  let links = {
    imdbLink: {
      linkDescription: 'IMDB Link',
      link: `http://www.imdb.com/title/${extData.imdb_id}`,
    },
  };
  return {
    showId: showId,
    externalIds,
    links
  }
};

export const dmDeleteTVShow = async (uid, showId, tagKeys) => {
  // tagKeys is an array with tags that have the showId as a member
  // fb_DeleteTVShow will delete the member from tag
  await fb_DeleteTVShow(uid, showId, tagKeys);
  for (const tagKey of tagKeys) {
    await fb_DeleteTVShowFromTag(uid, showId, tagKey)
  }
};

/**
 * Update user downloaded or watched Data
 * 
 * @param string uid - firebase uid
 * @param number showId - showId to update
 * @param number seasonId - seasonId to update
 * @param number episodeId - episodeId to update
 * @param string userField - WATCHED/DOWNLOADED determines which field to update
 * @param boolean checkboxState - true or false
 * @returns promise
 */
export const dmUpdateUserEpisodeData = (uid, showId, seasonId, episodeId, userField, checkboxState) => {
  switch (userField) {
    case 'WATCHED': 
      return fb_UpdateWatchedFlag(uid, showId, seasonId, episodeId, checkboxState);
    case 'DOWNLOADED': 
      return fb_UpdateDownloadedFlag(uid, showId, seasonId, episodeId, checkboxState);
    default:
      return null;
  }
}

/**
 * Update user downloaded or watched Data
 * 
 * @param string uid - firebase uid
 * @param number showId - showId to update
 * @param number seasonId - seasonId to update
 * @param object episodes - episodes formatted for firebase update
 * @param string userField - WATCHED/DOWNLOADED determines which field to update
 * @param boolean checkboxState - true or false
 * @returns promise
 */
export const dmUpdateAllUserFlags = (uid, showId, seasonId, episodes, userField, checkboxState) => {
  // Build update object for firebase update
  // { showId: {
  //    seasonId: {
  //     episodeId: {
  //       watched: true;
  //     }
  //   }
  //  }
  // }
  // Send the firebase update the following:
  // uid, showId, seasonId, episodeIdArray, userFieldKey, checkboxState
  let userFieldKey = userField === 'WATCHED' ? 'watched' : 'downloaded'
  let episodeIdArray = episodes.map(episode => episode.id);
    
  return fb_UpdateAllUserFlags(uid, showId, seasonId, episodeIdArray, userFieldKey, checkboxState);
}

/**
 * Updates the TV/showData.posterImage key
 * 
 * @param string uid - firebase uid
 * @param number showId - showId to update
 * @param string imageURL - image poster URL
 * @returns promise
 */
export const dmUpdateTVPosterImage = (uid, showId, imageURL) => {
  return fb_UpdateTVPoserImage(uid, showId, imageURL);
}

/**
 * Adds/Updates the TV/tagData
 * 
 * @param string uid - firebase uid
 * @param string tagName - tagName
 * @returns promise / firebase key
 */
export const dmAddTagName = (uid, tagName, tagPosition) => {
  return fb_AddTagName(uid, tagName, tagPosition)
    .then(resp => resp.key);
}

/**
 * Deletes the TV/tagData/[tagName]
 * 
 * @param string uid - firebase uid
 * @param string tagName - tagName
 * @returns promise 
 */
export const dmDeleteTagName = (uid, tagKey) => {
  return fb_DeleteTagName(uid, tagKey);
}

/**
 * Updates the TV/tagData/[tagKey].tagPosition
 * 
 * @param string uid - firebase uid
 * @param string tagPosArray - Array of tagKeys and tagPositions
 * @returns promise 
 */
export const dmUpdateTagPosition = (uid, tagPosArray) => {
  return fb_UpdateTagPosition(uid, tagPosArray);
}
/**
 * Adds the showId to the TV/tagData/[tagName]/members
 * 
 * @param string uid - firebase uid
 * @param string showId - tmdb showId
 * @param string showName - tmdb showName **Currently not used elsewhere however it is stored in firebase
 * @param string tagName - tagName
 * @returns promise / firebase key 
 */
export const dmAddTagToShow = (uid, showId, showName, tagKey) => {
  return fb_AddTagToShow(uid, showId, showName, tagKey);
}

/**
 * Updates the position of showId in the TV/tagData/[tagName]/members object
 * 
 * @param string uid - firebase uid
 * @param string showId - tmdb showId
 * @param string tagName - tagName
 * @param string position - position of show in sidebar
 * @returns promise / firebase key 
 */
export const dmUpdateShowPositionInTag = (uid, tagKey, positionMap) => {
  //Need to do that loop async or let fb_Upd... build a single update??
  return fb_UpdateShowPositionInTag(uid, tagKey, positionMap);
}
/**
 * Removes the showId from the TV/tagData/[tagName]/members
 * 
 * @param string uid - firebase uid
 * @param string showMemberKey - firebase member key for this showId
 * @param string tagName - tagName
 * @returns promise / firebase key 
 */
export const dmRemoveTagFromShow = (uid, showMemberKey, tagKey) => {
  return fb_RemoveTagFromShow(uid, showMemberKey, tagKey);
}

/**
 * Adds the Link info { linkName, link } the TV/extraData/[showId]/links
 * 
 * @param string uid - firebase uid
 * @param string showId - showId from TMDb
 * @param object linkObj
 * @returns promise / firebase key 
 */
export const dmAddLinkToShow = (uid, showId, linkObj) => {
  return fb_AddLinkToShow(uid, showId, linkObj)
    .then(resp => resp.key);
}

/**
 * Removes the Link info { linkName, link } the TV/extraData/[showId]/links
 * 
 * @param string uid - firebase uid
 * @param string linkKey - FB LinkKey 
 * @returns promise / firebase key 
 */
export const dmRemoveLinkFromShow = (uid, showId, linkKey) => {
  return fb_RemoveLinkFromShow(uid, showId, linkKey);
}
