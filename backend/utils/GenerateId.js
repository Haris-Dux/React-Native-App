import { User } from "../models/UsersModel.js";

async function generateUniqueAdminId() {
    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const adminId = randomSuffix;
    const existingId = await User.findOne({
        generatedAdminId: adminId,
    });
    if (existingId) {
      return generateUniqueAdminId();
    }
    return adminId;
  };

export {
    generateUniqueAdminId
  };