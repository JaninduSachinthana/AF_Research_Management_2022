const router = require("express").Router();
const { Staff, validate } = require("../models/Staff");
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

		let user = await Staff.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new Staff({ ...req.body, password: hashPassword }).save();
        const token = await new Token({
			userId:user.id,
			token:crypto.randomBytes(32).toString("hex")     
		}).save();
        const url = `${process.env.BASE_URL}/users/${user.id}/verify/${token.token}`;
		await sendEmail(user.email,"Verify Email",url);

		res.status(201).send({ message: "send mail successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
        console.log(error);
	}
});

// 
router.get("/:id/verify/:token/", async (req, res) => {
	try {
		const users = await Staff.findOne({ _id: req.params.id });
		if (!users) return res.status(400).send({ message: "Invalid user link" });

		const token = await Token.findOne({
			userId: users.id,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid token link" });


//indByIdAndUpdate(req.params.id, { deleted: true });
		await Staff.findByIdAndUpdate(req.params.id ,{verfied: true });
		await token.remove();

		res.status(200).send({ message: "Email verified successfully" });
	} catch (error) {
		console.log(error)
		res.status(500).send({ message: "Internal Server Error" });
	}
});

//
module.exports = router