const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Schema = new schema({
    schemaName: {
        type : String,
        required : true
    },
    department: {
        type : String,
        required : true
    },
    schema: {
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

const marking = mongoose.model('marking', Schema);
module.exports = marking;