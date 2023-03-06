const { Router } = require("express")
const router = Router()
const { getAllGenres } = require("../controllers/GenresController")

router.get("/", async (req, res) => {
    try {
        let allGenres = await getAllGenres();
        res.status(200).send(allGenres)
    }catch(e) {
        res.send(e)
    }
})




module.exports = router