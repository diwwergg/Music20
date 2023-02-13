const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const path = require("path");

const Music = require("../models/musicModel");

const rootPath = path.join(__dirname, "..", "..");
const pagePath = path.join(rootPath, "public", "page", "main2.ejs");

router.get("/", async (req, res, next) => {
    try {
        const All_song = await getMusic();
        res.render(pagePath, { All_song });
    } catch (error) {
        res.status(500).send(error);
    }
});

const getMusic = async () => {
    try {
        const musics = await Music.find({});
        const musicInstances = musics.map(data => new MusicClass(
            data.id,
            data.musicName,
            data.photoLink,
            data.musicLink,
            data.description
        ));
        return musicInstances;
    } catch (error) {
        console.log(error)
        throw error;
    }
};

class MusicClass {
    constructor(id, musicName, photoLink, musicLink, description) {
        this.id = id;
        this.musicName = musicName;
        this.photoLink = photoLink;
        this.musicLink = musicLink;
        this.description = description;
    }
}




module.exports = router;