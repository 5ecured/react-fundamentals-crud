const router = require('express').Router()

const playerModel = require('../models/players')


router.get('/players', async (req, res) => {
    try {
        const getAllPlayers = await playerModel.find({})
        res.send(getAllPlayers)
    } catch (error) {
        res.send('get error is ', error)
    }
})

router.post('/players', async (req, res) => {
    try {
        const newPlayer = new playerModel({
            name: req.body.name,
            club: req.body.club,
            important: req.body.important
        })

        const savedPlayer = await newPlayer.save()
        res.send(savedPlayer)
    } catch (error) {
        res.send('post error is ', error)
    }
})


router.put('/players/:id', async (req, res) => {
    try {
        const updatedPlayer = {
            name: req.body.name,
            club: req.body.club,
            important: req.body.important
        }

        const result = await playerModel.findByIdAndUpdate(req.params.id, updatedPlayer, { new: true })
        res.send(result)
    } catch (error) {
        res.send('put error is ', error)
    }
})

router.patch('/players/:id', async (req, res) => {
    try {
        const toggledPlayer = {
            ...req.body,
            important: !req.body.important
        }

        const result = await playerModel.findByIdAndUpdate(req.params.id, toggledPlayer, { new: true })
        res.send(result)
    } catch (error) {
        res.send('patch error is ', error)
    }
})

router.patch('/players', async (req, res) => {
    try {
        const getAllPlayers = await playerModel.find({})
        // const allTruePlayers = getAllPlayers.map(player => {
        //     return {
        //         _id: player._id,
        //         name: player.name,
        //         club: player.club,
        //         important: true
        //     }
        // })

        let helper = 0
        getAllPlayers.forEach(player => {
            if (player.important) helper += 1
        })

        if (helper === getAllPlayers.length) {
            await playerModel.updateMany({}, { important: false })
        } else {
            await playerModel.updateMany({}, { important: true })
        }
    } catch (error) {
        res.send('patch  error is ', error)
    }
})

router.delete('/players/:id', async (req, res) => {
    try {
        await playerModel.findByIdAndDelete(req.params.id)
    } catch (error) {
        res.send('delete error is ', error)
    }
})

module.exports = router