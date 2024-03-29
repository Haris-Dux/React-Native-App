import { Message } from "../models/UserMsgModel.js";

export const storeSentMsgData = async (msgData, io) => {
  try {
    const { userId, sentMsg } = msgData;
    let userMsg = await Message.findOne({ userId });
    if (!userMsg) {
      userMsg = await Message.create({ userId, sentMsgs: [] });
    }
    userMsg.sentMsgs.push(...sentMsg);
    await userMsg.save();
    io.emit('send-endSentMsgDataForUser', userMsg);
    return userMsg;
  } catch (error) {
    console.log({ message: error.message });
    throw error;
  }
};

export const storeRecievedMsgData = async (msgData, io) => {
    try {
      const { userId, recievedMsg } = msgData;
      let userMsg = await Message.findOne({ userId });
      if (!userMsg) {
        userMsg = await Message.create({ userId, recievedMsgs: [] });
      }
      userMsg.sentMsgs.push(...recievedMsg);
      await userMsg.save();
      io.emit('send-MsgDataForUser', userMsg);
      return userMsg;
    } catch (error) {
      console.log({ message: error.message });
      throw error;
    }
  };

export const sendMsgDataForUser = async (userId) => {
  try {
    let userMsgs = await Message.findOne({ userId });
    return userMsgs;
  } catch (error) {
    console.log({ message: error.message });
    throw error;
  }
};
