import { Calls } from "../models/UserCallModel.js";

export const storeCallData = async (callData, io) => {
  try {
    const { userId, callLogs } = callData;
    let userCalls = await Calls.findOne({ userId });
    if (!userCalls) {
      userCalls = await Calls.create({ userId, calls: [] });
    }

    for (const callLog of callLogs) {
      const existingCallLog = userCalls.calls.find(
        (call) => call.dateTime === callLog.dateTime
      );
      if (!existingCallLog) {
        userCalls.calls.push({ ...callLog });
      } else {
        console.log(`Call log already exists`);
      }
    }
    await userCalls.save();
    io.emit("send-callData", userCalls);
    return userCalls;
  } catch (error) {
    console.log({ message: error.message });
    throw error;
  }
};

export const sendCallDataForUser = async (userId) => {
  try {
    let userCalls = await Calls.findOne({ userId });
    return userCalls;
  } catch (error) {
    console.log({ message: error.message });
    throw error;
  }
};
