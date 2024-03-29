import { Location } from "../models/UserLocationModel.js";

export const storeUserLocation = async (location,io) => {
  try {
    const { latitude, longitude, userId } = location;
    if (!latitude || !longitude)
      throw new Error("Location Cordinates required");
    const existingLocation = await Location.findOne({ userId });
    let locationData ;
    if (existingLocation) {
     locationData = await Location.findOneAndUpdate(
        { userId },
        { latitude: latitude, longitude: longitude },
        { new: true }
      );
    } else {
    locationData = await Location.create({
        userId,
        latitude,
        longitude,
      });
    }
    // Emit an event to all connected clients to inform about the new locationData
    io.emit('locationUpdate', locationData);
  } catch (error) {
    console.log({ message: error.message });
    throw error;
  }
};

export const sendingLocationUpdatesForUser = async (userID,io) => {
  try {
    const locationData = await Location.findOne({userId:userID});
    io.emit('locationUpdate', locationData);
  } catch (error) {
    console.log({ message: error.message });
    throw error;
  }
};
