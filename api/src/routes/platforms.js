const { Router } = require("express");
const router = Router();
const { API_KEY } = process.env;
require("dotenv").config();
const { Platform } = require("../db");
const axios = require("axios");

router.get("/", async (req, res) => {
    let platforms = []
  try {
    for (let i = 1; i <= 5; i++) {
      let platformsApi = (await axios.get(
        `https://api.rawg.io/api/games?key=${API_KEY}&page=${i}`
      )).data.results;
      let pltfrms = platformsApi.map(e => {return e.platforms});
      platforms.push(pltfrms)

    }
    let platformnames = []
    platforms = platforms.flat(2)
    platforms.forEach(e => platformnames.push(e.platform.name))

    platformnames.forEach(e => {
        if(e) {
            Platform.findOrCreate({
                where: {name: e}
            })
        }
    });

    let platform = await Platform.findAll()

    res.status(200).send(platform)
  }catch (e) {
    console.log(e)
    res.status(400).send(e)
  }
});

module.exports = router;
