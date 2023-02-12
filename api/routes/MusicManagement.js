const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Music = require("../models/musicModel");

router.get("/", (req, res) => {
    Music.find({}, (error, music) => {
        if (error) res.status(500).send(error);
        res.send(music);
    });
});

router.get("/:id", (req, res) => {
    Music.findById(req.params.id, (error, music) => {
        if (error) res.status(500).send(error);
        res.send(music);
    });
});

router.post("/", (req, res) => {
    console.log(req.body)
    validationMusic(req, res)
    const music = new Music({
        musicName: req.body.musicName,
        photoLink: req.body.photoLink,
        musicLink: req.body.musicLink,
        description: req.body.description
    });
    console.log(music);
    music.save((error) => {
        if (error) {
            console.log(error)
            res.send(error)
        } else {
          console.log('Music saved successfully');
          console.log('Music ID: ', music._id);
          console.log('Music Name: ', music.musicName);
          console.log('Music Photo Link: ', music.photoLink);
          console.log('Music Link: ', music.musicLink);
          console.log('Music Description: ', music.description);
          res.send(music);
        }
    });
});

router.put("/:id", (req, res) => {
    Music.findByIdAndUpdate(req.params.id, req.body, { new: true }, (error, music) => {
        if (error) res.status(500).send(error);
        res.send(music);
    });
});

router.delete("/:id", (req, res) => {
    Music.findByIdAndRemove(req.params.id, (error, music) => {
        if (error) res.status(500).send(error);
        const response = {
            message: "Music successfully deleted",
            id: music._id
        };
        return res.status(200).send(response);
    });
});

const validationMusic = (req, res) =>{
    const musicName = req.body.musicName;
    const photoLink = req.body.photoLink;
    const musicLink = req.body.musicLink;
    const list = [musicName, photoLink, musicLink];
    const nameList = ["musicName", "photoLink", "musicLink"]
    list.forEach((value, index) => {
        if (value === null || value === undefined){
            res.send(`${nameList[index]} is empty `)
        }
    })
}

module.exports = router;
