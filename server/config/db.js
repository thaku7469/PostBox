import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();

const CONNECTION_URL = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@umail.j1opd.mongodb.net/?retryWrites=true&w=majority&appName=Umail`;


async function connectToDatabase() {
    try{
        mongoose.connect(CONNECTION_URL);

        console.log("successfully connected to database");
    }

    catch(error) {
        console.error("failed to connect to database: ", error);
    }
}

export default connectToDatabase;