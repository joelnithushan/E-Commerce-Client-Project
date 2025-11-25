import app from "./app.js";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";

dotenv.config({ path: "backend/config/config.env" });
const PORT = process.env.PORT || 3000;

connectDB();

//to avoid developer's uncaught errors
process.on("uncaughtException", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Server is shutting down, due to Uncaught Exception`);

  process.exit(1);
});


const server = app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});

process.on("unhandledRejection", (err) => {
  console.log(`Error : ${err.message}`);
  console.log(`Server is shutting down, due to unhandled rejection`);

  server.close(() => {
    process.exit(1);
  });
});
