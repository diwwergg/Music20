const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Music = require("../models/musicModel");

router.get("/music", (req, res) => {
    Music.find({}, (error, music) => {
        if (error) res.status(500).send(error);
        res.send(music);
    });
});

router.get("/music/:id", (req, res) => {
    Music.findById(req.params.id, (error, music) => {
        if (error) res.status(500).send(error);
        res.send(music);
    });
});



router.post("/music", async (req, res) => {
    await validationMusic(req, res);
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
        const savedMusic = await saveMusic(music);
        res.send(savedMusic);
    } catch (error) {
        console.error(error);
        res.status(500).send({ error: 'Failed to save music' });
    }
});



router.put("/music/:id", (req, res) => {
    Music.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, music) => {
        if (error) res.status(500).send(error);
        res.send(music);
    });
});

router.delete("/music/:id", (req, res) => {
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
            res.send(`${nameList[index]} is empty `)
        }
    })
}


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
