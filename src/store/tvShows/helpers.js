import _ from 'lodash'
import moment from 'moment'


//! ------------------------------------------
//! Returns the nextEpisode object - either episodeType is Last or Next 
//! Next indicating that the episode is today or in the future
//! { episodeType, nextEpisodeDate, nextEpisodeSeason, nextEpisodeNumber, nextEpisodeName }
/**
 * Updates the TV/showData.posterImage key
 * 
 * @param number showId - showId
 * @param object seasonData - seasonData Object from redux store
 * @param object showData - If true, then will return an array, otherwise, it returns and object of objects
 * @returns object - episodeObj - { episodeType, nextEpisodeDate, nextEpisodeSeason, nextEpisodeNumber, nextEpisodeName }
 */
export const getNextEpisode = (showId, currSeasonData, currShowData) => {
  // const currShowData = showData[showId]
  // const currSeasonData = seasonData[showId]

  // Get an array of just the season objects
  let seasonsArray = getSeasonDataForShow(currSeasonData)
  const numberOfSeasons = seasonsArray.length

  // Get the latest season - loop through and find the season number = number of seasons
  let lastSeasonObj = seasonsArray.filter(season => season.number === numberOfSeasons)[0]
  // Have seen data with a season object, but no episodes.
  let currEpisodes = lastSeasonObj.episodes ? [ ...lastSeasonObj.episodes ] : []
  // the episode array is most likely already in order, but we sort to make sure
  currEpisodes.sort((a,b) => a.number-b.number)
  // Setup default next Episode obj if there are no episodes in season obj
  let nextEpisode = { 
    nextEpisodeType: 'Last',
    nextEpisodeDate: currShowData.lastAirDate, 
    nextEpisodeSeason: lastSeasonObj.episodes ? lastSeasonObj.number : lastSeasonObj.number - 1, 
    nextEpisodeNumber: 0,
    nextEpisodeName: 'Last Known Season'
  }

  // Loop through and compare episode dates to date to determine the next episode
  // Set the nextEpisode object at each interation, this gives us either the last or next episode.
  let today = moment()
  for(const episodeObj of currEpisodes) {
    nextEpisode = {
      nextEpisodeType: 'Last',
      nextEpisodeDate: episodeObj.airDate, 
      nextEpisodeSeason: lastSeasonObj.number, 
      nextEpisodeNumber: episodeObj.number, 
      nextEpisodeName: episodeObj.name
      }
    if (moment(episodeObj.airDate).isSameOrAfter(today, 'day')) {
      // Since this is the next episode, mark it as Next
      nextEpisode.nextEpisodeType = 'Next'
      break
    }
  }

  return nextEpisode
}

//! ------------------------------------------
// returns a new array of season objects for the passed showId
// This will remove the showId key
/**
 * Updates the TV/showData.posterImage key
 * 
 * @param number showId - showId
 * @param object seasonData - seasonData Object from redux store
 * @param bool arrayFlag - If true, then will return an array, otherwise, it returns and object of objects
 * @returns array - array of season objects
 */
const getSeasonDataForShow = (showSeasonData, arrayFlag = true) => {
  //let showSeasonData = seasonData[showId]
  // Create an array of season objects with showId Key removed
  let seasonArray = Object.keys(showSeasonData)
    .filter(seasonKey => seasonKey !== 'showId')
    .map(seasonKey => showSeasonData[seasonKey])
  // If requesting an object, return an object instead of an array
  if (!arrayFlag) {
    return _.keyBy(seasonArray, 'id')
  }
  // Return the array
  return seasonArray
}