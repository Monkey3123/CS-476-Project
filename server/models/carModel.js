import mongoose from "mongoose";
const Schema = mongoose.Schema;

const carSchema = new Schema({
  make: {
    type: String,
  },

  model: {
    type: String,
  },

  year: {
    type: String,
  },

  odometer: {
    type: String,
  },
  transmission: {
    type: String,
  },
  fuelType: {
    type: String,
  },
  seatingCapacity: {
    type: String,
  },
  color: {
    type: String,
  },
  description: {
    type: String,
  },
  dailyRate: {
    type: String,
  },
  location: {
    type: String,
  },
  fromDate: {
    type: String,
  },
  toDate: {
    type: String,
  },
  fromTime: {
    type: String,
  },
  toTime: {
    type: String,
  },
  photo: {
    type: String,
  },
  listerid: {
    type: String,
  },
});

const Car = mongoose.model("Car", carSchema);
export default Car;
