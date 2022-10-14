const { validationResult } = require("express-validator");
const User = require("../../models/User");
const { hashedPassword, createToken, comparePassword } = require("../../services/authServices");


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

//@route POST /api/login
//@access Public
//@desc Login user and return a token

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        try {
            const user = await User.findOne({ email });
            if (user) {
                if (await comparePassword(password, user.password)) {

                    const token = createToken(user._id, user.name);
                    if (user.admin) {
                        return res.status(201).json({
                            token,
                            admin: true
                        })
                    } else {
                        return res.status(201).json({
                            token,
                            admin: false
                        })
                    }

                } else {
                    json({ errors: [{ "msg": `Invalid password` }] });
                }
            } else {
                return res.status(401).json({ errors: [{ "msg": `${email} is not found!` }] });
            }
        } catch (error) {
            return res.status(500).json("Internal Server Error");
        }
    } else {
        return res.status(401).json({ errors: errors.array() });
    }
}