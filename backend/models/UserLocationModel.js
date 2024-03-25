 import mongoose from "mongoose";

 const schema = new mongoose.Schema({
    latitude: Number,
    longitude: Number,
    userId: mongoose.Types.ObjectId
 });

 export const Location = mongoose.model('Location',schema);