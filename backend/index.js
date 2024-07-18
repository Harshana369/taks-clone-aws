import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import { errorHandler, routeNotFound } from "./middleware/errorMiddleware.js";
import routes from "./routes/index.js";
import dbConnection from "./utils/connectDB.js";
import path from "path";

dotenv.config();

dbConnection();

const port = process.env.PORT || 5000;

const app = express();

app.use(
  cors({
    origin: ["http://65.2.184.82:80"],
    methods: ["GET", "POST", "DELETE", "PUT"],
    credentials: true,
  })
);

app.use(express.static(path.join(__dirname, "/interface/build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/interface/build/index.html"));
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(morgan("dev"));
app.use("/api", routes);

app.use(routeNotFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server listening on ${port}`));