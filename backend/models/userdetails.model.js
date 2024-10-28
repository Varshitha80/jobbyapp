import mongoose  from "mongoose";

const userdetailsSchema = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique: true
    },
    email :{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true,
    },
},{
    timestamps:true
});

const profiledataSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Userdetails'
    },
    profile_image_url: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique:true
    },
    short_bio: {
        type: String,
        required: true,
    },
}, {
    timestamps: true 
});





const Userdetails = mongoose.model('Userdetails',userdetailsSchema);
const Profiledetails = mongoose.model('Profiledata',profiledataSchema);


export  {Userdetails,Profiledetails} ;