const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const noticeSchema = new Schema({

    noticeId : {
        type : String,
        required: true
    },
    noticeTitle : {
        type : String,
        required: true
    },
    
    date : {
       type:String,
        required: true
    },
    noticePurpose : {
        type : String,
        required: true
    },

})

const Notice = mongoose.model("Notice", noticeSchema);

module.exports = Notice;