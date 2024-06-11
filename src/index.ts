import { connectDB } from "./db/index";
import dotenv from "dotenv";
import app from "./app";

// Load environment variables from .env file
dotenv.config({
  path: "./.env",
});

// Define the port number
const PORT = process.env.PORT || 8000;

// server
let server: any;

// Connect to the database and start the server
connectDB()
  .then(() => {
    // Start the server
    server = app.listen(8000, () => {
      console.log(`Server is running on port : ${PORT}`);
    });
  })
  .catch((err) => {
    console.log("MONGODB ERROR:: ", err);
  });

// Handle unhandled promise rejections
const exitHandler = () => {
  if (server) {
    server.close(() => {
      console.log("Server closed");
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

// Handle unhandled promise rejections
const unexpectedErrorHandler = (error) => {
  console.log(error);
  exitHandler();
};

// Handle unhandled promise rejections
process.on("uncaughtException", unexpectedErrorHandler);
process.on("unhandledRejection", unexpectedErrorHandler);
