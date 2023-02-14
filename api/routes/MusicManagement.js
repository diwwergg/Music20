const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const path = require('path')
const Music = require("../models/musicModel");
const verifyToken1 = require("../token");


const rootPath = path.join(__dirname, "..", "..");
const pagePath = path.join(rootPath, "public", "page", "manage.ejs");

router.get('/', (req, res) => {
    Music.find({}, (error, musics) => {
        if (error) res.status(500).send(error);
        res.render(pagePath, { musics });
    });
});

router.get("/music", verifyToken1, (req, res) => {
    Music.find({}, (error, music) => {
        if (error) res.status(500).send(error);
        res.send(music);
    });
});

router.get("/music/:id",verifyToken1, (req, res) => {
    Music.findById(req.params.id, (error, music) => {
        if (error) res.status(500).send(error);
        res.send(music);
    });
});


router.post("/music",verifyToken1, async (req, res, next) => {
    const [isValid, text] = validationMusic(req, res);
    if (!isValid) {
        return res.status(400).send({ error: text });
    }
    const musicName = req.body.musicName;
    try {
        const existingMusic = await Music.findOne({ musicName });
        if (existingMusic) {
            return res.status(400).send({ error: 'Music already exists' });
        }
        const music = new Music({
            musicName: req.body.musicName,
            photoLink: req.body.photoLink,
            musicLink: req.body.musicLink,
            description: req.body.description
        });
        music.musicLink = music.musicLink.replace(/\s/g, ''); // replace all space with ''
        music.photoLink = music.photoLink.replace(/\s/g, ''); // replace all space with ''

        const savedMusic = await saveMusic(music);
        res.send(savedMusic);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to save music' });
    }
});


router.put("/music/:id", verifyToken1, (req, res) => {
    Music.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, music) => {
        if (error) res.status(500).send(error);
        res.send(music);
    });
});

router.delete("/music/:id", verifyToken1, (req, res) => {
    Music.findByIdAndRemove(req.params.id, (error, music) => {
        if (error) res.status(500).send(error);
        const response = {
            message: "Music successfully deleted",
            id: music._id
        };
        return res.status(200).send(response);
    });
});

const validationMusic = (req, res) => {
    const musicName = req.body.musicName;
    const photoLink = req.body.photoLink;
    const musicLink = req.body.musicLink;
    const list = [musicName, photoLink, musicLink];
    const nameList = ["musicName", "photoLink", "musicLink"]
    list.forEach((value, index) => {
        if (value === null || value === undefined) {
            const text = `${nameList[index]} is required`;
            return false, text;
        }

    })
    return true, "not error";
};

const saveMusic = (music) => new Promise((resolve, reject) => {
    music.save((error, savedMusic) => {
        if (error) {
            console.log(error);
            reject(error);
        } else {
            console.log('Music saved successfully');
            resolve(savedMusic);
        }
    });
});

module.exports = router;
