import _ from 'lodash';
import { searchTVByTitle } from '../api';
import { getImageURL } from './dataModel';

/**
 * Accepts a search term and returns an array of objects that match
 * [{ id, name, overview, posterURL }]
 * 
 * @param {string} searchTerm - Term to search with 
 * @returns {Object[]} Return value
 */
export const dmSearchTVByTitle = async (searchTerm) => {
  let resp = await searchTVByTitle(searchTerm);
  // array of results is in resp.results
  let results = resp.data.results;
  // map over results pulling out data we need
  let searchResults = await Promise.all(results.map(async (show) => {
    let imageURLs = await getImageURL([show.poster_path, show.backdrop_path]);
    return {
      id: show.id,
      name: show.name,
      overview: show.overview,
      posterURL: imageURLs[0],
      backdropURL: imageURLs[1]
    }
  }));
  return searchResults;
}