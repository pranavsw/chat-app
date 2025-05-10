import { generateToken } from "../lib/utils.js";
import User from "../models/user.model.js"
import bcrypt from "bcryptjs"


export const signup = async (req, res) => {
    const { email, fullname, password } = req.body;
    try {
        if(!email || !fullname || !password) {
            return res.status(400).json({ message: "Please fill all fields" });
        }
        //hash password
        if(password.length < 6){
            return res.status(400).json({message: "Password must be atleast 6 char"});
        }

        const user = await User.findOne({email})
        if(user) return res.status(400).json({message: "Email already exist"});

        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            email,
            fullname,
            password: hashPassword,
        })

        if(newUser){
            //generate token
            generateToken(newUser._id, res)
            await newUser.save();

            res.status(201).json({
                _id: newUser._id,
                email: newUser.email,
                fullname: newUser.fullname,
                profilePicture: newUser.profilePicture,
            });

        }else{
            return res.status(400).json({message: "Invalid user data"});
        }

    } catch (error) {
        console.log("error in signup controller", error);
        res.status(500).json({
            message: "Internal server error",
        });
    }
}

export const login = (req, res) => {
    res.send("Login Route");
}

export const logout = (req, res) => {
    res.send("Logout Route");
}

