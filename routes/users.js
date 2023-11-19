const express = require('express')
const router = express.Router()

const User = require('../models/usersModel');
const usersModel = require('../models/usersModel');

router.get('/', async (req, res) => {
    try {
        const users = await usersModel.find()
        res.send({users})
    } 
    catch (error) {
        res.status(500).json({message: error.message})
    }
});

router.get('/:id', getUser, (req, res) => {
    res.json(res.user)
});

router.post('/', async(req, res) => {
    const user = new User({
        name: req.body.name,
        last_name: req.body.last_name,
        nickname: req.body.nickname,
        email: req.body.email,
    })
    
    try {
        const newUser = await user.save()
        res.status(201).json(newUser)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
});

router.patch('/:id', getUser, async(req, res) => {
    if (req.body.name != null) {
        res.user.name = req.body.name
    }

    if (req.body.last_name != null) {
        res.user.last_name = req.body.last_name
    }

    if (req.body.nickname != null) {
        res.user.nickname = req.body.nickname
    }
    if (req.body.email != null) {
        res.user.email = req.body.email
    }

    try {
        const updatedUser = await res.user.save()
        res.json(updatedUser)
    } catch (error) {
        res.status(400).json({ "message": error.message })
    }
});

router.delete('/:id', getUser, async(req, res) => {
    try {
        await res.user.deleteOne()
        res.json({ message: 'deleted' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

async function getUser(req, res, next) {
    let user
    
    try {
        user = await User.findById(req.params.id)

        if (user == null){
            return res.status(404).json({ message: "cannot find that user" })
        }
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

    res.user = user
    next()
}

module.exports = router