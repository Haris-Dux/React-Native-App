import { calls } from "../models/UserCallModel.js";

export const storeCallData = async (callData) => {
  try {
    const { userId, dateTime, phoneNumber, type, duration, name } = msg;
    await calls.create({
            userId,
            dateTime,
            phoneNumber,
            type,
            duration,
            name
    })
  } catch (error) {
    console.log({ message: error.message });
    throw error;
  }
};
