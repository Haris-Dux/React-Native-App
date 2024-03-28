import { Location } from "../models/UserLocationModel.js";

export const storeUserLocation = async (location) => {
  try {
    const { latitude, longitude, userId } = location;
    if (!latitude || !longitude)
      throw new Error("Location Cordinates required");
    const existingLocation = await Location.findOne({ userId });
    if (existingLocation) {
      await Location.findOneAndUpdate(
        { userId },
        { latitude: latitude, longitude: longitude },
        { new: true }
      );
    } else {
      await Location.create({
        userId,
        latitude,
        longitude,
      });
    }
  } catch (error) {
    console.log({ message: error.message });
    throw error;
  }
};

export const sendingLocationUpdatesForUser = async (userID,io) => {
  try {
    const {userId} = userID;
    const locationData = await Location.findOne({userId});
    io.emit('locationUpdate', locationData);
  } catch (error) {
    console.log({ message: error.message });
    throw error;
  }
};
