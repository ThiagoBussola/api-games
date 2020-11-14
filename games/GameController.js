const express = require('express');
const router = express.Router();
const Game = require("./Game")
//const auth = require('../middleware/Authentication')

// remover auth por hora se precisar rodar o teste
router.get("/games", async (req, res) => {

    var HATEOAS = [
        {
            href: "http://localhost:3033/game/0",
            method: "DELETE",
            rel: "delete_game"
        },
        {
            href: "http://localhost:3033/games/0",
            method: "GET",
            rel: "get_game"
        },
        {
            href: "http://localhost:3033/auth",
            method: "POST",
            rel: "login"
        },
    ]
    try {
        const gamesReturned = await Game.findAll()
        gamesReturned ? res.status(200).json({games: gamesReturned, _links: HATEOAS}) : res.sendStatus(204);
        // gamesReturned ? res.status(200).json({games: gamesReturned}) : res.sendStatus(204);
    } catch (err) {
        console.log(err);
        return res.sendStatus(400)
    }
})

router.get("/games/:id", async (req, res) => {
    var id = parseInt(req.params.id);
    var HATEOAS = [
        {
            href: "http://localhost:3033/game/"+id,
            method: "DELETE",
            rel: "delete_game"
        },
        {
            href: "http://localhost:3033/games/"+id,
            method: "GET",
            rel: "get_game"
        },
        {
            href: "http://localhost:3033/auth",
            method: "POST",
            rel: "login"
        },
    ]


    if (isNaN(id)) {
        res.sendStatus(400)
    } else {
        try {
            let gamesReturned = await Game.findOne({
                where: {
                    id: id
                }
            })
            // res.status(200).json({ game: gamesReturned, _links: HATEOAS })
            res.status(200).json({ game: gamesReturned})
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
        res.status(201).json({game: gameCreated})
        
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

    var HATEOAS = [
        {
            href: "http://localhost:3033/game/"+id,
            method: "DELETE",
            rel: "delete_game"
        },
        {
            href: "http://localhost:3033/game/"+id,
            method: "PUT",
            rel: "edit_game"
        },
        {
            href: "http://localhost:3033/games",
            method: "GET",
            rel: "get_all_games"
        },
    ]

    
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
