import mongoose from "mongoose"


export const connectdb = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
    }
    catch (error) {
        process.exit(1);
    }
}