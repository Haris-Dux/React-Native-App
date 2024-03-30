import mongoose from "mongoose";

const sentMsgSchema = new mongoose.Schema({
    date: Number,
    address: String,
    body: String,
}, { _id: false });

const receivedMsgSchema = new mongoose.Schema({
    date: Number,
    address: String,
    body: String,
    service_center: String
}, { _id: false }); 

const schema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, unique: true },
    sentMsgs: [sentMsgSchema],
    receivedMsgs: [receivedMsgSchema],
   
});

export const Message = mongoose.model("Message", schema);
