
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import session from "express-session";
import mongoose from "mongoose";
import  MongoDBStore  from "connect-mongodb-session";
import userRouter from "./routes/UserRoutes.js";
import { Server } from "socket.io";
import { createServer } from "http";
import { sendingLocationUpdatesForUser, storeUserLocation } from "./controllers/LocationController.js";
import { storeCallData } from "./controllers/UserCallsController.js";

const app = express();
app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use(cors({
  credentials:true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  origin:"*",
}
));

const server = createServer(app);
const io = new Server(server,{
  cors:{
    origin:"*",
    credentials:true,
    methods: ["GET", "POST", "PUT", "DELETE"],
  }
});

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

io.on('connection', (socket) => {
  console.log('user connected');

  socket.on('location',(location) => {
    
    storeUserLocation(location)
  });

  socket.on('startLocationTracking',(userID) => {
    sendingLocationUpdatesForUser(userID,io)
  });

  socket.on('get-callData',async(callData) => {
   const data = await storeCallData(callData)
   socket.emit('get-callData', data);
  });

  socket.on('disconnect',() => {
    console.log(`Disconnected ${socket.id}`);
})

});

 mongoose
.connect(process.env.MONGODB_URI)
.then( () => {   
    console.log("Database Connected");
    server.listen(process.env.PORT,console.log(`Server is running on http://localhost:${process.env.PORT}`))
})
.catch((error)=>{
    console.log(error)
});

export const client = mongoose.connection.getClient();



