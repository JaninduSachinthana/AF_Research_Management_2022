const mongoose = require ('mongoose');
const Schema = mongoose.Schema;


const Studentschema = new Schema({
    studentid: {type:String, required: true},
    name: {type:String, required: true},
    // memberLeader: {type:String, required: true},
    // memberone: {type:String, required: true},
    // membertwo: {type:String, required: true},
    // mamberthree: {type:String, required: true},
    // memberfour: {type:String, required: true},
});

const Student = mongoose.model('student', Studentschema);

module.exports = Student;
