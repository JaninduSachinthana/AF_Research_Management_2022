const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Evaluation = new schema({
    schemaID: {
        type : String,
        required : true
    },
    LecName: {
        type : String,
        required : true
    },
    desc: {
        type : String,
        required : true
    },
    department: {
        type : String,
        required : true
      
    },
    results: {
        type : String,
        required : true
      
    },
    cloudinary_id: {
        type : String,
        required : true
      
    },
    fileName: {
        type : String,
        required : true
    }
})

const evaluation = mongoose.model('evaluation', Evaluation);
module.exports = evaluation;