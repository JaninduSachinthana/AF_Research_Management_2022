const express = require('express');
const router = express.Router();
const Group = require('../models/group_module')


router.post('/addgroup', (req, res) => {
    const group = new Group({
        groupid : req.body.groupid,
        department : req.body.department,
        memberLeader : req.body.memberLeader,
        memberone: req.body.memberone,
        membertwo : req.body.membertwo,
        mamberthree : req.body.mamberthree
      
    });

    group
    .save()
    .then(() => res.json("Groups Added Successfully..."))
    .catch((err) => res.json(err.message));
});

router.get('/viewgroup', (req, res) => {
    Group
    .find()
    .then(response => res.json(response))
    .catch((err) => res.json(err.message));
});

router.get('/viewgroup/:id', (req, res) => {
    Group
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => res.json(err.message));
});


router.put('/edit/:id', (req, res) => {
    Group
    .findById(req.params.id)
    .then(response => {
        response.groupid = req.body.groupid,
        response.department =  req.body.department,
        response.memberLeader =  req.body.memberLeader,
        response.memberone =  req.body.memberone,
        response.membertwo =  req.body.membertwo,
        response.mamberthree = req.body.mamberthree

        response
        .save()
        .then(() => res.json("Group Updated Successfully..."))
        .catch((err) => res.json(err.message));
    })
    .catch((err) => res.json(err.message));
});


router.delete('/delete/:id', (req, res) => {
    Group
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Group deleted successfully..."))
    .catch((err) => res.json(err.message));
});



module.exports = router;
