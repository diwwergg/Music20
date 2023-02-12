const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const path = require("path");
const jwt = require('jsonwebtoken');
const axios = require('axios');

const User = require('../models/userModel');


const rootPath = path.join(__dirname, "..", "..");
const loginPath = path.join(rootPath, "public", "page", "login.ejs");
const mainPath = path.join(rootPath, "public", "page", "main.html");


router.get("/", (req, res, next) => {
    res.render(loginPath);
});


router.post('/register', (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    });

    user.save((error) => {
        if (error) {
            return res.status(400).send({
                message: error
            });
        }
        console.log('User registered successfully')
        res.status(200).send({
            message: 'User registered successfully'
        });
    });
});

router.post('/login', (req, res) => {
    User.findOne({
        username: req.body.username
    }, (error, user) => {
        if (error) {
            return res.status(400).send({
                message: error
            });
        }
        if (!user) {
            return res.status(400).send({
                message: 'User not found'
            });
        }
        user.comparePassword(req.body.password, (error, isMatch) => {
            if (error) {
                return res.status(400).send({
                    message: error
                });
            }
            if (!isMatch) {
                return res.status(400).send({
                    message: 'Wrong password'
                });
            }
            const token = jwt.sign({
                _id: user._id
            }, 'secretKey', {
                expiresIn: '1h'
            });
            console.log('user login successful')
            res.status(200).send({
                message: 'Login successful',
                token: token
            });
        });
    });
});


module.exports = router;