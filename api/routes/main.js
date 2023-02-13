const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const path = require("path");

const rootPath = path.join(__dirname, "..", "..");
const pagePath = path.join(rootPath, "public", "page", "Main.html");

router.get("/", (req, res, next) => {
    // res html
    res.sendFile(pagePath);
});






module.exports = router;