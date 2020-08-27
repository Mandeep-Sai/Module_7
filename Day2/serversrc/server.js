const express = require("express");
const studentRoutes = require("./students/index");
const pgStudentRoutes = require("./students/pgindex");
const pgProjectsRoutes = require("./projects/pgindex");
const projectRoutes = require("./projects");
const reviewsRoutes = require("./reviews");
const passport = require("passport");
// const reviewsRoutes = require('./reviews')
const auth = require("./students/oauth.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const {
  invalidIdHandler,
  invalidNameHandler,
  catchAllHandler,
} = require("./errorHandling");
const mongoose = require("mongoose");
dotenv.config();

const whitelist = ["http://localhost:3004"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

const server = express();
server.use(cookieParser());
server.use(cors(corsOptions));
server.use(passport.initialize());
// server.use()
server.use(express.json());
server.use("/students", studentRoutes);
server.use("/pg/students", pgStudentRoutes);
server.use("/pg/projects", pgProjectsRoutes);
server.use("/projects", projectRoutes);
server.use("/reviews", reviewsRoutes);

server.use(invalidIdHandler);
server.use(invalidNameHandler);
server.use(catchAllHandler);

mongoose
  .connect("mongodb://localhost:27017/students_portfolio", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(
    server.listen(3003, () => {
      console.log("Running on 3003");
    })
  );
