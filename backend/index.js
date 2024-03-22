
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoose from "mongoose";
import  MongoDBStore  from "connect-mongodb-session";
import userRouter from "./routes/UserRoutes.js";

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use(cors({
  credentials:true,
  methods: ["GET", "POST", "PUT", "DELETE"],
//   origin:['http://localhost:5173']
}
));


const MongoDBStoreSession = MongoDBStore(session);

const store = new MongoDBStoreSession({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

app.use(session({
  secret: process.env.SESSSION_SECRET,
  resave:false,
  saveUninitialized: false,
  store:store,
  cookie:{
    secure: "auto",
    maxAge:1000 * 60 * 60 * 48,
  }
}));

app.use("/api/users",userRouter);

const db = mongoose
.connect(process.env.MONGODB_URI);
db.then(()=>{
    const client = mongoose.connection.getClient();
    const sessionsCollection = client.db().collection("sessions").find({})
    // console.log(sessionsCollection);
    console.log("Database Connected");
    app.listen(process.env.PORT,console.log(`Server is running on http://localhost:${process.env.PORT}`))
})
.catch((error)=>{
    console.log(error)
});

// export {client}

