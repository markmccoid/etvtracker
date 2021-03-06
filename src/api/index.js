import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';


/**
 * Returns configuration information from TMDb.
 * 
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getConfig = () => {
  const apiCall = `${API_URL}/configuration?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      })
      .catch((err) => {
        console.log(`Error with config get: ${err}`)
        return {
          data: 'ERROR',
          apiCall,
          msg: err
        };
      });
};

// Init function to get base config variables 
// so we don't call config each time
// Variables stored
// IMG_URL, SECURE_IMG_URL
// After config, to retrieve, run function getImgURLs to get the object with above vars 
let IMG_URL = '';
let SECURE_IMG_URL = '';
export async function initTMDB() {
  let resp = await getConfig();  
  IMG_URL = resp.data.images.base_url;
  SECURE_IMG_URL = resp.data.images.secure_base_url;
}

export function getImgURLs () {
  return {
    IMG_URL,
    SECURE_IMG_URL
  };
}

export * from './TMDBApi';
export * from './TMDBApi_Movies'