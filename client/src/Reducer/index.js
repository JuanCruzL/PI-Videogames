/* eslint-disable no-fallthrough */
const initialstate = {
  videogames: [],
  videogamesCopy: [],
  genres: [],
  videogameID: [],
  platforms: [],
};

export default function reducer(state = initialstate, action) {
  switch (action.type) {
    case "GET_VIDEOGAMES":
      try {
        return {
          ...state,
          videogames: action.payload,
          videogamesCopy: action.payload,
        };
      } catch (err) {
        console.log(err);
      }
    case "GET_GENRES":
      return {
        ...state,
        genres: action.payload,
      };

    case "GET_PLATFORMS":
      return {
        ...state,
        platforms: action.payload,
      };

    case "GET_BY_NAME":
      return {
        ...state,
        videogames: action.payload,
      };

    case "FILTER_BY_RATING":
      let games = state.videogamesCopy;
      if (action.payload !== "-") {
        if (action.payload === "Higher") {
          games = state.videogamesCopy.sort((a, b) => {
            if (a.rating > b.rating) {
              return -1;
            }
            if (b.rating > a.rating) {
              return 1;
            }
            return 0;
          });
          return {
            ...state,
            videogames: games,
          };
        } else if (action.payload === "Lower") {
          games = state.videogamesCopy.sort((a, b) => {
            if (a.rating > b.rating) {
              return 1;
            }
            if (b.rating > a.rating) {
              return -1;
            }
            return 0;
          });
          return {
            ...state,
            videogames: games,
          };
        }
      } else
        return {
          ...state,
          videogames: state.videogamesCopy,
        };

    case "SORT_BY_NAME":
      let sortbyname = state.videogamesCopy;
      if (action.payload !== "-") {
        if (action.payload === "A-Z") {
          sortbyname = state.videogamesCopy.sort((a, b) => {
            if (a.name > b.name) {
              return 1;
            }
            if (b.name > a.name) {
              return -1;
            }
            return 0;
          });
        } else if (action.payload === "Z-A") {
          sortbyname = state.videogamesCopy.sort((a, b) => {
            if (a.name > b.name) {
              return -1;
            }
            if (b.name > a.name) {
              return 1;
            }
            return 0;
          });
        }
      }
      return {
        ...state,
        videogames: action.payload === "-" ? state.videogamesCopy : sortbyname
      };
    case "FILTER_API_DB":
      let filterdb = state.videogamesCopy.filter((e) => e.createdInDb === true);
      if (action.payload === "DB") {
        return {
          ...state,
          videogames: filterdb,
        };
      } else if (action.payload === "API") {
        let filterapi = state.videogamesCopy.filter((e) => !e.createdInDb);
        return {
          ...state,
          videogames: filterapi,
        };
      } else
        return {
          ...state,
          videogames: state.videogamesCopy,
        };
    case "FILTER_BY_GENRE":
      try {
        const allVideogames = state.videogamesCopy;
        const filtered =
          action.payload === "All"
            ? allVideogames
            : allVideogames.filter((e) => e.genres.includes(action.payload));
        return {
          ...state,
          videogames: filtered,
        };
      } catch (e) {
        console.log(e);
      }
    case "GET_ID":
      return {
        ...state,
        videogameID: action.payload,
      };

    case "POST_VIDEOGAME":
      return {
        ...state,
      };
    case "CLEAR_GAMEID":
      return{
        ...state,
        videogameID: action.payload
      }
    default:
      return state;
  }
}
