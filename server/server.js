import "dotenv/config";
import express from "express";
import cors from "cors";
//import carRoutes from "./routes/listed_cars.js";
import userRoutes from "./routes/userRoutes.js";
import mongoose from "mongoose";

const PORT = process.env.PORT || 4000;
const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve static files from the uploads directory

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//app.use("/api/cars", carRoutes);
app.use("/api/userRoutes", userRoutes);

mongoose
  .connect(process.env.ATLUS_URI)
  .then(() => {
    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
