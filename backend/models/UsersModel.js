import mongoose from "mongoose";


const schema = new mongoose.Schema({
  userName: { type: String, required: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "user", "superAdmin"],
  },
  isAuthenticated: { type: Boolean  },
  fullAccess: { type: Boolean  },
  adminRef: { type: Number },
  generatedAdminId : { type: Number }
});

export const User = mongoose.model("User", schema);