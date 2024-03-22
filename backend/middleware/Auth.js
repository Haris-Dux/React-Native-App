import { User } from "../models/UsersModel.js";

export const superAdminOnly = async (req, res, next) => {
  const userId = req.session.userId;
  if (!userId) {
    return res.status(401).json({ message: "Please Login First" });
  }
  const user = await User.findById(userId);
  if (user.role !== "superAdmin") {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
