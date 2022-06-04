const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const Panels = new Schema({
    panelID: {type:String, required: true},
    panelmember1: {type:String, required: true},
    panelmember2: {type:String, required: true},
    group1: {type:String, required: true},
    group2: {type:String, required: true},
    group3: {type:String, required: true},
});

const Panel = mongoose.model('Panel', Panels);
module.exports = Panel;
