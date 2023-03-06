const axios = require("axios");
require("dotenv").config();
const { API_KEY } = process.env;
const { Videogame, Genre, Platform } = require("../db");

const getApiData = async () => {
  var api = `https://api.rawg.io/api/games?key=${API_KEY}`;

  let api1 = (await axios.get(api)).data;
  let pag1 = await api1.results;
  let api2 = (await axios.get(api1.next)).data;
  let pag2 = await api2.results;
  let api3 = (await axios.get(api2.next)).data;
  let pag3 = await api3.results;
  let api4 = (await axios.get(api3.next)).data;
  let pag4 = await api4.results;
  let api5 = (await axios.get(api4.next)).data;
  let pag5 = await api5.results;

  let data = [...pag1, ...pag2, ...pag3, ...pag4, ...pag5];
  const apidata = data.map((e) => {
    return {
      id: e.id,
      name: e.name,
      released: e.released,
      image: e.background_image,
      rating: e.rating,
      genres: e.genres.map((e) => e.name),
      platforms: e.platforms.map((e) => e.platform.name),
    };
  });
  return apidata;
};

const getDbData = async () => {
  let dbdata = await Videogame.findAll({
    include: [
      {
        model: Genre,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
      {
        model: Platform,
        attributes: ["name"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return dbdata;
};

const getAllData = async () => {
  let apiData = await getApiData();
  let dbData = await getDbData();
  let allData = dbData.concat(apiData);
  return allData;
};

const getIds = async (id) => {
  if (
    id.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i)
  ) {
    try {
      let dbId = await Videogame.findByPk(id, {
        include: [
          {
            model: Genre,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
          {
            model: Platform,
            attributes: ["name"],
            through: {
              attributes: [],
            },
          },
        ],
        attributes: [
          "id",
          "name",
          "description",
          "released",
          "rating",
          "image",
          "createdInDb",
        ],
      });
      return dbId;
    } catch (e) {
      console.log(e);
    }
  } else {
    try {
      const apiId = (await axios.get(`https://api.rawg.io/api/games/${id}?key=${API_KEY}`)).data;
      

      const game = {
        id: apiId.id,
        name: apiId.name,
        description: apiId.description,
        released: apiId.released,
        image: apiId.background_image,
        rating: apiId.rating,
        platforms: apiId.parent_platforms.map((e) => e.platform.name),
        genres: apiId.genres.map((e) => e.name),
      };
      
      return game;

    } catch (e) {
      console.log(e);
    }
  }
};

module.exports = {
  getApiData,
  getDbData,
  getAllData,
  getIds,
};
