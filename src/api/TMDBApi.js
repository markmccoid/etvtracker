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

async function getImageURL() {
  let resp = await getConfig();  
  return resp.data.images.base_url;
//  IMG_URL_SECURE = resp.data.images.secure_base_url;
}

const IMG_URL = getImageURL()
  .then(resp => {
      console.log('in getImageURL', resp);
      return resp
    }
  )
  .catch(err => console.log('Image URL Error', err));



/**
 * Returns data from search by searchString
 * 
 * @param {string} searchString - String of title to search for
 * @param {number} [page=1] - page number to return if multiple pages from search 
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const searchTVByTitle = (searchString, page=1) => {
  const apiCall = `${API_URL}/search/tv?api_key=${API_KEY}&page=${page}&include_adult=false&query=${searchString}`; 
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      })
      .catch((err) => {
        console.log(`Error with searchTVByTitle get: ${err}`)
        return err;
      });
};

/**
 * Returns show details for passed TMDb showId
 * 
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getShowDetails = (showId) => {
  const apiCall = `${API_URL}/tv/${showId}?api_key=${API_KEY}`;
  return axios
    .get (apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        };
      })
      .catch((err) => {
        console.log(`Error with getShowDetails get: ${err}`)
        return err;
      });
};

/**
 * Return episodes from showId passed and seasonNum passed
 * 
 * @param {string} showId - TMDb show id
 * @param {number} seasonNum - season number to get episodes from
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getEpisodes = (showId, seasonNum) => {
  const apiCall = `${API_URL}/tv/${showId}/season/${seasonNum}?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      })
      .catch(err => {
        return {
          error: err,
          status: err.response.request.status,
          statusText: err.response.request.statusText,
        }
      });
};

/**
 * Returns show images for passed showId from TMDb.
 * 
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getShowImages = (showId) => {
  const apiCall = `${API_URL}/tv/${showId}/images?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      });
};

/**
 * Returns external Ids from TMDb.
 * 
 * @param {string} showId - TMDb show id
 * @returns {object} response object {data, msg} 
 *  on success { data: data from api call, apiCall: API call}
 *  on error { data: 'ERROR', msg: error message, }
 */
export const getExternalIds = (showId) => {
  const apiCall = `${API_URL}/tv/${showId}/external_ids?api_key=${API_KEY}`;
  return axios
    .get(apiCall)
      .then((resp) => {
        return {
          data: resp.data,
          apiCall: resp.request.responseURL
        }
      })
}



// export const getShowSeasons = (showId) => {
//   return axios
//     .get (`${API_URL}/tv/${showId}/season?api_key=${API_KEY}`)
//       .then((resp) => {
//         return {
//           data: resp.data,
//           msg: resp.request.responseURL
//         };
//       })
//       .catch((err) => {
//         console.log(`Error with getShowDetails get: ${err}`)
//         return err;
//       });
// };