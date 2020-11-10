const express = require('express')
const router = express.Router()
const User = require('./User')
const bcrypt = require('bcrypt')


router.get("/users", async (req, res) => {
    try {
        const usersReturned = await User.findAll()
        usersReturned ? res.sendStatus(200).json(usersReturned) : res.sendStatus(204)
    } catch (err) {
        console.log(err)
        return res.sendStatus(400)
    }
})

router.get("/users/:id", async (req, res) => {
    var id = parseInt(req.params.id);
    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        try {
            let usersReturned = User.findOne({where: { id:id }})
            res.sendStatus(200).json({users : usersReturned})
        } catch(err){
            console.log(err)
            res.sendStatus(500)
        }
    }
})

router.post("/user", async (req, res) => {
    const name = req.body.name
    const email = req.body.email
    const password = req.body.password

    try {

        await User.findOne({where:{email:email}}).then(user => {
            if(user == undefined) {
                let salt = bcrypt.genSaltSync(10);
                let hash = bcrypt.hashSync(password, salt)
                
                
                User.create({
                    name: name,
                    email: email,
                    password: hash
                })
                res.sendStatus(201)
            } else {
                res.sendStatus(400)
            }
        })
    } catch(err) {
        console.log(err)
        res.sendStatus(500)
    }
})

router.delete("/user/:id", async (req, res) => {
    let id = parseInt(req.params.id)

    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        try {
            let found = await User.findOne({where:{ id:id }})

            if(found) {
                await User.destroy({where:{ id: id }})
                res.sendStatus(200)
            } else {
                res.sendStatus(404)
            }
            
        } catch(err) {
            console.log(err)
        }
    }
})

router.put("/user/:id", async (req, res) => {
    var id = parseInt(req.params.id);
    id = parseInt(id)

    if(isNaN(id)) {
        res.sendStatus(400)
    } else {
        (async () => {
            const user = await User.findByPk(id)

            if(user ===  undefined) {
                res.sendStatus(404)
            } else {
                let { name, email, password } = req.body;
                if(name != undefined) {
                    User.update({ name }, {where: { id  }})
                }
                if(email != undefined) {
                    User.update({ email }, {where: { id  }})
                }
                if(password != undefined) {
                    let salt = bcrypt.genSaltSync(10);
                    let hash = bcrypt.hashSync(password, salt)
                    
                    User.update({ password: hash }, {where: { id  }})
                }
            }
        })
    }
})

router.post("/auth", (req, res) => {

    var {email, password} = req.body

    if(email != undefined) {

        var user = User.findOne({where: {email:email}})

        if(user != undefined) {

            var correct = bcrypt.compareSync(password, user.password)

            if(user.password == correct) {
                res.sendStatus = 200
                res.json({token: "Token falso"})
            } else {
                res.status = 401
                res.json({err: "credenciais inválidas"})
            }
        } else {
            res.status = 404
            res.json({err: "O email enviado não existe"})            
        }
    } else {
        res.status(400)
        res.json({err: "O email enviado é inválido"})
    }
})
module.exports = router