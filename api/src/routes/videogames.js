const { Router } = require("express");
const { Videogame, Genre, Platform } = require("../db");
const {
  getAllData,
  getDbData,
  getApiData,
  getIds,
} = require("../controllers/GamesController");

const router = Router();

router.get("/", async (req, res) => {
  let { name } = req.query;
  try {
    let alldata = await getAllData();

    if (name) {
      let videogame = alldata.filter((e) =>
        e.name.toLowerCase().includes(name.toLowerCase())
      );

      videogame.length
        ? res.status(200).send(videogame)
        : res.status(404).send("Game Not Found");
    } else {
      res.status(200).send(alldata);
    }
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let gameFound = await getIds(id);
    gameFound ? res.send(gameFound) : res.send("there is no game with that id");
  } catch (e) {
    console.log(e);
    res.status(400).send(e);
  }
});

router.post("/", async (req, res) => {
  try {
    let { name, description, released, image, rating, platforms, genres } =
      req.body;

    const createdVideogame = await Videogame.create({ 
      name: name,
      description: description,
      released: released,
      image: image ? image : "../controles-videogames.jpg",
      rating: rating,
    });


    //console.log(createdVideogame)

    genres.forEach(async (e) => {
      let genre = await Genre.findAll({
        where: { name: e },
      });
      await createdVideogame.addGenre(genre);
    });

    platforms.forEach(async e => {
        console.log("entré")
        console.log(e)
        let platform = await Platform.findAll({
            where : {name: e},
        });
        await createdVideogame.addPlatform(platform)
    })
    // console.log(createdVideogame)
    res.send(createdVideogame);
  } catch(e) {
    console.log(e)
    res.status(400).send("cant create videogame");
  }
});

module.exports = router;
