/* eslint-disable no-unreachable */
import axios from "axios";

export const GetAllVideogames = () => {
  try {
    return async (dispatch) => {
      var json = await axios.get("http://localhost:3001/videogames");

      return dispatch({
        type: "GET_VIDEOGAMES",
        payload: json.data,
      });
    };
  } catch (e) {
    console.log(e);
  }
};

export const getAllGenres = () => {
  try {
    return async (dispatch) => {
      var genresjson = await axios.get("http://localhost:3001/genres");
      return dispatch({
        type: "GET_GENRES",
        payload: genresjson.data,
      });
    };
  } catch (e) {
    console.log(e);
  }
};

export const getPlatforms = () => {
  return async (dispatch) => {
    let json = await axios.get("http://localhost:3001/platforms");
    return dispatch({
      type: "GET_PLATFORMS",
      payload: json.data,
    });
  };
};

export function sortVideogameByRating(payload) {
  return {
    type: "FILTER_BY_RATING",
    payload,
  };
}

export function sortByName(payload) {
  return {
    type: "SORT_BY_NAME",
    payload,
  };
}

export function filterApiDb(payload) {
  return {
    type: "FILTER_API_DB",
    payload,
  };
}

export function filterByGenre(payload) {
  return {
    type: "FILTER_BY_GENRE",
    payload,
  };
}

export function getGameById(id) {
  try {
    return async (dispatch) => {
      var videogameid = (
        await axios.get(`http://localhost:3001/videogames/${id}`)
      ).data;
      // console.log(videogameID.data)
      return dispatch({
        type: "GET_ID",
        payload: videogameid,
      });
    };
  // eslint-disable-next-line no-unreachable
  } catch (err) {
    console.log(err);
  }
}

export function getByName(name) {
  return async (dispatch) => {
    try {
      const gamebyname = await axios.get(
        `http://localhost:3001/videogames?name=${name}`
      );
      return dispatch({
        type: "GET_BY_NAME",
        payload: gamebyname.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export const postVideogame = (payload) => {
  return async (dispatch) => {
    try {
      // console.log(payload)
      const json = await axios.post(
        "http://localhost:3001/videogames",
        payload
      );
      // console.log(json.data)
      return dispatch({
        type: "POST_VIDEOGAME",
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
};


export function clearVideogamesId() {
  return {
    type: "CLEAR_GAMEID",
    payload: []
  }
}
