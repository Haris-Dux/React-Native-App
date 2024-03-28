
import mongoose from "mongoose";

const callSchema =  new mongoose.Schema({
    dateTime:String,
    phoneNumber:Number,
    type:String,
    duration:Number,
    name: String,
})

const schema = new mongoose.Schema({
    userId:mongoose.Types.ObjectId,
    calls:[callSchema],
});

export const calls = mongoose.model("Calls", schema);