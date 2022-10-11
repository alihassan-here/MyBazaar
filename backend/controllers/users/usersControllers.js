const { validationResult } = require("express-validator");
const User = require("../../models/User");
const { hashedPassword, createToken } = require("../../services/authServices");


//@route POST /api/register
//@access Public
//@desc Create user and return a token
module.exports.register = async (req, res) => {
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        const { name, email, password } = req.body;
        try {
            const emailExist = await User.findOne({ email });
            if (emailExist) {
                return res.status(401).json({ errors: [{ msg: `${email} is already taken` }] });
            } else {
                const hashed = await hashedPassword(password);
                const user = await User.create({
                    name,
                    email,
                    password: hashed,
                });
                const token = createToken(user._id, user.name);
                return res.status(201).json({ msg: "Your account has been created!", token });
            }
        } catch (error) {
            return res.status(500).json("Internal Server Error");
        }
    } else {
        //validation failed
        return res.status(400).json({ errors: errors.array() });
    }
}