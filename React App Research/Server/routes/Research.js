const express = require('express');
const cloudinary = require('./../utils/cloud');
const upload = require('./../utils/FilesMulter');
const router = express.Router();

const Research = require('../models/Research');

router.post('/add', upload.single('file'), async (req, res) => {

    try{
        console.log(req.file);
       // const file = req.body.file;
       if(!req.file){
           return err.json("File is empty");
       }

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "raw", 
            folder : "Research",
            public_id: req.file.originalname
        });

        const url = cloudinary.utils.private_download_url(result.public_id, "pdf", {resource_type: "raw", type: 'upload',expires_at: 7200, attachment: true})

        console.log(result);
    
        const ReFile = new Research({
            AsgID : req.body.AsgID,
            asgName : req.body.asgName,
            stdID : req.body.stdID,
            grpID : req.body.grpID,
            title : req.body.title,
            file : result.secure_url,
            cloudinary_id: result.public_id
        });
    
       await ReFile
        .save()
        .then(() =>{ res.json("Research Added Successfully..."); console.log(req.file)})
        .catch((err) => res.json(err.message));

    }catch(err){
        console.log(err.message);
    }
    
});

router.get('/view', (req, res) => {
    Research
    .find()
    .then((response) => res.json(response))
    .catch((err) => res.json(err.message));
});

router.get('/view/:id', (req, res) => {
    Research
    .find({AsgID : req.params.id})
    .then((response) => res.json(response))
    .catch((err) => res.json(err.message));
});

router.put('/edit/:id', upload.single('file'), async (req, res) => {

    try{

        let research = await Research.findById(req.params.id);

        await cloudinary.uploader.destroy(research.cloudinary_id,  {resource_type: "raw",} );

        const result = await cloudinary.uploader.upload(req.file.path, {
            resource_type: "raw", 
            folder : "Research",
            public_id: req.file.originalname
        })
        //res.json(result);

        //const url = cloudinary.utils.private_download_url(result.public_id, "pdf", { resource_type: "raw", type: 'upload' })
       
       await Research.findById(req.params.id)
        .then((response) => {
            response.AsgID = req.body.AsgID,
            response.asgName = req.body.asgName,
            response.stdID = req.body.stdID,
            response.grpID = req.body.grpID,
            response.title = req.body.title,
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

router.delete('/delete/:id'/*, upload.single('file'),*/, async (req, res) => {
    let research = await Research.findById(req.params.id)

    await cloudinary.uploader.destroy(research.cloudinary_id, {resource_type: "raw",});

    await Research.findByIdAndDelete(req.params.id)
    .then(() => res.json("Research Deleted Successfully..."))
    .catch((err) => res.json(err.message));
});

router.get('/download/:id', async (req, res) => {
    const result = await Research.findById(req.params.id)

    const url = cloudinary.utils.private_download_url(result.cloudinary_id, "pdf", {resource_type: "raw", type: 'upload'})

    res.json(url);
});

module.exports = router;