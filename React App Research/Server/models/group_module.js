const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const Groupschema = new Schema({
    groupid: {type:Number, required: true},
    department: {type:String, required: true},
    memberLeader: {type:String, required: true},
    memberone: {type:String, required: true},
    membertwo: {type:String, required: true},
    mamberthree: {type:String, required: true},
    // memberfour: {type:String, required: true},
});

const Group = mongoose.model('Group', Groupschema);
module.exports = Group;






