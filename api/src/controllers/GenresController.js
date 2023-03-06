const axios = require("axios")
const { API_KEY } = process.env
require("dotenv").config()
const { Genre } = require("../db")

const getAllGenres = async() => {
    let data = (await axios.get (`https://api.rawg.io/api/genres?key=${API_KEY}`)).data.results;

    let genres = data.map(e =>  { 
        return {
            name: e.name
    }})

    genres.forEach(e => {
        if(e) {
            Genre.findOrCreate({
                where: {
                    name: e.name
                }
            })
        }
    });

    const genre = await Genre.findAll()
    return genre
}

module.exports = {
    getAllGenres
}