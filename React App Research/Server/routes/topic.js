const express = require('express');
const router = express.Router();
const transpoter = require('./../utils/mailDet');

const Topic = require('../models/Research_Topic');

router.post('/response/:id', (req, res) => {

    Topic
    .findById(req.params.id)
    .then((response) => { 
        response.stdID = req.body.stdID,
        response.grpID = req.body.grpID,
        response.title = req.body.title,
        response.email = req.body.email,
        response.status = req.body.status

        response
        .save()
        .then(() => console.log(`Research Topic ${req.body.status} Successfully...`))
        .catch((err) => res.json(err.message));
    })

    const message = { 
        to: `${req.body.email}`,
        subject: "Research Passeord Activation",
        html: `<h1> Group ID : ${req.body.grpID} <br/> Your research topic : ${req.body.title}<br/> Research Topic : ${req.body.status} by the supervisor</h1> <br/><br/>` 
        
    };

    transpoter.sendMail(message, function(err, info) {
        if (err) {
          err.message(err)
        } else {
          res.json(`Research Topic ${req.body.status} Email Sent Successfully...`);
        }
    });
    
});

module.exports = router;