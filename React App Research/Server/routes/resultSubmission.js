const express = require('express');
const cloudinary = require('./../utils/cloud');
const upload = require('./../utils/templateMulter');
const router = express.Router();

const Evaluation = require('./../models/resultSubmission');

router.post('/add', upload.single('results'), async (req, res) => {
    try {
        console.log(req.file);

        if(!req.file){
            return err.json("File is empty");
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
             resource_type: "raw", 
             folder : "Evaluation",
             public_id: req.file.originalname
         });
        console.log(result);
        
        const marking = new Evaluation({
            schemaID : req.body.schemaID,
            LecName : req.body.LecName,
            desc : req.body.desc,
            department : req.body.department,
            results : result.secure_url,
            cloudinary_id : result.public_id,
            fileName:req.body.fileName
        })
        await marking
        .save()
        .then(() =>  res.json("Result Sheet Added Successfully..."))
        .catch(() => err.json(err.message));


    }catch (err) {

    }
});

router.get('/view', (req, res) => {
    Evaluation
    .find()
    .then((response) => res.json(response))
    .catch((err) => res.json(err.message));
});

router.get('/views/:id', (req, res) => {
    Evaluation
    .findById(req.params.id)
    .then((response) => res.json(response))
    .catch((err) => err.json(err.message));
});

router.get('/view/:id', (req, res) => {
    Evaluation
    .find({schemaID : req.params.id})
    .then((response) => res.json(response))
    .catch((err) => err.json(err.message));
});

router.put('/edit/:id', upload.single('results'), async (req, res) => {

    try{

        const marking = await Evaluation.findById(req.params.id);

        var result = null;

        if(!req.file) {

            console.log("File None");
            result = await cloudinary.api.resource(marking.cloudinary_id,  {resource_type: "raw",});
            console.log(result);

        }else {

            await cloudinary.uploader.destroy(marking.cloudinary_id,  {resource_type: "raw",} );

            result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "raw", 
                folder : "Marking",
                public_id: req.file.originalname
            });
        // res.json(result);
        }

        
       
       await Evaluation.findById(req.params.id)
        .then((response) => {
            response.schemaName = req.body.schemaName,
            response.department = req.body.department,
            response.desc = req.body.desc,
            response.schema = result.secure_url,
            response.cloudinary_id = result.public_id,
            response.fileName = req.body.fileName

            response
            .save()
            .then(() => res.json("Result sheet Updated Successfully..."))
            .catch(() => err.json(err.message));
        })
        .catch((err) => err.json(err.message));

    }catch(err){
        console.log(err.message);
    }
    
});

router.delete('/delete/:id', async (req, res) => {

    let marking = await Evaluation.findById(req.params.id)

    //console.log(marking);

    await cloudinary.uploader.destroy(marking.cloudinary_id, {resource_type: "raw",});

    await Evaluation.findByIdAndDelete(req.params.id)
    .then(() => res.json("Result sheet Deleted Successfully..."))
    .catch((err) => err.json(err.message));
});

module.exports = router;