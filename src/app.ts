import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import routesV1 from "./routesV1";
var bodyParser = require("body-parser");

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(express.static("public"));

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/v1", routesV1);

// export the express application
export default app;
