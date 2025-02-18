import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { router } from "./routes";
import logger from "morgan";
import cookieParser from "cookie-parser";
import path from "path";
import createError from "http-errors";
import swaggerUi from "swagger-ui-express"
import swaggerDoc from "../swagger.json"

dotenv.config();
const app = express();


app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/api", router);
app.use('/swagger',  swaggerUi.serve, swaggerUi.setup(swaggerDoc));

app.use(function (req, res, next) {
  next(createError(404));
});

app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

export default app;
