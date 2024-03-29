import mongoose from "mongoose";

const sentMsgSchema =  new mongoose.Schema({
    date:String,
    address:String,
    body:String,
});

const recievedMsgSchema =  new mongoose.Schema({
    date:String,
    address:String,
    body:String,
    service_center:String
});

const schema = new mongoose.Schema({
    userId:{type:mongoose.Types.ObjectId,unique: true},
    sentMsgs:[sentMsgSchema],
    recievedMsgs:[recievedMsgSchema]
});

export const Message = mongoose.model("Message", schema);