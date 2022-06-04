const router = require("express").Router();
const { User, validate } = require("../models/User");
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
dotenv.config();
const sendEmail = require("../utils/sendEmail");
const  crypto = require("crypto");
const Token = require('../models/token');

router.post("/add", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

        const tokens = await new Token({
			userId:user.id,
			token:crypto.randomBytes(32).toString("hex")     
		})
		await tokens.save().then((res) => console.log(res)).catch((err) => console.log(err.message));
		
        const url = `${process.env.BASE_URL}/users/${user.id}/verify/${tokens.token}`;
		await sendEmail(user.email,"Verify Email",url);

		res.status(201).send({ message: "send mail successfully" });
	} catch (error) {
		//res.status(500).send({ message: "Internal Server Error" });
        console.log(error);
	}
});

// 
router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const users = await User.findOne({ _id: req.params.id });
		if (!users) return res.status(400).send({ message: "Invalid user link" });

		const token = await Token.findOne({
			userId: users.id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid token link" });


//indByIdAndUpdate(req.params.id, { deleted: true });
		await User.findByIdAndUpdate(req.params.id ,{verfied: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//create the update route
router.put("/upadate/:id", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		const user = await User.findByIdAndUpdate(
			req.params.id,
			{
				...req.body,
				password: hashPassword,
			},
			{ new: true }
		);
		if (!user)
			return res.status(404).send({ message: "User not found" });

		res.status(200).send({ message: "User updated successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});



//delete the user
router.delete("/:id", async (req, res) => {
	try {
		const user = await User.findByIdAndDelete(req.params.id);
		if (!user)
			return res.status(404).send({ message: "User not found" });

		res.status(200).send({ message: "User deleted successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//get the user
router.get("/user/:id", async (req, res) => {
	try {
		const user = await User.findById(req.params.id);
		if (!user)
			return res.status(404).send({ message: "User not found" });

		res.status(200).send(user);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//get all the users
router.get("/", async (req, res) => {
	try {
		const users = await User.find({});
		if (!users)
			return res.status(404).send({ message: "Users not found" });

		res.status(200).send(users);
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get('/view/std', (req, res) => {
    User
    .find({type : "Student"})
    .then((response) => res.json(response))
    .catch((err) => res.json(err.message));
});

router.get('/view/sup', (req, res) => {
    User
    .find({type : "Supervisor"})
    .then((response) => res.json(response))
    .catch((err) => res.json(err.message));
});

router.get('/view/pmem', (req, res) => {
    User
    .find({type : "Panel Member"})
    .then((response) => res.json(response))
    .catch((err) => res.json(err.message));
});

router.get('/view/ad', (req, res) => {
    User
    .find({type : "Admin"})
    .then((response) => res.json(response))
    .catch((err) => res.json(err.message));
});

router.put('/edit/:id', (req, res) => {
    User
    .findById(req.params.id)
    .then(response => {
        response.firstName = req.body.firstName,
        response.lastName =  req.body.lastName,
        response.email =  req.body.email,
        response.password =  req.body.password,
        response.contact =  req.body.contact,
        response.type = req.body.type

        response
        .save()
        .then(() => res.json("User Updated Successfully..."))
        .catch((err) => res.json(err.message));
    })
    .catch((err) => res.json(err.message));
});

module.exports = router
