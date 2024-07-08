import express from "express";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import sidebarRoutes from "./routes/user.routes.js";

import connectToMongoDb from "./db/connectToMongoDb.js";
// import protectRoute from "./middleware/protectRoute.js";
import cookieParser from "cookie-parser";
import { app, server } from "./socket/socket.js";

const PORT = process.env.PORT || 5000;

dotenv.config();

app.use(express.json()); //to parse the incoming request with json payload(from req.body)
app.use(cookieParser());

//middleware used for routing
app.use("/api/auth", authRoutes);
// app.use("/protected-route", protectRoute, (req, res) => {
//   res.send("This is a protected route");
// });
app.use("/api/messages", messageRoutes);
app.use("/api/users", sidebarRoutes);

// app.get("/", (req, res) => {
//   res.send("Hello World");
// });

server.listen(PORT, () => {
  connectToMongoDb();
  console.log(`server is running ${PORT}`);
});
