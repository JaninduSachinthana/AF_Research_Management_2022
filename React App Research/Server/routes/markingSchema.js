const express = require('express');
const cloudinary = require('./../utils/cloud');
const upload = require('./../utils/templateMulter');
const router = express.Router();

const Marking = require('./../models/markingSchema');

router.post('/add', upload.single('schema'), async (req, res) => {
    try {
        console.log(req.file);

        if(!req.file){
            return err.json("File is empty");
        }

        const result = await cloudinary.uploader.upload(req.file.path, {
             resource_type: "raw", 
             folder : "Marking",
             public_id: req.file.originalname
         });
        console.log(result);
        
        const marking = new Marking({
            schemaName : req.body.schemaName,
            department : req.body.department,
            schema : result.secure_url,
            cloudinary_id : result.public_id,
            fileName:req.body.fileName
        })
        await marking
        .save()
        .then(() => { res.json("Marking Shema Added Successfully...")})
        .catch(() =>{ err.json(err.message)});


    }catch (err) {

    }
});

router.get('/view', (req, res) => {
    Marking
    .find()
    .then((response) => res.json(response))
    .catch((err) => res.json(err.message));
});

router.get('/view/:id', (req, res) => {
    Marking
    .findById(req.params.id)
    .then((response) => res.json(response))
    .catch((err) => err.json(err.message));
});

router.put('/edit/:id', upload.single('schema'), async (req, res) => {

    try{

        const marking = await Marking.findById(req.params.id);

        var result = null;

        if(!req.file) {

            console.log("File None");
            result = await cloudinary.api.resource(marking.cloudinary_id,  {resource_type: "raw",});
            //console.log(result);

        }else {

            await cloudinary.uploader.destroy(marking.cloudinary_id,  {resource_type: "raw",} );

            result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: "raw", 
                folder : "Marking",
                public_id: req.file.originalname
            });
        // res.json(result);
        }

        
       
       await Marking.findById(req.params.id)
        .then((response) => {
            response.schemaName = req.body.schemaName,
            response.department = req.body.department,
            response.schema = result.secure_url,
            response.cloudinary_id = result.public_id,
            response.fileName = req.body.fileName

            response
            .save()
            .then(() => res.json("Marking Shema Updated Successfully..."))
            .catch(() => err.json(err.message));
        })
        .catch((err) => err.json(err.message));

    }catch(err){
        console.log(err.message);
    }
    
});

router.delete('/delete/:id', async (req, res) => {
    let marking = await Marking.findById(req.params.id)

    console.log(marking);

    await cloudinary.uploader.destroy(marking.cloudinary_id, {resource_type: "raw",});

    await Marking.findByIdAndDelete(req.params.id)
    .then(() => res.json("Marking Shema Deleted Successfully..."))
    .catch((err) => err.json(err.message));
});

module.exports = router;