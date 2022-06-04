const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Topic = new schema({
    stdID: {
        type : String,
        required : true
    },
    grpID: {
        type : String,
        required : true
    },
    title: {
        type : String,
        required : true
    },
    email: {
        type : String,
        required : true      
    }, 
    status: {
        type : String,
        required : true      
    }

});

const topics = mongoose.model('topics', Topic);
module.exports = topics;