const express = require('express');
const router = express.Router();
const Game = require("./Game")
const auth = require('../middleware/Authentication')

router.get("/games", async (req, res) => {
    try {
        const gamesReturned = await Game.findAll()
        gamesReturned ? res.status(200).json(gamesReturned) : res.sendStatus(204);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400)
    }
})

router.get("/games/:id", async (req, res) => {
    var id = parseInt(req.params.id);
    if (isNaN(id)) {
        res.sendStatus(400)
    } else {
        try {
            let gamesReturned = await Game.findOne({
                where: {
                    id: id
                }
            })
            res.status(200).json({ game: gamesReturned })
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
})

router.post("/game", async (req, res) => {
    const title = req.body.title
    const year = req.body.year
    const price = req.body.price
    try {
       const gameCreated = await Game.create({
            title: title,
            year: year,
            price: price
        })
        res.status(201).json(gameCreated)
        
    } catch (err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.delete("/game/:id", async (req, res) => {
    var id = parseInt(req.params.id);

    if (isNaN(id)) {
        res.sendStatus(400)
    } else {
        try {
            let found = await Game.findOne({ where: { id: id } })

            if (found) {
                await Game.destroy({ where: { id: id } })
                res.sendStatus(200)
            } else {
                res.sendStatus(404)
            }
        } catch (err) {
            console.log(err)
            res.sendStatus(500)
        }
    }
})

router.put("/game/:id", async (req, res) => {
    var id = parseInt(req.params.id);
    id = parseInt(id)
    
    if (isNaN(id)) {
        res.sendStatus(400)
        
    } else {
        (async () => {
            const game = await Game.findByPk(id);
            
            if (game === undefined) {
                res.sendStatus(404);
                
            } else {
                let { title, year, price } = req.body;
                if (title != undefined) { Game.update({ title }, { where: { id } }) };
                if (year != undefined) { Game.update({ year }, { where: { id } }) };
                if (price != undefined) { Game.update({ price }, { where: { id } }) };
                res.sendStatus(200);
            }
        }) ();
    }
})
module.exports = router