const express = require('express');
const router = express.Router();
const Panels = require('../models/panels')

router.post('/add', (req, res) => {
    const panel = new Panels({
        panelID : req.body.panelID,
        panelmember1 : req.body.panelmember1,
        panelmember2 : req.body.panelmember2,
        group1: req.body.group1,
        group2 : req.body.group2,
        group3 : req.body.group3
      
    });

    panel
    .save()
    .then(() => res.json("Panel Added Successfully..."))
    .catch((err) => res.json(err.message));
});

router.get('/view', (req, res) => {
    Panels
    .find()
    .then((response) => res.json(response))
    .catch((err) => res.json(err.message));
});

router.get('/view/:id', (req, res) => {
    Panels
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => res.json(err.message));
});

router.put('/edit/:id', (req, res) => {
    Panels
    .findById(req.params.id)
    .then(response => {
        response.panelID = req.body.panelID,
        response.panelmember1 =  req.body.panelmember1,
        response.panelmember2 =  req.body.panelmember2,
        response.group1 =  req.body.group1,
        response.group2 =  req.body.group2,
        response.group3 = req.body.group3

        response
        .save()
        .then(() => res.json("Panel Updated Successfully..."))
        .catch((err) => res.json(err.message));
    })
    .catch((err) => res.json(err.message));
});

router.delete('/delete/:id', (req, res) => {
    Panels
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Panel deleted successfully..."))
    .catch((err) => res.json(err.message));
});

module.exports = router;
