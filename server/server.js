import express from "express";
import cors from "cors";
import records from "./routes/record.js";
import carRoutes from "./routes/listed_cars.js";

const PORT = process.env.PORT || 5050;
const app = express();

app.use(cors());
app.use(express.json());

app.use("/record", records);
app.use("/api/cars", carRoutes); 

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
