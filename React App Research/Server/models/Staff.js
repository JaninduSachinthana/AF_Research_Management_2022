const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");

const staffSchema = new mongoose.Schema({
	name: { 
        type: String,
         required: true 
    },
	email: { 
        type: String,
         required: true 
    },
	address: { 
        type: String,
         required: true 
    },
	contact: { 
        type: String, 
        required: true 
    },
    nic:{
        type: String, 
        required: true 
    },
    position: { 
        type: String,
         required: true 
    },
	department: { 
        type: String, 
        required: true 
    },
    password: { 
        type: String, 
        required: true 
    },
    type:{
        type: String, 
        required: true 
    },
        
        verfied:{type:Boolean,default:false}
});

staffSchema.methods.generateAuthToken = function () {
	const token = jwt.sign({ _id: this._id }, process.env.JWTPRIVATEKEY, {
		expiresIn: "7d",
	});
	return token;
};

const Staff = mongoose.model("staff", staffSchema);

const validate = (data) => {
	const schema = Joi.object({
		name: Joi.string().required().label("Name"),
		address: Joi.string().required().label("Address"),
		email: Joi.string().email().required().label("Email"),
		password: passwordComplexity().required().label("Password"),
        contact: Joi.string().required().label("Contact"),
        nic: Joi.string().required().label("NIC"),
		position: Joi.string().required().label("Position"),
        department: Joi.string().required().label("Department"),
        type: Joi.string().required().label("Type"),

	});
	return schema.validate(data);
};

module.exports = { Staff, validate };