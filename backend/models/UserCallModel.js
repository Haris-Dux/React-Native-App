
import mongoose from "mongoose";

const callSchema =  new mongoose.Schema({
    dateTime:String,
    phoneNumber:Number,
    type:String,
    duration:Number,
    name: String,
})

const schema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,unique: true},
    calls:[callSchema],
});

export const Calls = mongoose.model("Calls", schema);