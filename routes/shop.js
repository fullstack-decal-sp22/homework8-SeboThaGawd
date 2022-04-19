const express = require("express");
const { check, validationResult} = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const router = express.Router();
const auth = require("./../middleware/auth");

const User = require("../model/User");


router.get('/list', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        res.send(user.shoppinglist);
    } catch (e) {
      res.send({ message: 'Error in Fetching user' });
    }
});

router.post('/add', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const list = user.shoppinglist;
        list.push(req.body.item);
        user.shoppinglist = list;
        await user.save();
        res.send(list);
    } catch (e) {
        res.send({ message: 'Error in adding element' });
    }
});

router.delete('/delete', auth, async(req, res) => {
    try {
        const user = await User.findById(req.user.id);
        const list = user.shoppinglist;
        const item = req.body.item;
        //remove this item from array 
        let index = list.indexOf(item);
        while (index !== -1) {
            list.splice(index, 1);
            index = list.indexOf(item);
        }
        user.shoppinglist = list;
        await user.save();
        res.send(list);
    } catch (e) {
        res.send({ message: 'Error in deleting element' });
    }
});


module.exports = router;