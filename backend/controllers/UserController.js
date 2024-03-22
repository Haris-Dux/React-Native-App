import { User } from "../models/UsersModel.js";
import bcrypt from "bcrypt";
import { generateUniqueAdminId } from "../utils/GenerateId.js ";
import mongoose from "mongoose";
// import { client } from "../index.js";

function setMongoose() {
    return mongoose.set("toJSON", {
      virtuals: true,
      transform: (doc, returnValue) => {
        delete returnValue._id;
        delete returnValue.__v;
      },
    });
  }


export const signUp = async (req, res, next) => {
  try {
    const { userName, password, role, adminRef } = req.body;

    if (!userName || !password || !role)
      throw new Error("Please Fill All fields");
    if (role === "user" && !adminRef) throw new Error("Please Fill All fields");
    const existingUser = await User.findOne({ userName });
    if (existingUser) throw new Error("User Already Exists");
    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      userName,
      password: hashedPassword,
      role,
      adminRef,
      ...(role === "admin" && {
        isAuthenticated: false,
        fullAccess: false,
        generatedAdminId: await generateUniqueAdminId(),
      }),
    });

    res.status(201).json({ message: "Sign Up Successful!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    const { userName, password } = req.body;
    if (!userName || !password)
      throw new Error("Please provide username and password");
    const user = await User.findOne({ userName });
    if (!user) throw new Error("Invalid Credentials");
    const validPassowrd = await bcrypt.compare(password, user.password);
    if (!validPassowrd) throw new Error("Invalid Credentials");
    if (user.role === "admin" && !user.isAuthenticated)
      throw new Error("Unauthorized");
    req.session.userId = user.id;
    setMongoose();
    res.status(200).json({ message: "Login Sucessfull", login: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy((error) => {
      if (error)
        return res.status(400).json({ message: "Logout Unsuccessfull" });
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Logout Successfull" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateUser = async (req, res, next) => {
  try {
    const { id, isAuthenticated, fullAccess, role } = req.body;
    let updateQuery = {};
    if (!id) throw new Error("User id Not found");
    if (isAuthenticated !== undefined) {
      updateQuery = { ...updateQuery, isAuthenticated };
    }
    if (fullAccess !== undefined) {
      updateQuery = { ...updateQuery, fullAccess };
    }
    if (role) {
      updateQuery = { ...updateQuery, role };
    }
    if (Object.keys(updateQuery).length === 0)
      throw new Error("No fields to update");
    await User.findByIdAndUpdate(id, updateQuery);
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAdmins = async (req, res) => {
    try {
        const admins = await User.find({
            role: "admin",
        })
        setMongoose();
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getActiveSessions = async (req, res, next) => {
  try {
  
    const sessions = await client.getCollection('sessions').find({})
        console.log(sessions);
        if (!sessions) {
            throw new Error("Failed to retrieve sessions");
          }
    
     res.status(200).json(sessions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};
