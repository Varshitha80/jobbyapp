import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {Userdetails,Profiledetails} from "../models/userdetails.model.js";

const router = express.Router()

router.post('/register',async (req,res) => {
    const {username,email,password} = req.body

    if(!username || !email || !password){
        return res.status(400).json({success:false,message:"please provide all fields"});
    }

    const hashedpassword = await bcrypt.hash(password,10);
    const newuserdetails = new Userdetails({username,email,password:hashedpassword})

    try {
        await newuserdetails.save()
        res.status(201).json({success:true,data:newuserdetails});
    }
    catch(error){
        console.error("Error in create userdetails:",error.message)
        res.status(500).json({success:false,message:"server error"});
    }
})

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    try {
        const dbUser = await Userdetails.findOne({ username:username });
        if (!dbUser) {
            res.status(400).json("User does not exist");
        } else {
            const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
            if (isPasswordMatched) {
                const payload = { _id: dbUser._id,username: username };
                const jwt_token = jwt.sign(payload, "MY_SECRET_TOKEN");
                res.json({ jwt_token });
            } else {
                res.status(400).json({message:"The password is incorrect"});
            }
        }
    } catch (error) {
        res.status(500).json({message:"Internal server error"});
    }
});

router.post('/profile', async (req, res) => {
    const { profile_image_url, username, short_bio } = req.body;
    
    let jwtToken;
    const authHeader = req.headers['authorization'];
    
    if (authHeader !== undefined) {
        jwtToken = authHeader.split(' ')[1];
    }

    if (jwtToken === undefined) {
        return res.status(401).send('Invalid Access Token');
    } else {
        jwt.verify(jwtToken, 'MY_SECRET_TOKEN', async (error, payload) => {
            if (error) {
                return res.status(401).send('Invalid Access Token');
            } else {
                const userId = payload._id;  

                const newProfile = new Profiledetails({
                    user_id: userId,
                    profile_image_url,
                    username,
                    short_bio,
                });

                try {
                    await newProfile.save();
                    res.status(201).json({ success: true, data: newProfile });
                } catch (error) {
                    console.error("Error in creating profile:", error.message);
                    res.status(500).json({ success: false, message: "Server error" });
                }
            }
        });
    }
});

// GET route to retrieve a user's profile
router.get('/profile', async (req, res) => {
    let jwtToken;
    const authHeader = req.headers['authorization'];

    if (authHeader !== undefined) {
        jwtToken = authHeader.split(' ')[1];
    }

    if (jwtToken === undefined) {
        return res.status(401).send('Invalid Access Token');
    } else {
        jwt.verify(jwtToken, 'MY_SECRET_TOKEN', async (error, payload) => {
            if (error) {
                return res.status(401).send('Invalid Access Token');
            } else {
                try {
                    const profile = await Profiledetails.findOne({ user_id: payload._id }); 
                    if (!profile) {
                        return res.status(404).json({ success: false, message: "Profile not found" });
                    }
                    res.json(profile);
                } catch (dbError) {
                    res.status(500).send('Internal Server Error');
                }
            }
        });
    }
});

export default router