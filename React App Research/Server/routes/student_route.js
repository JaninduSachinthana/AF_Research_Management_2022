const express = require('express');
const router = express.Router();
const Student = require('../models/student_module');


router.post('/addstudent', (req, res) => {
    const student = new Student({
        studentid : req.body.studentid,
        name : req.body.name,
        // memberLeader : req.body.memberLeader,
        // memberone: req.body.memberone,
        // membertwo : req.body.membertwo,
        // mamberthree : req.body.mamberthree
      
    });

    student
    .save()
    .then(() => res.json("Student Added Successfully..."))
    .catch((err) => res.json(err.message));
});

router.get('/viewstudent', (req, res) => {
    Student
    .find()
    .then(response => res.json(response))
    .catch((err) => res.json(err.message));
});

router.get('/viewstudent/:id', (req, res) => {
    Student
    .findById(req.params.id)
    .then(response => res.json(response))
    .catch((err) => res.json(err.message));
});


router.put('/editstudent/:id', (req, res) => {
    Student
    .findById(req.params.id)
    .then(response => {
        response.studentid = req.body.studentid,
        response.name =  req.body.name,
        // response.memberLeader =  req.body.memberLeader,
        // response.memberone =  req.body.memberone,
        // response.membertwo =  req.body.membertwo,
        // response.mamberthree = req.body.mamberthree

        response
        .save()
        .then(() => res.json("student Updated Successfully..."))
        .catch((err) => res.json(err.message));
    })
    .catch((err) => res.json(err.message));
});


router.delete('/deletestudent/:id', (req, res) => {
    Student
    .findByIdAndDelete(req.params.id)
    .then(() => res.json("Student deleted successfully..."))
    .catch((err) => res.json(err.message));
});



module.exports = router;