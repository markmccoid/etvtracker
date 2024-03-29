import _ from 'lodash';
import moment from 'moment';
import { getNextEpisode } from './helpers';

/**
 * Returns data need for display of shows in sidebar
 * 
 * @param {object} showData - Object of showData as formatted in redux store
 * @param {string} searchTerm - Search string to filter return data by (show.name)
 * @param {string} tagData - from redux store
 * @param {array} andfilterKeys - tagKeys that we are filtering by
 * @param {boolean} andFlag - are we ANDing or ORing
 * @param {array} excludeTagFilters - tagKeys whose members are to be exluded
 * @returns {string[]} Returns an array of objects with needed show data
 */
export const getSidebarData = (showData, 
    searchTerm = '', 
    tagData, 
    tagFilters = [], 
    andFlag = true, 
    excludeTagFilters = [],
    sortBy = undefined,
  ) => {
  let filteredShowData = _.sortBy(showData, ['name']);
  // - getMembers for tagFilter
  let members = getMembers(tagData, tagFilters, andFlag)
  // - get show data for members if members found and filter tags passed
  // - need to check filter length so if tagFilter passed returns zero members. we would show no results
  if (members.length || tagFilters.length) {
    filteredShowData = members.map(showId => {
      return { ...showData[showId] } 
    });
  }
  
  // get members to exclude
  let excludeMembers = getMembers(tagData, excludeTagFilters, false)
  let availableMembers = _.map(filteredShowData, 'showId');
  let finalMembers = _.difference(availableMembers, excludeMembers)
  // Hydrate filteredShowData
  filteredShowData = finalMembers.map(showId => {
      return { ...showData[showId] } 
    });
  // Apply searchTerm and return showObj with show data
  filteredShowData = _.map(_.filter(filteredShowData, (showObj) => showObj.name.toLowerCase().includes(searchTerm)),
                        (showObj) => showObj);
  // check sort option
  switch (sortBy) {
    case 'date-desc':
      filteredShowData = _.reverse(_.sortBy(filteredShowData,'nextEpisodeDate'));
      break;
    case 'date-asc':
      filteredShowData = _.sortBy(filteredShowData,'nextEpisodeDate');
      break;
    case 'name-desc':
      filteredShowData = _.reverse(_.sortBy(filteredShowData,'name'));
      break;
    default:
      break;
  }
  return filteredShowData;
}

function getMembers(tagData, andFilterTags, andFlag) {
  let validMembers = {}
  // Single filter tag
  if (andFilterTags.length === 1) {
    validMembers = { ...tagData[andFilterTags[0]].members }
    validMembers = _.sortBy(_.flatMap(validMembers), 'position')
      .map(member => member.showId);
    return validMembers;
  }

  // ORing tag members togething
  if (!andFlag){
    // Since storing in an object with showIds as keys, 
    // there won't be duplicates if show is member of multiple filter keys
    andFilterTags.forEach(tagKey => {
      validMembers = {...validMembers, ...tagData[tagKey].members}
    });
    // Convert object to an array, then sort by position field
    validMembers = _.sortBy(_.flatMap(validMembers), 'position')
      .map(member => member.showId);
    return validMembers;
  }

  // ANDing tag members together
  let memberMap = {};
  andFilterTags.forEach(tagKey => {
    for(const memberKey in tagData[tagKey].members) {
      memberMap[memberKey] = memberMap[memberKey] ? memberMap[memberKey] + 1 : 1
    }
  });
  validMembers = Object.keys(memberMap)
    .filter(memberKey => memberMap[memberKey] === andFilterTags.length)
    .map(showId => parseInt(showId));
  // Just an array of showIds. Not sorted
  return validMembers;
}
/**
 * Returns data need for display of shows in sidebar
 * 
 * @param {object} showData - Object of showData as formatted in redux store
 * @param {string} searchTerm - Search string to filter return data by (show.name)
 * @param {string} tagData - from redux store
 * @param {string} filterKeys - tagKeys that we are filtering by
 * @param {boolean} andFlag - are we ANDing or ORing
 * @returns {string[]} Returns an array of objects with needed show data
 */
export const getSidebarDataOLD = (showData, searchTerm = '', tagData, filterKeys = [], andFlag = true) => {
  let filteredShowData = _.sortBy(showData, ['name']);
  // -- 1 -- First we are going to filter shows based on the filterKeys
  // Create an array of { showId, position } that are included in the tags passed
  let membersArray = [];
  let membersObj = {};
  
  filterKeys.forEach(filterTagKey => {
    membersArray = [ ...membersArray, ..._.flatMap(tagData[filterTagKey].members || {}, obj => ({showId: obj.showId, position: obj.position}))]
    membersObj = { ...membersObj, ...tagData[filterTagKey].members}
  });
  
  // If and(ing) i.e. only shows that fall into all categories
  // But if only one filter then don't create the map
  if (andFlag && filterKeys.length > 1) {
    // convert the array into an object that maps the keys and counts how many of them there are
    // This will allow us to see if a show exists in all filters passed.  This is needed if we are "anding"
    // the filters.  Meaning we only want shows that exist in filter1 AND filter2 AND ...
    let showMap = {};
    for (const showKey of membersArray) {
      showMap[showKey.showId] = showMap[showKey.showId] + 1 || 1;
    }
    // User showMap to only pick out the shows that were in all filters passed.
    // that is why we compare the count of each show to the filterKeys.length.
    // If three filters passed, then the show must have a count of 3 to be kept.
    // NOTE: we are reconstructing the membersArray which is an array of objects {showId, position}
    membersArray = Object.keys(showMap)
      .filter(showKey => showMap[showKey] >= filterKeys.length)
      .map(showKey => membersObj[showKey]);
  } else {
    membersArray = _.uniqBy(membersArray, 'showId');
  }
    // Only filterKeys array and membersArray arrays are NOT empty, do we apply filterKeys memberArray return obj.
  // i.e. if not filters were passed, then we don't do this, because we are showing all shows.
  if (filterKeys.length) {
    //filteredShowData = _.filter(showData, showObj => _.includes(membersArray, showObj.showId));
    let flatMembers = _.flatMap(membersArray, 'showId');

    filteredShowData = _.filter(showData, showObj => flatMembers.includes(showObj.showId));
    // filteredShowData.forEach((showObj, idx) => {
    //   filteredShowData[idx] = { ...showObj, }
    // })
  }
  // Loop through the filteredShowData array adding the position property
  // Using the membersObj built will building the membersArray to make accessing the position data easier (by showId key)
  filteredShowData.forEach((filterShow, idx) => {
    if (filterKeys.length ===0) { return }
    filteredShowData[idx] = { ...filteredShowData[idx], position: membersObj[filterShow.showId].position || 0 }
  });
  // -- 2 -- Next we create the return set of shows by applying any searchTerm that was passed
  // create an array of shows
  let showArray = [];
  //pass the filtered showData (by searchTerm) as the object for lodash's map function.
  showArray = _.map(_.filter(filteredShowData, (showObj) => showObj.name.toLowerCase().includes(searchTerm)),
                   (showObj) => showObj);
  // Sort by the position property
  showArray = _.orderBy(showArray, 'position');

  return showArray || [];
};

/**
 * Returns all TVShowData in array format
 * @param {string} showData - redux showData object
 * @returns {string[]} Returns an array of objects with all tvshowdata
 */
export const getAllShowData = (showData) => {
  // create an array of shows
  let showArray = [];
  showArray = _.sortBy(_.map(showData, (showObj) => ({ ...showObj })), 'name');
  return showArray || [];
};

/**
 * Returns on object with show data for the showId passed in
 * 
 * @param {number} showId - Id of show to return data for
 * @param {object} showData - Object of objects of showData as formatted in redux store
 * @param {object} userData - Object of objects of userData as formatted in redux store
 * @returns {object} Returns an object of show data
 */
export const getCurrentShow = (showId, showData, userData) => {
  // Create an object holding the passed show Ids data
  let currShow = {};
  currShow = showData[showId];
  let currShowUserData = userData[showId] ? userData[showId] : {};
  let posterPath = currShowUserData.posterPath ? currShowUserData.posterPath : currShow.posterPath;
  // Format moment dates
  if (currShow) {
    currShow = { ...currShow, 
      firstAirDate: moment(currShow.firstAirDate).format("MM/DD/YYYY"),
      lastAirDate: moment(currShow.lastAirDate).format("MM/DD/YYYY"),
      posterPath: posterPath,
    }
  }
  
  return currShow || {};
}

/**
 * Returns an object with the season data for the showId passed in
 * 
 * @param {number} showId - Id of show to return data for
 * @param {object} seasonData - Object of objects seasonData as formatted in redux store
 * @param {object} userData - Object of objects seasonData as formatted in redux store
 * @returns {object} Returns an object of season data
 */
export const getCurrentSeasons = (showId, seasonData, userData) => {
  let currSeasons = {};
  currSeasons = seasonData[showId];
  // if no seasons, then return empty object
  if (!currSeasons) {
    return {};
  }
  
  //-- Start Load userData -----
  // FIRST Build the userData episode object 
  // Need to be VERY careful NOT to mutate state.  Since I am restructuring the data it 
  // mucks everything if you actually mutate the redux state.
  let seasonUserDataTemp = userData[showId] ? { ...userData[showId].seasons } : {};
  
  let seasonUserData = {}
  // Looping through the season Ids and modify the episode array into an episode object with the episode id as the key
  // lodash's .keyBy does this for us.
  // Also we need to filter out the showId key
  Object.keys(seasonUserDataTemp).filter((seasonKey) => seasonKey !== 'showId').forEach(seasonKey => {
    // Before converting Array to an object, count the number of watched and downloaded episodes in the season
    let totalEpisodes = currSeasons[seasonKey].episodes.length;
    // let watchedEpisodes = seasonUserDataTemp[seasonKey].episodes.filter(episode => episode.watched === true).length;
    // let downloadedEpisodes = seasonUserDataTemp[seasonKey].episodes.filter(episode => episode.downloaded === true).length;
    let watchedEpisodes = Object.keys(seasonUserDataTemp[seasonKey].episodes)
      .reduce((sum, episodeKey) => seasonUserDataTemp[seasonKey].episodes[episodeKey].watched ? sum + 1 : sum ,0);
    let downloadedEpisodes = Object.keys(seasonUserDataTemp[seasonKey].episodes)
      .reduce((sum, episodeKey) => seasonUserDataTemp[seasonKey].episodes[episodeKey].downloaded ? sum + 1 : sum ,0);
    // Add to the seasonUserData Object (one season at a time)
    seasonUserData[seasonKey] = { ...seasonUserDataTemp[seasonKey] , 
      totalEpisodes,
      watchedEpisodes,
      downloadedEpisodes,
      episodes: { ...seasonUserDataTemp[seasonKey].episodes }
    }
  })
  //-- END Load userData -----
  // console.log('seasonUserData', seasonUserData);
  // return an array of seasons with an array of episodes embedded
  let newCurrSeasons = [];
  Object.keys(currSeasons).forEach(seasonKey => {
    let workingSeason = currSeasons[seasonKey] ? 
        currSeasons[seasonKey].episodes ? currSeasons[seasonKey] : 
          { ...currSeasons[seasonKey], episodes: {}} : null;
    let workingUserSeason = seasonUserData[seasonKey] ? seasonUserData[seasonKey] : { seasons: {episodes: {}}};
  
    // showId is a key and doesn't have season info in it, so skip it
    // and if there are no episodes array, then skip
    if (seasonKey !== 'showId' && workingSeason.episodes.length !== undefined) {
      let episodes = [...workingSeason.episodes];
      let userEpisodes =  { ...workingUserSeason.episodes };
      // get the summary data built during the userdata extract
      let workingSeasonSummary = {
        totalEpisodes: workingUserSeason.totalEpisodes,
        watchedEpisodes: workingUserSeason.watchedEpisodes,
        downloadedEpisodes: workingUserSeason.downloadedEpisodes 
      };

      let updEpisodes = [];
      //Loop through episodes and format date 
      // *** NOTE we are using Object.keys on an Array, we should change this.
      //  used to be that this was an object
      Object.keys(episodes).forEach(episodeKey => {
        updEpisodes.push({ ...episodes[episodeKey], 
          airDate: moment(episodes[episodeKey].airDate).format("MM/DD/YYYY"),
          downloaded: userEpisodes[episodes[episodeKey].id] ? userEpisodes[episodes[episodeKey].id].downloaded : false,
          watched: userEpisodes[episodes[episodeKey].id] ? userEpisodes[episodes[episodeKey].id].watched : false
        });
      });
      workingSeason= { ...workingSeason, ...workingSeasonSummary, episodes: _.sortBy(updEpisodes, ['number'])};
      // This is the old array based episodes
      // workingSeason.episodes = [ ...episodes.map(episode => 
      //     ({ ...episode, airDate: moment(episode.airDate).format("MM/DD/YYYY")}))];
      // Push the season on the array, formatting the season airdate as we do that.          
      newCurrSeasons.push({
        ...workingSeason, 
        airDate: moment(workingSeason.airDate).format("MM/DD/YYYY")
      });
    }
  });
  //console.log('selectors-seasons', newCurrSeasons)
  return _.orderBy(newCurrSeasons, ['number'], ['desc']);
}

/**
 * Returns an object with the extraData for the showId passed in
 * 
 * @param {number} showId - Id of show to return data for
 * @param {object} extraData - Object of extraData as formatted in redux store
 * @returns {object} Returns an object of season data
 */
export const getExtraDataForShow = (showId, extraData) => {
  return extraData[showId];
}


/**
 * Returns an object with the userData for the showId passed in.  Will be in the format of
 * { 12332: { //Season ID <br />
 *    55645:{ //Episode ID <br />
 *      download: true/false <br />
 *      watched: true/false <br />
 *     }, <br />
 *    52333: { //Episode ID <br />
 *      downloaded: true/false, <br />
 *      watched: true/false <br />
 *     }, <br />
 *    ... <br />
 *   } <br />
 * }
 * 
 * @param {number} showId - Id of show to return data for
 * @param {object} userData - Object of Season objects with Episode Array in each season userData as formatted in redux store
 * @returns {object} Returns an object of User data
 */
export const getUserEpisodeData = (showId, userData) => {
  // Need to be VERY careful NOT to mutate state.  Since I am restructuring the data it mucks everything if you actually
  // mutate the redux state.
  let seasonData = { ...userData[showId] };
  let seasonUserData = {}
  // Looping through the season Ids and modify the episode array into an episode object with the episode id as the key
  // lodash's .keyBy does this for us.
  Object.keys(seasonData).forEach(seasonKey => {
    seasonUserData[seasonKey] = { ...seasonData[seasonKey] , episodes: { ..._.keyBy(seasonData[seasonKey].episodes, 'id') } }
  })
  
  return seasonUserData;
}

/**
 * Returns an array of Tag data.  
 * All tags, plus a flag "isMember" telling if the show is a member of the tag
 * Used when displaying tag info for specific shows (TVDetail, QuickTags)
 * 
 * @param {number} showId - Id of show to return data for
 * @param {object} tagData - Object of tagData
 * @returns {array} Returns an Array of objects of tag info with bool isMember indicating if passed showId is a member of the tag sorted by tagPosition
 * [ {tagKey, tagName, tagPosition, isMember, memberKey} ]
 */
export const getTagDataArray = (showId, tagData) => {
  // Build tag array --> { tagKey, tagName }
  let tagsArray = [];
  let membersArray = [];
  Object.keys(tagData).map(tagKey => {

    // Loop through member objects and create an array with an object {memberKey, showId}
    // Use this to populate isMember and memberKey if show is a member of a given tag
    // NOTE: memberKey is the showId.
    membersArray = Object.keys(tagData[tagKey].members || {}).map(member => {
      return { memberKey: member, showId: tagData[tagKey].members[member].showId}
    });
    let foundMember = membersArray.filter(member => member.showId === parseInt(showId));
    tagsArray.push({
      tagKey: tagKey,
      tagName: tagData[tagKey].tagName,
      tagPosition: tagData[tagKey].tagPosition,
      isMember: foundMember.length > 0 ? true : false,
      memberKey: foundMember.length > 0 ? foundMember[0].memberKey : null,
    });
  });
  return _.sortBy(tagsArray, ['tagPosition']);
}

/**
 * Returns an array of Tag data with showIds and showNames of members
 * [
 *  {
 *    tagKey,
 *    tagName,
 *    tagPosition,
 *    members: [showid, showid, ...]
 *  }
 * ]
 * 
 * @param {object} tagData - Object of tagData
 * @returns {array} Returns an Array of objects of tag info
 */
export const getTagDataWithMembers = (tagData) => {
  let tagArray = Object.keys(tagData).map(tag => {
    return {
      tagKey: tag,
      tagName: tagData[tag].tagName,
      tagPosition: tagData[tag].tagPosition,
      members: tagData[tag].members
    }
  });
  tagArray.forEach(tag => {
      tag.members = _.flatMap(tag.members, 'showId')
    }
  );

  return _.sortBy(tagArray, ['tagPosition']);
}

/**
 * Takes in all tags and the list of selected tags and returns
 * an array of tag objects with bool isSelected set for each tagKey
 * Used for setting Include AND exclude filters.
 * [
 *  {
 *    tagKey,
 *    tagName,
 *    tagPosition,
 *    isSelected
 *  }
 * ]
 * 
 * @param {object} tagData - Object of tagData
 * @param {array} selectedTags - Array of selected tags
 * @returns {array} Returns an Array of objects of tag info
 */
export const getTagFilterData = (tagData, selectedTags = []) => {
  let tagDataArray = Object.keys(tagData).map(tagKey => ({
      tagKey,
      tagName: tagData[tagKey].tagName,
      tagPosition: tagData[tagKey].tagPosition
    })
  );
  let finalList = tagDataArray.map(tag => {
    return {
      tagKey: tag.tagKey,
      tagPosition: tag.tagPosition,
      tagName: tag.tagName,
      isSelected: selectedTags.includes(tag.tagKey)
    }
  });
  return _.sortBy(finalList, ['tagPosition']);
}

/**
 * Takes in all tagData, list of selected tags and filter mode
 * return an object with a tagsSelected array with tagName that are selected
 * and the andFlag (and/or)
 *  {
 *    tagsSelected: [],
 *    andFlag
 *  }
 * 
 * @param {object} tagData - Object of tagData
 * @param {array} tagFilters - Array of selected filters
 * @param {string} andFlag - true/false
 * @param {array} excludeTagFilters - Array of selected Exclude tag filters
 * @returns {object} Returns an object with tagsSelected array of selected tags
 *  and the filterMode (And/Or based on the andFlag)
 *  and array of excluded tags
 */
export const getTagFilterSummary = (tagData, tagFilters = [], andFlag, excludeTagFilters = []) => {
  
  let tagsSelected = tagFilters.map(tagKey => tagData[tagKey].tagName);
  let excludeTagsSelected = excludeTagFilters.map(tagKey => tagData[tagKey].tagName);
  let filterMode = andFlag ? 'And' : 'Or';
  return { tagsSelected, filterMode, excludeTagsSelected }
}