import axios from 'axios';

const API_KEY = process.env.REACT_APP_TMDB_API_KEY;
const API_URL = 'https://api.themoviedb.org/3';

// ========================================
export const getConfig = () => {
  return axios
    .get(`${API_URL}/configuration?api_key=${API_KEY}`)
      .then((resp) => {
        return {
          data: resp.data,
          msg: resp.request.responseURL
        }
      })
      .catch((err) => {
        console.log(`Error with config get: ${err}`)
        return err;
      });
};

// ========================================
export const searchTVByTitle = (searchString, page=1) => {
  return axios
    .get(`${API_URL}/search/tv?api_key=${API_KEY}&page=${page}&include_adult=false&query=${searchString}`)
      .then((resp) => {
        return {
          data: resp.data,
          msg: resp.request.responseURL
        }
      })
      .catch((err) => {
        console.log(`Error with searchTVByTitle get: ${err}`)
        return err;
      });
};

// ========================================
export const getShowDetails = (showId) => {
  return axios
    .get (`${API_URL}/tv/${showId}?api_key=${API_KEY}`)
      .then((resp) => {
        return {
          data: resp.data,
          msg: resp.request.responseURL
        };
      })
      .catch((err) => {
        console.log(`Error with getShowDetails get: ${err}`)
        return err;
      });
};

// ========================================
export const getEpisodes = (showId, seasonNum) => {
  return axios
    .get(`${API_URL}/tv/${showId}/season/${seasonNum}?api_key=${API_KEY}`)
      .then((resp) => {
        return {
          data: resp.data,
          msg: resp.request.responseURL
        }
    });
};

// ========================================
export const getShowImages = (showId) => {
  return axios
    .get(`${API_URL}/tv/${showId}/images?api_key=${API_KEY}`)
      .then((resp) => {
        return {
          data: resp.data,
          msg: resp.request.responseURL
        }
      });
};

// ========================================
export const getExternalIds = (showId) => {
  return axios
    .get(`${API_URL}/tv/${showId}/external_ids?api_key=${API_KEY}`)
      .then((resp) => {
        return {
          data: resp.data,
          msg: resp.request.responseURL
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