import { fb_readTVData } from '../firebase/firebaseInterface';
import { getNextEpisode } from '../store/tvShows/helpers';

export const dmGetInitialData = async (uid) => {
  // Read TV node from firebase
  let TVNode = await fb_readTVData(uid);
  // return nothing if empty
  if (!TVNode) {
    return { showData: {}, seasonData: {}, extraData: {}, userData: {}, tagData: {} }
  }
  console.log('TVNode', TVNode);
  // loop through shows getting keys and get next episode object
  let episodeObj;
  Object.keys(TVNode.showData).forEach(showId => {
    episodeObj = getNextEpisode(showId, TVNode.seasonData[showId], TVNode.showData[showId])
    TVNode.showData[showId] = { ...TVNode.showData[showId], ...episodeObj }
  })
  let userData = TVNode.userData;
  // // Walk through object to get to episodes object and convert to an array
  // Object.keys(userData)
  //   .forEach(TVShowKey => { // Looping through each TV Key
  //     Object.keys(userData[TVShowKey].seasons).filter(seasonKey => seasonKey !== 'showId')
  //       .forEach(seasonKey => { // Looping through each season key
  //         let episodesa = []
  //         Object.keys(userData[TVShowKey].seasons[seasonKey].episodes)
  //           .forEach(episodeKey => { // Looping through each of the episode keys
  //             console.log('epkey', episodeKey)
  //             // create a new array of the episodes (converting from an object of object to an array of objects)
  //             episodesa.push({ ...userData[TVShowKey].seasons[seasonKey].episodes[episodeKey] }) 
  //           });
  //           // assign the new array we creating overwriting the episodes key with the array of objects
  //           userData[TVShowKey].seasons[seasonKey].episodes = episodesa;
  //       })
  //   });

  // Need to account for no data being returned
  // Should export a constant "INITIAL_STATE" variable from configureStore
  return TVNode || { showData: {}, seasonData: {}, extraData: {}, userData: {}, tagData: {}};
}