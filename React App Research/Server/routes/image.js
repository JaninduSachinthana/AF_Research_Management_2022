const express = require('express');
const cloudinary = require('./../utils/cloud').v2;
const upload = require('./../utils/ImageMulter');
const router = express.Router();

const User  = require('../models/User');

router.post('/add', upload.single('image'), async (req, res) => {

    try{
        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "image", 
            folder : "Profile"
        });
        res.json(result);
    
        const ReFile = new User ({            
            image : result.secure_url,
            cloudinary_id: result.public_id
        });
    
       await ReFile
        .save()
        .then(() => res.json("Research Added Successfully..."))
        .catch((err) => res.json(err.message));

    }catch(err){
        console.log(err.message);
    }
    
});

router.get('/view', (req, res) => {
    User 
    .find()
    .then((response) => res.json(response))
    .catch((err) => res.json(err.message));
});

router.put('/edit/:id', upload.single('image'), async (req, res) => {

    try{

        let research  = await User.findById(req.params.id);

        await cloudinary.uploader.destroy(research.cloudinary_id);

        const result = await cloudinary.uploader.upload(req.file.path);
       // res.json(result);
       
       await User.findById(req.params.id)
        .then((response) => {
            // response.stdID = req.body.stdID,
            // response.grpID = req.body.grpID,
            // response.title = req.body.title,
            response.file = result.secure_url,
            response.cloudinary_id = result.public_id

            response
            .save()
            .then(() => res.json("Research Updated Successfully..."))
            .catch((err) => console.log(err.message));
        })
        .catch((err) => res.json(err.message));

    }catch(err){
        console.log(err.message);
    }
    
});

router.delete('/delete/:id', upload.single('file'), async (req, res) => {
    let research = await User.findById(req.params.id)

    await cloudinary.uploader.destroy(research.cloudinary_id);

    await User.findByIdAndDelete(req.params.id)
    .then(() => res.json("Research Deleted Successfully..."))
    .catch((err) => res.json(err.message));
});

module.exports = router;